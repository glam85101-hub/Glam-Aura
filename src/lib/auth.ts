import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// Lazy PrismaClient — avoids build-time DB connection
let prisma: any = null;
function getPrisma() {
  if (!prisma) {
    // Dynamic require to avoid build-time evaluation
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const PrismaClient = require("@prisma/client").PrismaClient;
    const g = globalThis as any;
    g.__prisma = g.__prisma || new PrismaClient();
    prisma = g.__prisma;
  }
  return prisma;
}

export const auth = betterAuth({
  // Lazy adapter — getPrisma() is only called at runtime
  database: prismaAdapter(getPrisma(), {
    provider: "postgresql",
  }),
  appName: "Glam Aura",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    "https://personal-styling.xyz",
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
  advanced: {
    database: {
      joins: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  defaultCookieAttributes: {
    sameSite: "lax",
  },
});

export type Session = typeof auth.$Infer.Session;
