import { getPrisma } from "@/lib/prisma";

/** Number of free uses per AI feature before upgrade is required. */
export const FREE_TRIALS = 2;

/** Feature keys that consume usage. Must match client FeatureKey values. */
export const FEATURES = [
  "face-analyzer-front",
  "makeup-recommendations",
  "outfit-analyzer",
] as const;

export type FeatureKey = (typeof FEATURES)[number];

export function isFeatureKey(value: unknown): value is FeatureKey {
  return typeof value === "string" && (FEATURES as readonly string[]).includes(value);
}

export type UsageStatus = {
  feature: FeatureKey;
  used: number;
  limit: number;
  remaining: number;
  canUse: boolean;
  isPremium: boolean;
};

/**
 * Read the usage count for a feature. Missing rows count as 0 uses.
 */
export async function getUsageCount(userId: string, feature: FeatureKey): Promise<number> {
  const prisma = getPrisma();
  const row = await prisma.featureUsage.findUnique({
    where: { userId_feature: { userId, feature } },
    select: { count: true },
  });
  return row?.count ?? 0;
}

/**
 * Whether the user is allowed to use the feature right now.
 * Premium users bypass the free-trial limit.
 */
export async function checkUsage(
  userId: string,
  feature: FeatureKey
): Promise<UsageStatus> {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isPremium: true },
  });

  const used = await getUsageCount(userId, feature);
  const isPremium = user?.isPremium ?? false;

  return {
    feature,
    used,
    limit: FREE_TRIALS,
    remaining: Math.max(0, FREE_TRIALS - used),
    canUse: isPremium || used < FREE_TRIALS,
    isPremium,
  };
}

/**
 * Increment usage. No-ops when the free limit is reached
 * (non-premium) or when the user is premium.
 */
export async function recordUsage(userId: string, feature: FeatureKey): Promise<void> {
  const status = await checkUsage(userId, feature);
  if (status.isPremium || !status.canUse) return;

  const prisma = getPrisma();
  await prisma.featureUsage.upsert({
    where: { userId_feature: { userId, feature } },
    create: { userId, feature, count: 1 },
    update: { count: { increment: 1 } },
  });
}
