import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// ── Model Constants ──────────────────────────────────────────────
export const GEMINI_MODEL = "gemini-3.5-flash" as const;

// ── Retry Helper ─────────────────────────────────────────────────
export async function generateWithRetry(
  model: GenerativeModel,
  payload: Parameters<GenerativeModel["generateContent"]>[0],
  retries = 3,
  delay = 2000
) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(payload);
    } catch (err: any) {
      const msg = err?.message?.toLowerCase() || "";

      // Quota / rate-limit / overload → throw special error
      if (
        msg.includes("quota") ||
        msg.includes("429") ||
        msg.includes("503") ||
        msg.includes("overloaded")
      ) {
        throw new Error("HIGH_TRAFFIC");
      }

      if (i < retries - 1) {
        console.warn(`Retrying Gemini... attempt ${i + 1}`);
        await new Promise((res) => setTimeout(res, delay * (i + 1)));
        continue;
      }

      throw err;
    }
  }
  throw new Error("All retries exhausted");
}

// ── Helper to get a genAI client from an env var ─────────────────
export function createGenAI(envKey: string): GoogleGenerativeAI {
  const key = (process.env[envKey] || "").replace(/['"]/g, "").trim();
  if (!key) {
    console.warn(`Warning: ${envKey} is not set`);
  }
  return new GoogleGenerativeAI(key);
}
