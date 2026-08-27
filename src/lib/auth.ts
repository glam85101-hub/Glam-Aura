import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

// Singleton Prisma client for serverless/edge environments
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const auth = betterAuth({
  // ─── Database ───────────────────────────────────────
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // ─── App Identity ───────────────────────────────────
  appName: "Glam Aura",

  // ─── Base URL ───────────────────────────────────────
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  // ─── Trusted Origins (CSRF protection) ──────────────
  trustedOrigins: [
    "http://localhost:3000",
    "https://personal-styling.xyz",
  ],

  // ─── Email & Password Auth ──────────────────────────
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false, // Enable when email sending is configured
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // ─── Google Social Login ────────────────────────────
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

  // ─── Session Configuration ──────────────────────────
  session: {
    expiresIn: 60 * 60 * 24 * 7,  // 7 days
    updateAge: 60 * 60 * 24,       // Refresh every 24 hours
  },

  // ─── Email Verification (unconfigure when email is set up) ─
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url, token }) => {
  //     // TODO: Integrate with Resend/SendGrid
  //     console.log(`Verify ${user.email}: ${url}`);
  //   },
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   expiresIn: 3600,
  // },

  // ─── Cookie Settings ────────────────────────────────
  defaultCookieAttributes: {
    sameSite: "lax",
    // httpOnly and secure are set automatically based on baseURL protocol
  },
});

export type Session = typeof auth.$Infer.Session;
