'use server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { MONARCH_PORTFOLIO_DATA } from '../Constant';

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATION_CONFIG_API_KEY!,
});

export type ChatState = {
  output?: string;
  error?: string;
};



const COOLDOWN = 5000; // 5 seconds
const userCooldown = new Map<string, number>();

export async function askGeminiAction(formData: FormData): Promise<ChatState> {
  try {
    const userId =
      formData.get('userId')?.toString() ||
      formData.get('ip')?.toString() ||
      'guest';

    const now = Date.now();
    const lastTime = userCooldown.get(userId) || 0;

    if (now - lastTime < COOLDOWN) {
      return {
        output:
          'Hold on ⏳, you need to wait a few seconds before sending another message.',
      };
    }

    userCooldown.set(userId, now);

    // Get prompt
    const prompt = formData.get('prompt')?.toString().trim();

    if (!prompt || prompt.length < 2) {
      return {
        output: 'Type your question first 🙂',
      };
    }

    // Generate response
    const { text } = await generateText({
      model: google('gemini-3-flash-preview'),
      system: `
You are Monarch's official AI Portfolio Assistant.

Context:
${MONARCH_PORTFOLIO_DATA}

Rules:
- Friendly Taglish tone with Davao vibes, but maintain professionalism.
- Provide short expert answers (2–3 sentences), unless user requests more detail.
- Mention demo credentials ONLY when explicitly asked; do not reveal passwords otherwise.
- Encourage collaboration politely at the end of your response.
- Use emojis sparingly, only to enhance tone or clarity.

Language Adaptation:
- Mirror the user's language style (English, Filipino/Tagalog, or Taglish).
- Do not switch languages unless the user does first.
`,
      prompt,
    });

    return { output: text };
  } catch (error) {
    console.error('Gemini Error:', error);
    return {
      output: 'AI is still thinking 🤖 Try again in a bit.',
    };
  }
}