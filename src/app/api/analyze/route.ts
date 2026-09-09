import type { NextRequest } from "next/server";
import { createGenAI, generateWithRetry, GEMINI_MODEL } from "@/lib/gemini";
import { checkUsage, recordUsage } from "@/lib/usage";

const genAI = createGenAI("GEMINI_API_KEY_4");

export async function POST(req: NextRequest) {
  try {
    // Require authentication
    const { getSession } = await import("@/lib/session");
    const session = await getSession();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { image_b64, note } = await req.json();

    if (!image_b64) {
      return new Response(JSON.stringify({ error: "Image required" }), {
        status: 400,
      });
    }

    // Server-side free trial / premium enforcement
    const usage = await checkUsage(session.user.id, "outfit-analyzer");
    if (!usage.canUse) {
      return new Response(
        JSON.stringify({
          error: "Free trial used. Upgrade to Elite for unlimited analysis.",
          upgradeRequired: true,
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const system = `You are a fashion stylist. Analyze the outfit in the input image.
- Rate from 0-100.
- Return JSON only with keys:
verdict (short text only),
summary,
strengths[],
fixes[],
colorPalette[{name,hex}],
score (number only),
suggestedPieces[].`;

    const userNote = note ? `Context: ${note}` : "";

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
    });

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

    // Record usage only after a successful analysis
    await recordUsage(session.user.id, "outfit-analyzer");

    return new Response(JSON.stringify({ analysis }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("Outfit API error:", err);

    // ✅ Always return friendly high-traffic message
    if (err.message === "HIGH_TRAFFIC") {
      return new Response(
        JSON.stringify({
          error: "High traffic detected, please try again in a moment."
        }),
        { status: 429 }
      );
    }

    return new Response(
      JSON.stringify({ error: err.message || "Server error" }),
      { status: 500 }
    );
  }
}
