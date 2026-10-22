import { NextResponse } from 'next/server';
import { getGeminiClient, buildSystemPrompt, generateFallbackChatResponse } from '@/lib/geminiAssistant';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, candidateProfile } = body || {};
    const charStyle = candidateProfile?.characterStyle || 'hero';
    const lastUserMsg = (messages || [])
      .slice()
      .reverse()
      .find((m: { role: string; text: string }) => m.role === 'user' || m.role === 'interviewer')?.text || '';

    const ai = getGeminiClient();

    if (!ai) {
      const fallbackText = generateFallbackChatResponse(lastUserMsg, charStyle);
      return NextResponse.json({ text: fallbackText });
    }

    const systemInstruction = buildSystemPrompt(candidateProfile);

    // Sanitize and format messages for Gemini (ensure valid alternation)
    const rawList = (messages || []).map((m: { role: string; text: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? ('model' as const) : ('user' as const),
      text: (m.text || '').trim(),
    })).filter((m: { text: string }) => m.text.length > 0);

    const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
    for (const item of rawList) {
      if (contents.length > 0 && contents[contents.length - 1].role === item.role) {
        contents[contents.length - 1].parts[0].text += `\n${item.text}`;
      } else {
        contents.push({ role: item.role, parts: [{ text: item.text }] });
      }
    }

    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      contents.push({ role: 'user', parts: [{ text: lastUserMsg || '自己紹介をお願いします！' }] });
    }

    // Prioritize fast, high-quota models with automatic fallback matching server.ts
    const candidateModels = [
      'gemini-3.5-flash',
      'gemini-3.6-flash',
      'gemini-3-flash-preview',
      'gemini-3.5-flash-lite',
      'gemini-3.1-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-3.8-flash',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
    ];

    let responseText = '';
    for (const modelName of candidateModels) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Model timeout after 4s')), 4000)
        );

        const generatePromise = ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            temperature: 0.82,
            topP: 0.95,
          },
        });

        const response = await Promise.race([generatePromise, timeoutPromise]);
        responseText = (response.text || '').trim();
        if (responseText) {
          break;
        }
      } catch (subErr: unknown) {
        const msg = subErr instanceof Error ? subErr.message : String(subErr);
        console.warn(`[Chat] Model ${modelName} unavailable (${msg.slice(0, 60)}), trying next fallback.`);
      }
    }

    if (!responseText) {
      responseText = generateFallbackChatResponse(lastUserMsg, charStyle);
    }

    return NextResponse.json({ text: responseText });
  } catch (err: unknown) {
    console.warn('[Chat Error Handled]:', err instanceof Error ? err.message : err);
    const fallbackText = generateFallbackChatResponse('');
    return NextResponse.json({ text: fallbackText });
  }
}
