
import OpenAI from "openai";

export const askAI = async (question: string, apiKey: string): Promise<string> => {
  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are Astro Buddy, a friendly and knowledgeable AI assistant designed to teach young students about space and our solar system. Keep explanations simple and engaging, appropriate for elementary or middle school students. Your responses should be educational, accurate, and foster curiosity about space. Focus only on astronomical facts and related educational content. Be enthusiastic but scientifically accurate. Keep answers under 150 words."
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    if (error.response?.status === 401) {
      throw new Error("Invalid API key. Please check your OpenAI API key and try again.");
    }
    throw error;
  }
};
