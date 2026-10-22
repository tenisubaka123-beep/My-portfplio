import { NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/geminiAssistant';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { audioBase64, mimeType } = body || {};

    const ai = getGeminiClient();

    if (!ai) {
      return NextResponse.json({ text: '' });
    }

    if (!audioBase64) {
      return NextResponse.json({ error: 'audioBase64 is required.' }, { status: 400 });
    }

    const mediaType = mimeType || 'audio/webm';
    const cleanBase64 = audioBase64.replace(/^data:audio\/\w+;base64,/, '');

    const transcribeModels = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-3.5-flash',
      'gemini-3.6-flash',
      'gemini-3-flash-preview',
      'gemini-3.5-flash-lite',
      'gemini-3.8-flash',
    ];

    let transcribedText = '';
    for (const modelName of transcribeModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: mediaType,
                    data: cleanBase64,
                  },
                },
                {
                  text: 'この音声は就職面接での質問や発言です。音声を正確に日本語で文字起こししてください。余計な解説や引用符、マークダウンは含めず、文字起こしした日本語テキストのみを出力してください。聞き取れなかった場合は「（聞き取れませんでした）」とだけ出力してください。',
                },
              ],
            },
          ],
        });

        const txt = (response.text || '').trim();
        if (txt && !txt.includes('聞き取れませんでした')) {
          transcribedText = txt;
          break;
        }
      } catch (subErr: unknown) {
        const msg = subErr instanceof Error ? subErr.message : String(subErr);
        console.warn(`[Transcribe] Model ${modelName} unavailable (${msg.slice(0, 60)}), trying next.`);
      }
    }

    return NextResponse.json({ text: transcribedText });
  } catch (err: unknown) {
    console.warn('[Transcription Warning Handled]:', err instanceof Error ? err.message : err);
    return NextResponse.json({ text: '' });
  }
}
