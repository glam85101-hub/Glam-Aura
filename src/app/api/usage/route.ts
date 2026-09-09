import type { NextRequest } from "next/server";
import { getSession } from "@/lib/session";
import { checkUsage, isFeatureKey, FEATURES } from "@/lib/usage";

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const feature = req.nextUrl.searchParams.get("feature");

  // ?feature=all → status map for every feature (used by the dashboard)
  if (feature === "all") {
    const statuses = await Promise.all(
      FEATURES.map((f) => checkUsage(session.user.id, f))
    );
    const byFeature = Object.fromEntries(
      statuses.map((s) => [s.feature, s])
    );
    return Response.json(byFeature);
  }

  if (!isFeatureKey(feature)) {
    return Response.json({ error: "Invalid feature" }, { status: 400 });
  }

  const status = await checkUsage(session.user.id, feature);
  return Response.json(status);
}
