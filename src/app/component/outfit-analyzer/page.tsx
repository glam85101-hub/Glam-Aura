'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Sparkles, Shirt, Palette, X, ChevronRight, Check, Loader2, Crown } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/app/component/AuthProvider';
import AuthModal from '@/components/AuthModal';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { useUsage } from '@/hooks/use-usage';
import UpgradeModal from '@/components/UpgradeModal';

type Analysis = {
  verdict: string;
  summary: string;
  strengths: string[];
  fixes: string[];
  colorPalette: { name: string; hex: string }[];
  score: number;
  suggestedPieces: string[];
  mock?: boolean;
};

export default function OutfitAnalyzerPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileB64, setFileB64] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isMobile = useIsMobile();

  const handleFile = async (file: File) => {
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

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const onBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const analyze = async () => {
    if (!canUse) {
      setShowUpgrade(true);
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_b64: fileB64, note }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed - please try a different photo');
      }
      setAnalysis(data.analysis as Analysis);
      setWarning(data.warning || null);
      recordUsage();
    } catch (err: any) {
      const errorMsg = err.message || 'Something went wrong';
      setError(errorMsg);
      setWarning(null);
      console.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setFileB64(null);
    setNote('');
    setAnalysis(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const { isLoaded, isSignedIn } = useAuth();
  const { canUse, isPro, recordUsage } = useUsage('outfit-analyzer');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const canAnalyze = Boolean(fileB64 && isSignedIn && !loading);

  return (
    <main className="min-h-screen bg-brand-dark text-white selection:bg-brand-teal/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* HEADER */}
        <header className="text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Style AI
          </div>
          <motion.h1 
            initial={isMobile ? {} : { opacity: 0, y: -8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }} 
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6"
          >
            Outfit <span className="text-brand-teal italic">Analyzer</span>
          </motion.h1>
          <p className="text-lg text-gray-400 font-medium">
            Get instant feedback on your look. Our AI evaluates coordination, fit, and style to help you dress with confidence.
          </p>
        </header>

        <section className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Upload */}
          <motion.div 
            initial={isMobile ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl relative overflow-hidden group" 
            onDragOver={(e) => e.preventDefault()} 
            onDrop={onDrop}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl -z-10 group-hover:bg-brand-teal/20 transition-colors" />

            <div className="flex items-center gap-3 text-brand-teal font-bold text-sm uppercase tracking-widest mb-6">
              <Camera className="h-5 w-5" /> Outfit Photo
            </div>

            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-dashed border-white/10 bg-white/5 group/upload transition-all hover:border-brand-teal/50">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover/upload:opacity-100 opacity-0 transition-opacity flex items-center justify-center">
                    <button onClick={reset} className="rounded-full bg-white/10 backdrop-blur-md p-4 border border-white/20 hover:bg-white/20 transition-all text-white">
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-brand-teal/20 text-brand-teal flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform">
                    <Upload className="h-8 w-8" />
                  </div>
                  <span className="text-lg font-bold text-white mb-2">Drop your outfit photo</span>
                  <span className="text-sm text-gray-400">Full body shots work best</span>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onBrowse} />
                </label>
              )}
            </div>

            <div className="mt-6">
              <label className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2 block">Optional Note</label>
              <textarea 
                value={note} 
                onChange={(e) => setNote(e.target.value)} 
                placeholder="e.g., date night, business meeting, job interview..." 
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-brand-teal/50 transition-all" 
                rows={3} 
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={isPro ? () => setShowUpgrade(true) : analyze}
                disabled={!isPro && !canAnalyze}
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
                    Analyze Outfit
                  </>
                )}
              </button>
              <button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-white font-bold hover:bg-white/10 transition-all">
                <Shirt className="h-4 w-4" /> Reset
              </button>
            </div>

            {!isLoaded ? null : !isSignedIn ? (
              <div className="mt-6 rounded-2xl border border-brand-teal/20 bg-brand-teal/5 p-6 text-center">
                <p className="font-bold text-white mb-4">Sign in to unlock AI analysis</p>
                <button onClick={() => setShowAuth(true)} className="w-full py-4 rounded-xl bg-brand-teal text-brand-dark font-black hover:bg-white transition-all">Connect Now</button>
              </div>
            ) : null}

            {warning && <p className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-400 font-medium text-center">{warning}</p>}
            {error && <p className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 font-medium text-center">{error}</p>}
          </motion.div>

          {/* RIGHT: Results */}
          <motion.div 
            initial={isMobile ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl min-h-[600px] flex flex-col"
          >
            <div className="flex items-center gap-3 text-brand-teal font-bold text-sm uppercase tracking-widest mb-8">
              <Palette className="h-5 w-5" /> Style Verdict
            </div>

            {!analysis ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 rounded-[2rem] bg-brand-teal/10 flex items-center justify-center text-brand-teal mb-6">
                  <Shirt className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ready to Judge</h3>
                <p className="text-gray-500 max-w-[240px]">Upload your photo to get a detailed style score and breakdown.</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between p-6 rounded-[2rem] bg-brand-teal/10 border border-brand-teal/20">
                  <span className="text-2xl font-black text-white">{analysis.verdict}</span>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-black text-brand-teal">{analysis.score}</span>
                    <span className="text-[10px] uppercase font-black text-gray-500 tracking-tighter">Style Score</span>
                  </div>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed italic">"{analysis.summary}"</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-brand-teal font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                      <Check className="h-4 w-4" /> Strengths
                    </h3>
                    <ul className="space-y-3">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-gray-300 flex gap-3">
                          <span className="text-brand-teal font-black">✦</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-blue-400 font-bold uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                      <ChevronRight className="h-4 w-4" /> Improvements
                    </h3>
                    <ul className="space-y-3">
                      {analysis.fixes.map((s, i) => (
                        <li key={i} className="text-sm text-gray-300 flex gap-3">
                          <span className="text-blue-400 font-black">›</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Harmonious Palette</h4>
                  <div className="flex flex-wrap gap-6">
                    {analysis.colorPalette.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                        <div className="h-10 w-10 rounded-xl border border-white/20 shadow-lg transition-transform group-hover:scale-110" style={{ background: c.hex }} />
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-white">{c.name}</span>
                          <span className="text-[10px] text-gray-500 uppercase">{c.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Try Adding These</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.suggestedPieces.map((p, i) => (
                      <span key={i} className="rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-bold text-brand-teal hover:bg-brand-teal hover:text-brand-dark transition-colors cursor-default">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </section>

      </div>

      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} featureName="Outfit Analyzer" />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </main>
  );
}