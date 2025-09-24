import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Vision model
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this face and give: age, gender, expression, health (tiredness)." },
            { type: "image_url", image_url: { url: imageBase64 } },
          ],
        },
      ],
    });

    return NextResponse.json({ analysis: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    return NextResponse.json({ error: "Failed to analyze face" }, { status: 500 });
  }
}
