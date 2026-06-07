import type { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY_2!);

// ✅ Retry helper
async function generateWithRetry(model: any, payload: any, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(payload);
    } catch (err: any) {
      const msg = err.message?.toLowerCase() || "";
      
      if (msg.includes("quota") || msg.includes("429") || msg.includes("503") || msg.includes("overloaded")) {
        throw new Error("HIGH_TRAFFIC");
      }

      if (i < retries - 1) {
        console.warn(`Retrying Gemini Face API... attempt ${i + 1}`);
        await new Promise((res) => setTimeout(res, delay * (i + 1)));
        continue;
      }
      throw err;
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { image_b64 } = await req.json();

    if (!image_b64) {
      return new Response(JSON.stringify({ error: "Image required" }), { status: 400 });
    }

      const systemPrompt = `
You are a face and skin tone analysis AI. Analyze the input face image and return structured JSON.

Analyze the following and return it in a single JSON object:
1. Facial Features:
    - faceShape
    - eyeShape
    - eyeColor
    - skinTone (e.g., "Fair", "Medium", "Olive", "Deep")
    - undertone (e.g., "Warm", "Cool", "Neutral")
    - lipShape
2. Overall Analysis:
    - skinColor: The dominant skin color as a hex code.
    - tone: A general skin tone category ("Dark", "Medium", "Light", "Neutral"). This should be consistent with skinTone.
    - season: The color season ("Winter", "Summer", "Autumn", "Spring").
    - dominantExpression: The most prominent facial expression ("Happy", "Neutral", "Sad", etc.).
    - suit: An array of 5 color names that complement the skin tone.
    - description: A 1-2 sentence summary of the overall facial features.

Return ONLY the JSON object with the keys: "features", "skinColor", "tone", "season", "dominantExpression", "suit", "description". The "features" key should contain an object with its specified keys.
`;


    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

    const result = await generateWithRetry(model, {
      contents: [
        {
          role: "user",
          parts: [
            { text: systemPrompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: image_b64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const output = result.response.text();
    const analysis = JSON.parse(output);

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

 } catch (err: any) {
    console.error("Face API error:", err);

    if (err.message === "HIGH_TRAFFIC") {
      return new Response(
        JSON.stringify({ error: "High traffic detected, please try again in a moment." }),
        { status: 429 }
      );
    }

    return new Response(JSON.stringify({ error: err.message || "Server error" }), { status: 500 });
  }
}