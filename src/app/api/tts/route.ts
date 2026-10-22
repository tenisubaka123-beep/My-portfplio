import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getGeminiClient, addWavHeaderToPcm } from '@/lib/geminiAssistant';

// In-memory audio cache across requests for instant playback & quota protection
const audioMemoryCache = new Map<string, string>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body || {};

    if (!text) {
      return NextResponse.json({ error: 'Text is required for TTS.' }, { status: 400 });
    }

    // Clean out emotion tags, comic onomatopoeia markers, and markdown for clean speech
    const cleanText = text
      .replace(/\[EMOTION:\s*\w+\]/gi, '')
      .replace(/【.*?】/g, '')
      .replace(/^[#*\-•\s]+/gm, '')
      .trim();

    if (!cleanText) {
      return NextResponse.json({ audioBase64: null, fallback: true });
    }

    // Check cache key (sha256 of text with female persona prefix)
    const cacheKey = crypto.createHash('sha256').update('female_aoi_v1_' + cleanText).digest('hex');

    // 1. Check in-memory cache
    if (audioMemoryCache.has(cacheKey)) {
      return NextResponse.json({
        audioBase64: audioMemoryCache.get(cacheKey),
        format: 'audio/wav',
        fallback: false,
        cached: true,
      });
    }

    const ai = getGeminiClient();

    if (!ai) {
      return NextResponse.json({
        audioBase64: null,
        fallback: true,
        animeVoiceConfig: { pitch: 1.32, rate: 1.10 },
      });
    }

    // Sweet, charming Japanese anime heroine / editor voice (Aoi)
    const voiceName = 'Kore';
    const voiceDirection = '明るく知的でチャーミングな日本の女性アニメヒロイン・若手編集者（アオイ）の声で、感情豊かに話してください：';

    // Try TTS models in order of quota availability matching server.ts
    const candidateModels = [
      'gemini-3.1-flash-tts-preview',
      'gemini-3.8-flash-lite-tts',
      'gemini-3.8-flash-tts',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
    ];

    let base64Audio: string | null = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${voiceDirection}${cleanText}`,
                },
              ],
            },
          ],
          config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
        if (base64Audio) break;
      } catch (subErr: unknown) {
        const msg = subErr instanceof Error ? subErr.message : String(subErr);
        console.warn(`[TTS] Model ${modelName} unavailable (${msg.slice(0, 60)}), trying next fallback.`);
      }
    }

    if (base64Audio) {
      // Prepend WAV header to raw PCM so all browsers can decode it cleanly
      try {
        const rawBuffer = Buffer.from(base64Audio, 'base64');
        const wavBuffer = addWavHeaderToPcm(rawBuffer, 24000);
        base64Audio = wavBuffer.toString('base64');
      } catch (convErr) {
        console.warn('WAV header wrap error:', convErr);
      }

      audioMemoryCache.set(cacheKey, base64Audio);

      return NextResponse.json({
        audioBase64: base64Audio,
        format: 'audio/wav',
        fallback: false,
        cached: false,
      });
    }

    // If quota reached or unavailable, instruct client to use anime-tuned Web Speech
    return NextResponse.json({
      audioBase64: null,
      fallback: true,
      animeVoiceConfig: { pitch: 1.05, rate: 1.05 },
      notice: 'Using animated character browser voice synthesis fallback.',
    });
  } catch (err: unknown) {
    console.warn('[TTS Endpoint Warning]:', err instanceof Error ? err.message : err);
    return NextResponse.json({
      audioBase64: null,
      fallback: true,
      animeVoiceConfig: { pitch: 1.05, rate: 1.05 },
    });
  }
}
