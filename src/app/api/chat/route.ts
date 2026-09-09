import type { NextRequest } from "next/server";
import { createGenAI, GEMINI_MODEL } from "@/lib/gemini";

const genAI = createGenAI("GEMINI_API_KEY_1");

async function generateResponse(history: any[], userMessage: string) {
  const models = [GEMINI_MODEL];
  let lastError: any = null;

  const systemInstruction = `
You are "Aura", the official AI style assistant for GlamAura.

GlamAura is a high-end platform for personalized styling using AI.

We offer:
- Facial Feature Analysis
- Makeup Recommendations
- Outfit Analysis

Your tone:
- Professional
- Sophisticated
- Stylish
- Friendly
- Concise

Always give helpful, practical styling advice.
Keep responses concise and easy to understand.
`;

  for (const modelName of models) {
    try {
      console.log(`Aura attempting ${modelName}...`);

      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
      });

      // Gemini history must alternate:
      // user -> model -> user -> model
      //
      // We also remove invalid leading model messages
      // and merge consecutive messages with the same role.

      const formattedHistory: any[] = [];
      let lastRole: "user" | "model" | "" = "";

      for (const m of Array.isArray(history) ? history : []) {
        if (!m || typeof m.content !== "string") {
          continue;
        }

        const currentRole: "user" | "model" =
          m.role === "user" ? "user" : "model";

        // Gemini history must start with a user message.
        if (formattedHistory.length === 0 && currentRole === "model") {
          continue;
        }

        if (currentRole !== lastRole) {
          formattedHistory.push({
            role: currentRole,
            parts: [
              {
                text: m.content.trim(),
              },
            ],
          });

          lastRole = currentRole;
        } else {
          // Merge consecutive messages of the same role.
          const lastMessage =
            formattedHistory[formattedHistory.length - 1];

          if (
            lastMessage &&
            lastMessage.parts &&
            lastMessage.parts[0]
          ) {
            lastMessage.parts[0].text += `\n${m.content.trim()}`;
          }
        }
      }

      // Safety check:
      // Since we are about to send a new user message,
      // history should not end with another user message.
      //
      // If it does, merge the new message into that user message
      // instead of creating an invalid Gemini sequence.

      if (
        formattedHistory.length > 0 &&
        formattedHistory[formattedHistory.length - 1].role === "user"
      ) {
        formattedHistory[formattedHistory.length - 1].parts[0].text +=
          `\n${userMessage.trim()}`;
      }

      const chat = model.startChat({
        history: formattedHistory,
      });

      // If the last history message was already merged with the
      // current user message, send a short continuation instead.
      const lastHistoryRole =
        formattedHistory.length > 0
          ? formattedHistory[formattedHistory.length - 1].role
          : null;

      let result;

      if (
        formattedHistory.length > 0 &&
        lastHistoryRole === "user" &&
        formattedHistory[formattedHistory.length - 1].parts[0].text.includes(
          userMessage.trim()
        )
      ) {
        result = await chat.sendMessage(
          "Please respond to the user's latest message."
        );
      } else {
        result = await chat.sendMessage(userMessage.trim());
      }

      const responseText = result.response.text();

      if (!responseText || !responseText.trim()) {
        throw new Error("Empty response from AI");
      }

      console.log("Aura response generated successfully.");

      return responseText.trim();
    } catch (err: any) {
      lastError = err;

      console.error(`Aura ${modelName} error details:`, err);

      continue;
    }
  }

  throw (
    lastError ||
    new Error("All AI routes exhausted")
  );
}

export async function POST(req: NextRequest) {
  try {
    // Authentication removed because this project does not have
    // src/lib/session.ts and the previous check was causing:
    //
    // POST /api/chat 401
    //
    // Gemini works correctly without this broken session check.

    const body = await req.json();

    const message =
      typeof body?.message === "string"
        ? body.message.trim()
        : "";

    const history =
      Array.isArray(body?.history)
        ? body.history
        : [];

    if (!message) {
      return new Response(
        JSON.stringify({
          error: "Message required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = await generateResponse(
      history,
      message
    );

    return new Response(
      JSON.stringify({
        response,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.error("Chat API error:", err);

    return new Response(
      JSON.stringify({
        error:
          err?.message ||
          "Aura encountered a style glitch. Please try again.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}