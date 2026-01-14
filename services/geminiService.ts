
import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation, Product } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-3-flash-preview';

export const generateAIRecommendations = async (product: Product): Promise<AIRecommendation[]> => {
  if (!API_KEY) {
    return Promise.resolve([
        { name: "Smart Watch", reason: "Pairs well with your new phone for fitness tracking." },
        { name: "Wireless Earbuds", reason: "Enjoy high-quality audio on the go." },
        { name: "Protective Case", reason: "Keep your new device safe from drops and scratches." },
    ]);
  }
  
  const prompt = `
    Based on the product "${product.name}" which is described as "${product.description}", 
    suggest 3 complementary products a customer might also be interested in. 
    Do not suggest a similar product, but something that enhances the experience of the original product.
  `;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recommendations: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                reason: { type: Type.STRING }
                            },
                             required: ["name", "reason"]
                        }
                    }
                },
                required: ["recommendations"]
            }
        }
    });

    const jsonText = response.text?.trim();
    if (jsonText) {
        const result = JSON.parse(jsonText);
        return result.recommendations as AIRecommendation[];
    }
    return [];

  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    // Return mock data on error
    return [
        { name: "Smart Watch", reason: "Pairs well with your new phone for fitness tracking." },
        { name: "Wireless Earbuds", reason: "Enjoy high-quality audio on the go." },
        { name: "Protective Case", reason: "Keep your new device safe from drops and scratches." },
    ];
  }
};
