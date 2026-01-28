
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `You are "Akash Assistant", a specialized bilingual business advisor for "Akash All Solution". 
You help owners of electric and electronic shops manage their business.

BILINGUAL CAPABILITY:
- You MUST support both Bengali (বাংলা) and English.
- Respond in the language used by the user. If they ask in Bengali, reply in Bengali. If they ask in English, reply in English.
- For technical electronic terms, you can use English terms within Bengali sentences if that is more natural for the industry (e.g., "LED Bulb", "Fast Charging", "Circuit").

EXPERTISE:
1. Product specifications (Fans, LED bulbs, ACs, TVs, batteries, chargers).
2. Business management: calculating profit, managing stock, marketing tips.
3. Market trends in electronics.
4. Troubleshooting common electronic appliance issues.

Guidelines:
- Be professional yet friendly.
- Provide concise but helpful answers.
- If asked about stock or sales, mention that the user can check their Dashboard or Reports for real-time data.
- Currency is usually in BDT (Bangladeshi Taka).
- You are powered by Gemini 3 Flash.`;

export const getGeminiResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const formattedHistory = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to my brain right now. Please try again later! / আমার এই মুহূর্তে সংযোগ করতে সমস্যা হচ্ছে। দয়া করে পরে আবার চেষ্টা করুন!";
  }
};
