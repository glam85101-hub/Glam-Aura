"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import FaceAnalyzer, { FaceAnalysisResult } from "../face-analyzer-func/FaceAnalyzer";
import FacialAnalysis, { Features } from "../facial-analysis/FacialAnalysis";
import { Droplet, Smile, Sun, Camera, RefreshCw, Palette, Sparkles, Activity, Loader2, Crown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useUsage } from "@/hooks/use-usage";
import { useAuth } from "@/app/component/AuthProvider";
import AuthModal from "@/components/AuthModal";
import UpgradeModal from "@/components/UpgradeModal";

export default function FaceAnalyzerPage() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);
  const [showColors, setShowColors] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { canUse, isPro, isLoaded, recordUsage } = useUsage("face-analyzer-front");
  const { isSignedIn } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const usageRecordedRef = useRef(false);

  const streamRef = useRef<MediaStream | null>(null);

  const handleEnableCamera = () => {
    if (!isSignedIn) { setShowAuth(true); return; }
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    setCameraEnabled(true);
    setError(null);
  };

  const handleDisableCamera = () => {
    setCameraEnabled(false);
    setResult(null);
    setShowColors(false);
    setError(null);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleResetResults = () => {
    setResult(null);
    setShowColors(false);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-brand-dark text-white selection:bg-brand-teal/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* HEADER */}
        <header className="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Neural Scan
          </div>
          <motion.h1
            initial={isMobile ? {} : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6"
          >
            Facial Feature <span className="text-brand-teal italic">Analyzer</span>
          </motion.h1>
          <p className="text-lg text-gray-400 font-medium">
            Real-time biometric analysis to detect skin undertones, seasonal palettes, and facial expressions.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* LEFT/CENTER: Camera Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={isMobile ? {} : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-black group"
            >
              {!cameraEnabled ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm">
                  <div className="w-20 h-20 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center mb-6 animate-pulse">
                    <Camera className="h-10 w-10" />
                  </div>
                  <button
                    onClick={isPro ? () => setShowUpgrade(true) : handleEnableCamera}
                    className={`px-10 py-4 font-black rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 ${
                      isPro
                        ? "bg-brand-dark text-white hover:bg-brand-teal shadow-brand-dark/20"
                        : "bg-brand-teal text-brand-dark hover:bg-white shadow-brand-teal/20"
                    }`}
                  >
                    {isPro ? (
                      <span className="flex items-center gap-2">
                        <Crown className="h-5 w-5" /> Upgrade to Pro
                      </span>
                    ) : "Activate AI Scanner"}
                  </button>
                </div>
              ) : (
                <>
                  <FaceAnalyzer
                    running={true}
                    onResult={(res) => {
                      setResult(res);
                      setError(null);
                      if (!usageRecordedRef.current) {
                        usageRecordedRef.current = true;
                        recordUsage();
                      }
                    }}
                    onError={setError}
                    streamRef={streamRef}
                  />

                  {/* Overlay Controls */}
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <div className="px-4 py-2 rounded-full bg-brand-dark/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-brand-teal animate-ping" />
                      <span className="text-xs font-black uppercase tracking-widest text-white">Live Processing</span>
                    </div>
                  </div>

                  <button
                    onClick={handleDisableCamera}
                    className="absolute bottom-6 right-6 px-6 py-3 bg-red-500/80 backdrop-blur-md text-white font-bold rounded-xl shadow-lg hover:bg-red-500 transition-all z-20"
                  >
                    Stop Scanner
                  </button>
                </>
              )}
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                  <Activity className="h-5 w-5 text-brand-teal mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Frame Rate</span>
                  <span className="text-sm font-bold">60 FPS</span>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                  <Sparkles className="h-5 w-5 text-brand-teal mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Precision</span>
                  <span className="text-sm font-bold">High</span>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                  <RefreshCw className="h-5 w-5 text-brand-teal mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Latency</span>
                  <span className="text-sm font-bold">24ms</span>
               </div>
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                  <Palette className="h-5 w-5 text-brand-teal mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Colors</span>
                  <span className="text-sm font-bold">4K Bit</span>
               </div>
            </div>
          </div>

          {/* RIGHT: Analysis Section */}
          <motion.div 
            initial={isMobile ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl h-full flex flex-col"
          >
            <div className="flex items-center gap-3 text-brand-teal font-bold text-sm uppercase tracking-widest mb-8">
              <Activity className="h-5 w-5" /> Live Data
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-sm font-medium">
                {error}
              </div>
            )}

            {!result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-600 mb-6">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {cameraEnabled ? "Processing Face..." : "Awaiting Scanner"}
                </h3>
                <p className="text-gray-500 text-sm max-w-[200px]">
                  {cameraEnabled 
                    ? "Identifying key facial landmarks for analysis." 
                    : "Activate the camera to begin your facial analysis."}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {result.features && <FacialAnalysis features={result.features} />}

                {result.description && (
                  <div className="p-5 rounded-2xl bg-brand-teal/5 border border-brand-teal/10 italic text-sm text-gray-300 leading-relaxed">
                    "{result.description}"
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    onClick={() => setShowColors(!showColors)}
                    className="w-full py-4 bg-brand-teal text-brand-dark font-black rounded-2xl shadow-xl shadow-brand-teal/20 hover:bg-white transition-all transform hover:-translate-y-1"
                  >
                    {showColors ? "Hide Suggestions" : "Explore Color Palette"}
                  </button>

                  <button
                    onClick={handleResetResults}
                    className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Reset Analysis
                  </button>
                </div>

                {showColors && (
                  <motion.div 
                    initial={isMobile ? {} : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-6 space-y-6 overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2">
                      {result.suit.map((color, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
                          {color}
                        </span>
                      ))}
                    </div>

                    {result.palette && (
                      <div className="grid grid-cols-2 gap-3">
                        {result.palette.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                            <div 
                              className="w-8 h-8 rounded-lg border border-white/20 shadow-sm" 
                              style={{ backgroundColor: c.hex }}
                            />
                            <span className="text-[10px] font-black text-white uppercase truncate">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>

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

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} featureName="Face & Skin Analyzer" />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </main>
  );
}