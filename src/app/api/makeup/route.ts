import type { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_3!);

// ✅ Retry helper
async function generateWithRetry(model: any, payload: any, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(payload);
    } catch (err: any) {
      if (err.message?.includes("503") && i < retries - 1) {
        console.warn(`Retrying Gemini... attempt ${i + 1}`);
        await new Promise((res) => setTimeout(res, delay * (i + 1)));
        continue;
      }
      throw err; // if not 503 or out of retries
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { image_b64, note } = await req.json();
    if (!image_b64) {
      return new Response(JSON.stringify({ error: "Image required" }), { status: 400 });
    }

    const system = `You are a professional makeup stylist. Analyze the face in the input image and return structured JSON with:
- features { faceShape, eyeShape, eyeColor, skinTone, undertone, lipShape }
- summary (short description)
- bestMakeupTips[]
- avoidTips[]
- colorPalette[{name,hex}]`;

    const userNote = note ? `Context: ${note}` : "";

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // ✅ Use retry helper instead of direct call
    const result = await generateWithRetry(model, {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${system}\n${userNote}` },
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
    console.error("Makeup API error:", err);
    return new Response(JSON.stringify({ error: err.message || "Server error" }), { status: 500 });
  }
}
