"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Sparkles } from "lucide-react";
import Link from "next/link";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export default function UpgradeModal({ isOpen, onClose, featureName }: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-brand-teal via-brand-mint to-brand-teal" />

            <div className="p-8 text-center">
              {/* Crown icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-dark flex items-center justify-center">
                <Crown className="h-10 w-10 text-brand-mint" />
              </div>

              <h2 className="text-2xl font-black text-brand-dark mb-2">
                Pro Feature
              </h2>

              <p className="text-gray-500 font-medium mb-2">
                You&apos;ve used your free trial for
              </p>
              <p className="text-lg font-bold text-brand-dark mb-6">
                {featureName}
              </p>

              {/* Pro features list */}
              <div className="bg-brand-beige rounded-2xl p-6 mb-8 text-left">
                <p className="text-xs font-black text-brand-teal uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Sparkles className="h-3 w-3" /> ELITE PLAN INCLUDES
                </p>
                <ul className="space-y-2">
                  {[
                    "Unlimited AI analysis",
                    "Personalized style recommendations",
                    "Priority support",
                    "Seasonal trend alerts",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <span className="w-4 h-4 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA buttons */}
              <Link
                href="/component/pricing"
                className="block w-full py-4 bg-brand-dark text-white rounded-2xl font-black text-lg hover:bg-brand-teal transition-all shadow-xl shadow-brand-dark/20 active:scale-[0.98]"
              >
                Upgrade to Elite — $1
              </Link>

              <button
                onClick={onClose}
                className="mt-3 w-full py-3 text-gray-400 font-medium hover:text-gray-600 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
