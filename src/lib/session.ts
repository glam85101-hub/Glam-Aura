import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Get the authenticated session from the request headers.
 * Returns null if the user is not authenticated.
 */
export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Require authentication — throws 401 if not authenticated.
 * Use in API routes: `const session = await requireAuth();`
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Response(
      JSON.stringify({ error: "Unauthorized — please sign in" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  return session;
}
