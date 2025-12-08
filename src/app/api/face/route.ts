import type { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_2!);

export async function POST(req: NextRequest) {
  try {
    const { image_b64 } = await req.json();

    if (!image_b64) {
      return new Response(JSON.stringify({ error: "Image required" }), { status: 400 });
    }

   const systemPrompt = `
You are a face and skin tone analysis AI. Analyze the input face image:
- Detect skin tone (Dark, Medium, Light, Neutral)
- Suggest season type (Winter, Summer, Autumn, Spring)
- Return dominant facial expression (e.g., Happy, Neutral, Sad)
- Suggest 5 colors that suit this skin tone
- Provide a short 1-2 sentence description of the facial features
- Return JSON only with keys: skinColor (hex), tone, season, dominantExpression, suit[], description
`;


    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
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
        responseMimeType: "application/json", // Forces JSON output
      },
    });

    const output = result.response.text(); // JSON string
    const analysis = JSON.parse(output);

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

 } catch (err: any) {
    console.error("Face API error:", err);

    // ✅ Show friendly message for quota / high traffic
    if (err.message === "HIGH_TRAFFIC") {
      return new Response(
        JSON.stringify({ error: "High traffic detected, please try again in a moment." }),
        { status: 429 }
      );
    }

    return new Response(JSON.stringify({ error: err.message || "Server error" }), { status: 500 });
  }
}