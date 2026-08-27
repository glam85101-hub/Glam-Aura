"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/app/component/AuthProvider";

export type FeatureKey =
  | "makeup-recommendations"
  | "outfit-analyzer"
  | "face-analyzer-front";

export const FEATURES: Record<FeatureKey, { name: string; description: string; icon: string; href: string }> = {
  "makeup-recommendations": {
    name: "Makeup Recommendations",
    description: "AI-powered makeup shade and technique suggestions",
    icon: "💄",
    href: "/component/makeup-recommendations",
  },
  "outfit-analyzer": {
    name: "Outfit Analyzer",
    description: "Get instant feedback on your outfit style and coordination",
    icon: "👗",
    href: "/component/outfit-analyzer",
  },
  "face-analyzer-front": {
    name: "Face & Skin Analyzer",
    description: "Detect skin undertones, seasonal palettes, and facial features",
    icon: "🪞",
    href: "/component/face-analyzer-front",
  },
};

const FREE_TRIALS = 1;

function getStorageKey(userId: string): string {
  return `glam_aura_usage_${userId}`;
}

function getUsageData(userId: string): Partial<Record<FeatureKey, number>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsageData(userId: string, data: Partial<Record<FeatureKey, number>>) {
  localStorage.setItem(getStorageKey(userId), JSON.stringify(data));
}

export function useUsage(featureKey: FeatureKey) {
  const { user, isSignedIn } = useAuth();
  const [usageCount, setUsageCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isSignedIn && user?.id) {
      const data = getUsageData(user.id);
      const raw = data[featureKey] || 0;
      // Clamp stale data to FREE_TRIALS
      const clamped = Math.min(raw, FREE_TRIALS);
      if (clamped !== raw) {
        const updated = { ...data, [featureKey]: clamped };
        saveUsageData(user.id, updated);
      }
      setUsageCount(clamped);
    }
    setIsLoaded(true);
  }, [isSignedIn, user?.id, featureKey]);

  const recordUsage = useCallback(() => {
    if (!user?.id) return;
    const data = getUsageData(user.id);
    const current = data[featureKey] || 0;
    // Cap at FREE_TRIALS so it never goes over
    if (current >= FREE_TRIALS) return;
    const updated = { ...data, [featureKey]: current + 1 };
    saveUsageData(user.id, updated);
    setUsageCount(current + 1);
  }, [user?.id, featureKey]);

  const canUse = isSignedIn && usageCount < FREE_TRIALS;
  const isPro = usageCount >= FREE_TRIALS;

  return { usageCount, canUse, isPro, isLoaded, recordUsage, freeTrials: FREE_TRIALS };
}
