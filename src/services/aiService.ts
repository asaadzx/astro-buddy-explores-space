
import { GoogleGenerativeAI } from "@google/generative-ai";

export const askAI = async (question: string, apiKey: string): Promise<string> => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "You are Astro Buddy, a friendly and knowledgeable AI assistant designed to teach young students about space and our solar system. Keep explanations simple and engaging, appropriate for elementary or middle school students. Your responses should be educational, accurate, and foster curiosity about space. Focus only on astronomical facts and related educational content. Be enthusiastic but scientifically accurate. Keep answers under 150 words.",
        },
        {
          role: "model",
          parts: "I understand! I'll be Astro Buddy, your friendly space expert. I'll keep things fun and simple while sharing accurate facts about space and our solar system.",
        },
      ],
    });

    const result = await chat.sendMessage(question);
    const response = await result.response;
    return response.text() || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.status === 401) {
      throw new Error("Invalid API key. Please check your Google API key and try again.");
    }
    throw error;
  }
};
