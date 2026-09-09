"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/component/AuthProvider";

export type FeatureKey =
  | "makeup-recommendations"
  | "outfit-analyzer"
  | "face-analyzer-front";

export const FEATURES: Record<
  FeatureKey,
  { name: string; description: string; href: string }
> = {
  "makeup-recommendations": {
    name: "Makeup Recommendations",
    description: "AI-powered makeup shade and technique suggestions",
    href: "/component/makeup-recommendations",
  },
  "outfit-analyzer": {
    name: "Outfit Analyzer",
    description: "Get instant feedback on your outfit style and coordination",
    href: "/component/outfit-analyzer",
  },
  "face-analyzer-front": {
    name: "Face & Skin Analyzer",
    description: "Detect skin undertones, seasonal palettes, and facial features",
    href: "/component/face-analyzer-front",
  },
};

export type UsageStatus = {
  feature: FeatureKey;
  used: number;
  limit: number;
  remaining: number;
  canUse: boolean;
  isPremium: boolean;
};

/**
 * Tracks feature usage on the server (DB-backed, can't be bypassed
 * by clearing localStorage). Free trial limit is enforced in the API
 * routes; premium users bypass it.
 */
export function useUsage(featureKey: FeatureKey) {
  const { user, isSignedIn, isLoaded } = useAuth();
  const [status, setStatus] = useState<UsageStatus | null>(null);

  const refresh = useCallback(async () => {
    if (!isSignedIn || !user?.id) {
      setStatus(null);
      return;
    }
    try {
      const res = await fetch(`/api/usage?feature=${featureKey}`);
      if (!res.ok) {
        setStatus(null);
        return;
      }
      setStatus(await res.json());
    } catch {
      setStatus(null);
    }
  }, [featureKey, isSignedIn, user?.id]);

  useEffect(() => {
    if (isLoaded) {
      refresh();
    }
  }, [isLoaded, refresh]);

  const recordUsage = useCallback(() => {
    // Usage is recorded server-side by the AI routes after a
    // successful analysis; refresh so the UI reflects it.
    refresh();
  }, [refresh]);

  const usageCount = status?.used ?? 0;
  const isPremium = status?.isPremium ?? false;
  const freeTrials = status?.limit ?? 1;
  const exhausted =
    isSignedIn && status !== null && !status.canUse && !isPremium;

  return {
    usageCount,
    canUse: isSignedIn && (isPremium || usageCount < freeTrials),
    isPro: isPremium,
    isPremium,
    exhausted,
    isLoaded: isLoaded && status !== null,
    recordUsage,
    refresh,
    freeTrials,
  };
}
