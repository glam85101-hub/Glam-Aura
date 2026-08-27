"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  Sparkles,
  Palette,
  ThumbsUp,
  ThumbsDown,
  X,
  Loader2,
  Eye,
  Droplet,
  Smile,
  Crown,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useUsage } from "@/hooks/use-usage";
import { useAuth } from "@/app/component/AuthProvider";
import AuthModal from "@/components/AuthModal";
import UpgradeModal from "@/components/UpgradeModal";

type MakeupAnalysis = {
  summary: string;
  features: { [key: string]: string };
  bestMakeupTips: string[];
  avoidTips: string[];
  colorPalette: { name: string; hex: string }[];
};

export default function MakeupAnalyzerPage() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileB64, setFileB64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<MakeupAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isMobile = useIsMobile();
  const { canUse, isPro, isLoaded, recordUsage } = useUsage("makeup-recommendations");
  const { isSignedIn } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new (window as any).Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1024;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedB64 = canvas.toDataURL("image/jpeg", 0.8);
        setImagePreview(compressedB64);
        setFileB64(compressedB64.split(",")[1]);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
      setAnalysis(null);
      setError(null);
    }
  };

  const analyze = async () => {
    if (!fileB64) return;
    if (!isSignedIn) { setShowAuth(true); return; }
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch("/api/makeup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_b64: fileB64 }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed - please try a clearer photo");
      }
      setAnalysis(data.analysis);
      recordUsage();
      toast({ title: "Success!", description: "Makeup analysis complete" });
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.message || "Something went wrong";
      setError(errorMsg);
      toast({ title: "Error", description: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setFileB64(null);
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="min-h-screen bg-brand-dark text-white selection:bg-brand-teal/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* HEADER */}
        <header className="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            AI Stylist
          </div>
          <motion.h1
            initial={isMobile ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6"
          >
            Makeup <span className="text-brand-teal italic">Recommendations</span>
          </motion.h1>
          <p className="text-lg text-gray-400 font-medium">
            Let our AI analyze your features to recommend the perfect shades and techniques for your unique look.
          </p>
        </header>

        <section className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Upload & Controls */}
          <motion.div 
            initial={isMobile ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-teal/20 transition-colors" />

            <div className="flex items-center gap-3 text-brand-teal font-bold text-sm uppercase tracking-widest mb-6">
              <Camera className="h-5 w-5" /> Image Input
            </div>

            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-dashed border-white/10 bg-white/5 group/upload transition-all hover:border-brand-teal/50">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover/upload:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                    <button
                      onClick={reset}
                      className="rounded-full bg-white/10 backdrop-blur-md p-4 border border-white/20 hover:bg-white/20 transition-all text-white"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  htmlFor="file-upload"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 text-brand-teal flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform">
                    <Upload className="h-8 w-8" />
                  </div>
                  <span className="text-lg font-bold text-white mb-2">Drop your selfie</span>
                  <span className="text-sm text-gray-400">High quality images work best</span>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onBrowse}
                  />
                </label>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={isPro ? () => setShowUpgrade(true) : analyze}
                disabled={loading || (!isPro && !fileB64)}
                className={`flex-1 inline-flex items-center justify-center gap-3 rounded-2xl px-8 py-4 font-black text-lg shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 ${
                  isPro
                    ? "bg-brand-dark text-white hover:bg-brand-teal shadow-brand-dark/20"
                    : "bg-brand-teal text-brand-dark hover:bg-white shadow-brand-teal/20 disabled:opacity-50 disabled:transform-none"
                }`}
              >
                {isPro ? (
                  <>
                    <Crown className="h-5 w-5" />
                    Upgrade to Pro
                  </>
                ) : loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Analyze Features
                  </>
                )}
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-white font-bold hover:bg-white/10 transition-all"
              >
                Reset
              </button>
            </div>

            {error && (
              <motion.p 
                initial={isMobile ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 font-medium text-center"
              >
                {error}
              </motion.p>
            )}
          </motion.div>

          {/* RIGHT: Results */}
          <motion.div 
            initial={isMobile ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl min-h-[500px] flex flex-col"
          >
            <div className="flex items-center gap-3 text-brand-teal font-bold text-sm uppercase tracking-widest mb-8">
              <Palette className="h-5 w-5" /> AI Insight
            </div>

            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="relative w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-brand-teal/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-brand-teal rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Scanning Features</h3>
                <p className="text-gray-400 max-w-[200px]">Matching colors to your unique undertone...</p>
              </div>
            ) : analysis ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Summary */}
                <p className="text-gray-300 text-lg leading-relaxed italic">
                  "{analysis.summary}"
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {Object.entries(analysis.features).map(([k, v]) => {
                    let Icon = Sparkles;
                    if (k.toLowerCase().includes('eye')) Icon = Eye;
                    if (k.toLowerCase().includes('skin')) Icon = Droplet;
                    if (k.toLowerCase().includes('lip')) Icon = Smile;

                    return (
                      <div key={k} className="p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-brand-teal/30 transition-all">
                        <Icon className="h-4 w-4 text-brand-teal mb-3 group-hover:scale-110 transition-transform" />
                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-1">{k}</p>
                        <p className="text-white font-bold truncate">{v}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Tips & Guidance */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-brand-teal font-bold uppercase text-xs tracking-widest">
                      <ThumbsUp className="h-4 w-4" /> Essential
                    </h4>
                    <ul className="space-y-3">
                      {analysis.bestMakeupTips.map((tip, i) => (
                        <li key={i} className="text-sm text-gray-300 flex gap-3">
                          <span className="text-brand-teal flex-shrink-0">✦</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-2 text-red-400 font-bold uppercase text-xs tracking-widest">
                      <ThumbsDown className="h-4 w-4" /> Avoid
                    </h4>
                    <ul className="space-y-3">
                      {analysis.avoidTips.map((tip, i) => (
                        <li key={i} className="text-sm text-gray-400 flex gap-3">
                          <span className="text-red-400 flex-shrink-0">✕</span> {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Color Palette */}
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Signature Palette</h4>
                  <div className="flex flex-wrap gap-6">
                    {analysis.colorPalette.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                        <div
                          className="h-10 w-10 rounded-xl border border-white/20 shadow-lg transition-transform group-hover:scale-110"
                          style={{ background: c.hex }}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-white">{c.name}</span>
                          <span className="text-[10px] text-gray-500 uppercase">{c.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 rounded-[2rem] bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-6">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Awaiting Image</h3>
                <p className="text-gray-500 max-w-[240px]">Upload a photo to see your AI-generated makeup guide here.</p>
              </div>
            )}
          </motion.div>
        </section>

        {/* Sign-in prompt */}
        {isLoaded && !isSignedIn && (
          <div className="mt-12 max-w-lg mx-auto text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8">
            <p className="text-gray-400 font-medium mb-4">Sign in to use AI features and track your free trials</p>
            <button onClick={() => setShowAuth(true)} className="px-8 py-4 bg-brand-teal text-brand-dark rounded-2xl font-black hover:bg-white transition-all">
              Sign In
            </button>
          </div>
        )}

      </div>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} featureName="Makeup Recommendations" />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </main>
  );
}