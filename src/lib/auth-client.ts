import { createAuthClient } from "better-auth/client";

// Empty baseURL = relative requests (same origin)
// Works on localhost:3000 AND personal-styling.xyz automatically
export const authClient = createAuthClient({
  baseURL: "",
});

export const { signIn, signUp, signOut, useSession } = authClient;
