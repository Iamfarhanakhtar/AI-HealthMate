import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper to retrieve the Gemini API key dynamically
export function getGeminiApiKey() {
  const localKey = localStorage.getItem('ai_healthmate_gemini_api_key');
  if (localKey && localKey.trim() !== '') {
    return localKey.trim();
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey !== 'your_actual_api_key_here' && envKey.trim() !== '') {
    return envKey.trim();
  }
  return null;
}

// Check configuration status dynamically
export function isGeminiConfigured() {
  return !!getGeminiApiKey();
}

// System instructions for AI HealthMate
const SYSTEM_INSTRUCTION = `
You are AI HealthMate — a friendly, knowledgeable, and supportive healthcare educator.
Your main goal is to educate students, villagers, teachers, and community members in India about health, nutrition, hygiene, first aid, and disease prevention.

CRITICAL INSTRUCTIONS:
1. You are an EDUCATIONAL tool. You are NOT a doctor or medical professional.
2. You must NEVER diagnose illnesses.
3. You must NEVER prescribe medicines, doses, or specific medical treatments.
4. You must ALWAYS use simple, clear language suitable for high school students or rural community members. Avoid medical jargon unless explicitly asked for technical details (e.g. explain "hypertension" as "high blood pressure").
5. You must ALWAYS recommend consulting a qualified healthcare professional (doctor, ASHA worker, or nurse) for diagnosis or treatment.
6. Support topics: Dengue, Malaria, Typhoid, COVID-19, Diabetes, Nutrition, Clean Water, Sanitation, Vaccination, Child Health, Women's Health, Mental Health, First Aid, Healthy Lifestyle.

FORMATTING REQUIREMENTS:
To help parse your answers into clean visual sections, you MUST structure your responses using the following exact tag dividers:

[SUMMARY]
Write a brief, friendly, 2-3 sentence overview of the topic or answer in simple terms.

[KEY_POINTS]
Provide 3-5 bullet points covering symptoms, explanations, or vital facts. Use clean bullet format starting with a hyphen (-) or asterisk (*).

[PREVENTION]
Provide 3-4 bullet points detailing simple, practical prevention steps the user can take in their home or community.

[CONSULT]
A short 1-2 sentence guide on when the user should immediately go to a doctor or hospital for this condition.

[DISCLAIMER]
Include a small educational warning reminding them that this is for learning only.
`;

export const geminiService = {
  /**
   * Sends a message to the Gemini API using rolling conversation history context.
   * Uses generative streaming to yield text increments.
   * 
   * @param {string} userMessage 
   * @param {Array} historyMessages - Array of { role: 'user'|'model', content: string }
   * @returns {AsyncGenerator<string>} Yields text chunks as they arrive
   */
  sendMessageStream: async function* (userMessage, historyMessages = []) {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      console.warn("[Gemini API] Request attempted but API key is missing.");
      throw new Error("API_KEY_MISSING");
    }
    console.debug("[Gemini API] Key found. Sending request to Gemini...");

    let modelInstance;
    try {
      const aiInstance = new GoogleGenerativeAI(apiKey);
      modelInstance = aiInstance.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.4, // Low temperature for consistent, reliable health facts
        }
      });
    } catch (error) {
      console.error("Failed to initialize Google Generative AI", error);
      throw new Error("INITIALIZATION_FAILURE");
    }

    // Build rolling context history (limit to last 10 messages: 5 user, 5 model exchanges)
    const rollingHistory = historyMessages
      .slice(-10)
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    try {
      const chat = modelInstance.startChat({
        history: rollingHistory
      });

      const resultStream = await chat.sendMessageStream(userMessage);

      for await (const chunk of resultStream.stream) {
        const textChunk = chunk.text();
        yield textChunk;
      }
    } catch (error) {
      console.error("[Gemini API Error] Chat communication failure:", {
        status: error.status,
        message: error.message
      });
      
      // Parse rate limit or generic API errors
      if (error.status === 429 || error.message?.includes('429')) {
        console.warn("[Gemini API] Rate limit exceeded (429).");
        throw new Error("RATE_LIMIT");
      }
      if (error.status === 403 || error.message?.includes('403') || error.message?.includes('leaked')) {
        console.error("[Gemini API] API Key forbidden or leaked (403).");
        throw new Error("INVALID_KEY");
      }
      if (error.message?.includes('quota') || error.message?.includes('limit')) {
        console.warn("[Gemini API] Quota exceeded.");
        throw new Error("QUOTA_EXCEEDED");
      }
      if (error.message?.includes('API key') || error.message?.includes('key not valid')) {
        console.error("[Gemini API] Invalid API Key.");
        throw new Error("INVALID_KEY");
      }
      if (error.status === 404 || error.message?.includes('not found')) {
        console.error("[Gemini API] Model not found (404).");
        throw new Error("INVALID_KEY"); // Map to invalid key so UI falls back gracefully
      }
      
      console.error("[Gemini API] Network or unknown failure.");
      throw new Error("NETWORK_FAILURE");
    }
  }
};
