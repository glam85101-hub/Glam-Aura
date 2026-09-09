import { PrismaClient } from "@prisma/client";

// Lazy singleton avoids connecting during build (no DATABASE_URL at build time).
let prisma: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prisma) {
    const g = globalThis as any;
    if (!g.__prisma) {
      g.__prisma = new PrismaClient();
    }
    prisma = g.__prisma as PrismaClient;
  }
  return prisma;
}

export default getPrisma;
