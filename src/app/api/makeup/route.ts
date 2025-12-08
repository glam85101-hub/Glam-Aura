import type { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_3!);

// ✅ Retry helper
async function generateWithRetry(model: any, payload: any, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(payload);
    } catch (err: any) {
      const msg = err.message?.toLowerCase() || "";
      
      // If quota exceeded / 429 / 503 → throw special error
      if (msg.includes("quota") || msg.includes("429") || msg.includes("503")) {
        throw new Error("HIGH_TRAFFIC");
      }

      if (msg.includes("503") && i < retries - 1) {
        console.warn(`Retrying Gemini... attempt ${i + 1}`);
        await new Promise((res) => setTimeout(res, delay * (i + 1)));
        continue;
      }
      throw err; // Other errors
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
