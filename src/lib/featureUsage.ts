import { prisma } from "./prisma";

const MAX_TRIALS = 3;

export async function handleFeature(
  userId: string,
  feature: "faceUses" | "makeupUses" | "outfitUses",
  runFeature: () => Promise<any>
) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { error: "User not found" };

  // ✅ Check limit BEFORE running the feature
  if (!user.isPro && user[feature] >= MAX_TRIALS) {
    return { error: "Trial limit reached. Upgrade to Pro.", upgrade: true };
  }

  // Run the AI feature
  const result = await runFeature();

  // Increment the usage counter AFTER running
  await prisma.user.update({
    where: { id: userId },
    data: { [feature]: user[feature] + 1 },
  });

  return { result, usage: user[feature] + 1 };
}
