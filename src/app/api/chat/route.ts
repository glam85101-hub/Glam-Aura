import type { NextRequest } from "next/server";
import { createGenAI, GEMINI_MODEL } from "@/lib/gemini";

const genAI = createGenAI("GEMINI_API_KEY_1");

async function generateResponse(history: any[], userMessage: string) {
  const models = [GEMINI_MODEL];
  let lastError: any = null;

  const systemInstruction = `You are "Aura", the official AI style assistant for GlamAura. 
GlamAura is a high-end platform for personalized styling using AI.
We offer Facial Feature Analysis, Makeup Recommendations, and Outfit Analysis.
Your Tone: Professional, sophisticated, and stylish. Always keep responses concise.`;

  for (const modelName of models) {
    try {
      console.log(`Aura attempting ${modelName}...`);
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        systemInstruction: systemInstruction
      });

      // Gemini history MUST alternate: user, model, user, model...
      // And MUST NOT end with a model message if we are sending a new user message.
      const formattedHistory: any[] = [];
      let lastRole = "";
      let firstMessageProcessed = false;

      for (const m of history) {
        const currentRole = m.role === 'user' ? 'user' : 'model';
        
        // Skip any leading messages from the model
        if (!firstMessageProcessed && currentRole === 'model') {
          continue;
        }

        if (currentRole !== lastRole) {
          formattedHistory.push({
            role: currentRole,
            parts: [{ text: m.content }]
          });
          lastRole = currentRole;
        } else {
          // If the role is the same as the last one, combine the content.
          const lastMessage = formattedHistory[formattedHistory.length - 1];
          lastMessage.parts[0].text += `\n${m.content}`;
        }
        firstMessageProcessed = true;
      }

      const chat = model.startChat({
        history: formattedHistory,
      });

      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();
      
      if (!responseText) throw new Error("Empty response from AI");
      return responseText;

    } catch (err: any) {
      lastError = err;
      console.error(`Aura ${modelName} error details:`, err);
      continue;
    }
  }
  throw lastError || new Error("All AI routes exhausted");
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message required" }), { status: 400 });
    }

    const response = await generateResponse(history || [], message);

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err: any) {
    console.error("Chat API error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Aura encountered a style glitch. Please try again." }),
      { status: 500 }
    );
  }
}
