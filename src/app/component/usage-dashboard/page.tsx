"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/component/AuthProvider";

import AuthModal from "@/components/AuthModal";
import Link from "next/link";
import {
  FEATURES,
  type FeatureKey,
  type UsageStatus,
} from "@/hooks/use-usage";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  ScanFace,
  Shirt,
  Sparkles,
  Crown,
  CheckCircle2,
  ArrowRight,
  Lock,
  LockKeyhole,
  type LucideIcon,
} from "lucide-react";

type StatusMap = Partial<Record<FeatureKey, UsageStatus>>;

const FEATURE_ICONS: Record<FeatureKey, LucideIcon> = {
  "face-analyzer-front": ScanFace,
  "makeup-recommendations": Sparkles,
  "outfit-analyzer": Shirt,
};

export default function UsageDashboard() {
  const { user, isSignedIn, isLoaded } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const isMobile = useIsMobile();
  const [usage, setUsage] = useState<StatusMap>({});
  const [usageLoaded, setUsageLoaded] = useState(false);

  useEffect(() => {
    if (!isSignedIn || !user?.id) {
      setUsage({});
      setUsageLoaded(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/usage?feature=all");
        if (!res.ok) throw new Error("Failed to load usage");
        const data = (await res.json()) as StatusMap;
        if (!cancelled) {
          setUsage(data);
          setUsageLoaded(true);
        }
      } catch {
        if (!cancelled) setUsageLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isSignedIn, user?.id]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  const isPremiumUser = Object.values(usage).some((s) => s?.isPremium);

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Subtle professional backdrop */}
      <div className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          {/* ── Header row: title + account summary ─────────────── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <motion.div
              initial={isMobile ? {} : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-teal mb-3">
                Dashboard
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-brand-dark">
                {isSignedIn && user?.name ? (
                  <>
                    Welcome back,{" "}
                    <span className="text-brand-teal">{user.name.split(" ")[0]}</span>
                  </>
                ) : (
                  <>
                    Your <span className="text-brand-teal">Usage</span>
                  </>
                )}
              </h1>
              <p className="mt-3 text-gray-600 font-medium max-w-xl">
                Track your remaining analyses and manage your plan — all in one place.
              </p>
            </motion.div>

            {/* Plan summary card */}
            {isSignedIn && (
              <motion.div
                initial={isMobile ? {} : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`flex items-center gap-4 rounded-2xl border px-6 py-4 shadow-sm bg-white w-fit ${
                  isPremiumUser
                    ? "border-brand-mint/40"
                    : "border-brand-teal/15"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPremiumUser
                      ? "bg-brand-dark text-brand-mint"
                      : "bg-brand-teal/10 text-brand-teal"
                  }`}
                >
                  {isPremiumUser ? <Crown className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    Current Plan
                  </p>
                  <p className="text-lg font-black text-brand-dark leading-tight">
                    {isPremiumUser ? "Elite" : "Free"}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {isPremiumUser
                      ? "Unlimited analyses"
                      : usageLoaded
                        ? "2 free analyses per feature"
                        : "Loading…"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {!isSignedIn ? (
            /* ── Signed-out state ─────────────────────────────── */
            <motion.div
              initial={isMobile ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white rounded-3xl p-12 shadow-sm border border-brand-teal/10 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 flex items-center justify-center mx-auto mb-6">
                <LockKeyhole className="h-8 w-8 text-brand-teal" />
              </div>
              <h2 className="text-2xl font-black text-brand-dark mb-3">
                Sign in to view your dashboard
              </h2>
              <p className="text-gray-500 mb-8 font-medium">
                Track your free analyses and manage your plan.
              </p>
              <button
                onClick={() => setShowAuth(true)}
                className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-teal transition-all shadow-lg active:scale-[0.98]"
              >
                Sign In
              </button>
              <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
            </motion.div>
          ) : (
            /* ── Feature usage grid ───────────────────────────── */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(Object.keys(FEATURES) as FeatureKey[]).map((key, idx) => {
                const feature = FEATURES[key];
                const Icon = FEATURE_ICONS[key];
                const status = usage[key];
                const count = status?.used ?? 0;
                const limit = status?.limit ?? 2;
                const isPro = status?.isPremium ?? false;
                const exhausted = status ? !status.canUse && !isPro : false;
                const remaining = Math.max(0, limit - count);
                const pct = isPro ? 100 : Math.min(100, (count / limit) * 100);

                return (
                  <motion.div
                    key={key}
                    initial={isMobile ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="relative flex flex-col bg-white rounded-3xl border border-brand-teal/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* Top accent line */}
                    <div
                      className={`h-1 w-full ${
                        isPro
                          ? "bg-gradient-to-r from-brand-teal via-brand-mint to-brand-teal"
                          : "bg-brand-teal/40"
                      }`}
                    />

                    <div className="p-7 flex flex-col flex-1">
                      {/* Icon + status badge */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
                          <Icon className="h-6 w-6" />
                        </div>

                        {isPro ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/20 text-brand-teal text-[10px] font-black uppercase tracking-[0.15em]">
                            <Crown className="h-3 w-3" /> Elite
                          </span>
                        ) : exhausted ? (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 text-[10px] font-black uppercase tracking-[0.15em]">
                            <Lock className="h-3 w-3" /> Trial Used
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-[10px] font-black uppercase tracking-[0.15em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                            Free
                          </span>
                        )}
                      </div>

                      {/* Name + description */}
                      <h3 className="text-lg font-black text-brand-dark leading-snug">
                        {feature.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-gray-500 font-medium leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Usage meter */}
                      <div className="mt-auto pt-7">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                          <span className="text-gray-400">
                            {isPro ? "Unlimited" : "Analyses Used"}
                          </span>
                          {!isPro && (
                            <span className={exhausted ? "text-amber-600" : "text-brand-teal"}>
                              {count} / {limit}
                            </span>
                          )}
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.7, delay: idx * 0.08 + 0.2 }}
                            className={`h-full rounded-full ${
                              isPro
                                ? "bg-gradient-to-r from-brand-teal to-brand-mint"
                                : exhausted
                                  ? "bg-amber-400"
                                  : "bg-brand-teal"
                            }`}
                          />
                        </div>

                        {/* Status line */}
                        <div className="mt-4 min-h-[20px]">
                          {isPro ? (
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-brand-teal">
                              <CheckCircle2 className="h-4 w-4" />
                              Unlimited access
                            </p>
                          ) : exhausted ? (
                            <p className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
                              <Lock className="h-4 w-4" />
                              Upgrade for unlimited analyses
                            </p>
                          ) : (
                            <p className="text-sm font-semibold text-brand-teal">
                              {remaining} of {limit} free{" "}
                              {remaining === 1 ? "analysis" : "analyses"} remaining
                            </p>
                          )}
                        </div>

                        {/* CTA */}
                        <Link
                          href={exhausted ? "/component/pricing" : feature.href}
                          className={`mt-5 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] ${
                            exhausted
                              ? "bg-brand-dark text-white hover:bg-brand-teal shadow-lg shadow-brand-dark/10"
                              : "bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white"
                          }`}
                        >
                          {exhausted ? "Upgrade to Elite" : "Open Feature"}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* ── Upgrade banner (free plan only) ─────────────────── */}
          {isSignedIn && usageLoaded && !isPremiumUser && (
            <motion.div
              initial={isMobile ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 rounded-3xl bg-brand-dark text-white p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-brand-mint/15 text-brand-mint flex items-center justify-center flex-shrink-0">
                  <Crown className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-1">Upgrade to Elite</h3>
                  <p className="text-gray-300 text-sm font-medium max-w-lg leading-relaxed">
                    Unlimited AI analyses across face, makeup, and outfit tools — a one-time
                    investment for lifelong style confidence.
                  </p>
                </div>
              </div>
              <Link
                href="/component/pricing"
                className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-brand-mint text-brand-dark font-black text-sm hover:bg-white transition-all flex-shrink-0 active:scale-[0.98]"
              >
                View Plans <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
