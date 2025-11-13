import type { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_1!);

export async function POST(req: NextRequest) {
  try {
    const { image_b64, note } = await req.json();
    if (!image_b64) {
      return new Response(JSON.stringify({ error: "Image required" }), { status: 400 });
    }

    const system = `You are a fashion stylist. Analyze the outfit in the input image.
- Rate from 0-100.
- Return JSON only with keys: verdict (short text only), summary, strengths[], fixes[], colorPalette[{name,hex}], score (number only), suggestedPieces[].`;

    const userNote = note ? `Context: ${note}` : "";

    // ✅ Use gemini-2.0-flash (latest supported)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Gemini expects array of "parts" (text + inlineData for images)
    const result = await model.generateContent({
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
        responseMimeType: "application/json", // ✅ Forces JSON
      },
    });

    const output = result.response.text(); // Already a JSON string
    const analysis = JSON.parse(output);

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 }
    );
  }
}
