import type { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_2!);

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
You are a face and skin tone analysis AI. Analyze the input face image:
- Detect skin tone (Dark, Medium, Light, Neutral)
- Suggest season type (Winter, Summer, Autumn, Spring)
- Return dominant facial expression (e.g., Happy, Neutral, Sad)
- Suggest 5 colors that suit this skin tone
- Provide a short 1-2 sentence description of the facial features
- Return JSON only with keys: skinColor (hex), tone, season, dominantExpression, suit[], description
`;


    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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