import type { NextRequest } from "next/server";
import { createGenAI, generateWithRetry, GEMINI_MODEL } from "@/lib/gemini";

const genAI = createGenAI("GEMINI_API_KEY_2");

export async function POST(req: NextRequest) {
  try {
    // Require authentication
    const { getSession } = await import("@/lib/session");
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

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


    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

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