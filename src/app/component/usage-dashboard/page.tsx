"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/app/component/AuthProvider";

import AuthModal from "@/components/AuthModal";
import Link from "next/link";
import { FEATURES, type FeatureKey } from "@/hooks/use-usage";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { Crown, Zap, Lock, CheckCircle } from "lucide-react";

function getUsageData(userId: string): Partial<Record<FeatureKey, number>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(`glam_aura_usage_${userId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function UsageDashboard() {
  const { user, isSignedIn, isLoaded } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const isMobile = useIsMobile();
  const [usage, setUsage] = useState<Partial<Record<string, number>>>({});

  useEffect(() => {
    if (isSignedIn && user?.id) {
      setUsage(getUsageData(user.id));
    }
  }, [isSignedIn, user?.id]);

  const FREE_TRIALS = 1;

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-brand-beige flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-beige py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Dashboard
          </div>
          <motion.h1
            initial={isMobile ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-brand-dark"
          >
            Your <span className="text-brand-teal italic">Usage</span>
          </motion.h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Track your feature usage and unlock unlimited access with Elite.
          </p>
        </header>

        {!isSignedIn ? (
          <motion.div
            initial={isMobile ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white rounded-[2.5rem] p-12 shadow-xl border border-brand-teal/10 max-w-lg mx-auto"
          >
            <Lock className="h-12 w-12 text-brand-teal mx-auto mb-6" />
            <h2 className="text-2xl font-black text-brand-dark mb-4">Sign In Required</h2>
            <p className="text-gray-500 mb-8 font-medium">
              Sign in to track your feature usage and access your free trials.
            </p>
            <button onClick={() => setShowAuth(true)} className="w-full py-4 bg-brand-dark text-white rounded-2xl font-black text-lg hover:bg-brand-teal transition-all shadow-xl active:scale-[0.98]">
              Sign In
            </button>
            <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
          </motion.div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(FEATURES) as FeatureKey[]).map((key, idx) => {
              const feature = FEATURES[key];
              const count = usage[key] || 0;
              const isPro = count >= FREE_TRIALS;
              const remaining = Math.max(0, FREE_TRIALS - count);

              return (
                <motion.div
                  key={key}
                  initial={isMobile ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative bg-white rounded-[2rem] p-8 shadow-xl border transition-all duration-300 hover:-translate-y-1 ${
                    isPro
                      ? "border-brand-mint/30 shadow-brand-mint/10"
                      : "border-brand-teal/10 shadow-brand-teal/5"
                  }`}
                >
                  {/* Status badge */}
                  {isPro ? (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-mint/20 text-brand-teal text-xs font-black uppercase tracking-wider">
                      <Crown className="h-3 w-3" /> Pro
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-black uppercase tracking-wider">
                      <Zap className="h-3 w-3" /> Free Trial
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-4xl mb-4">{feature.icon}</div>

                  {/* Feature name */}
                  <h3 className="text-xl font-black text-brand-dark mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium mb-6">
                    {feature.description}
                  </p>

                  {/* Usage bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-2">
                      <span className="text-gray-400">Trials Used</span>
                      <span className={isPro ? "text-brand-teal" : "text-gray-600"}>
                        {count} / {FREE_TRIALS}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (count / FREE_TRIALS) * 100)}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${isPro ? "bg-brand-mint" : "bg-brand-teal"}`}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  {isPro ? (
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                      <CheckCircle className="h-4 w-4 text-brand-teal" />
                      <span>Free trial used — Upgrade for unlimited</span>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-brand-teal">
                      {remaining} free trial{remaining !== 1 ? "s" : ""} remaining
                    </p>
                  )}

                  {/* Go to feature */}
                  <Link
                    href={isPro ? "/component/pricing" : feature.href}
                    className={`mt-6 block w-full py-3 rounded-xl text-center font-bold text-sm transition-all ${
                      isPro
                        ? "bg-brand-dark text-white hover:bg-brand-teal"
                        : "bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white"
                    }`}
                  >
                    {isPro ? "Upgrade to Continue →" : "Use Feature"}
                  </Link>
                </motion.div>
              );
            })}
          </div>
          </>
        )}
      </div>
    </div>
  );
}
