'use client';

import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Sparkles, Shirt, Palette, X, ChevronRight, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';

type Analysis = {
  verdict: string;
  summary: string;
  strengths: string[];
  fixes: string[];
  colorPalette: { name: string; hex: string }[];
  score: number;
  suggestedPieces: string[];
};

export default function OutfitAnalyzerPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileB64, setFileB64] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const themedGrad = useMemo(() => 'bg-gradient-to-br from-white via-blue-50 to-green-50', []);

  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      const base64 = result.split(',')[1] || result;
      setFileB64(base64);
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
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_b64: fileB64, note }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAnalysis(data.analysis as Analysis);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
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

  return (
    <main className={`min-h-screen ${themedGrad} text-slate-800`}>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="flex items-center justify-between">
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-3xl md:text-4xl font-bold tracking-tight">
            Outfit Check <span className="text-[#45c0a5]">AI</span>
          </motion.h1>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div className="rounded-2xl border border-green-200 bg-white/70 shadow-sm backdrop-blur p-5 flex flex-col" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
            <div className="flex items-center gap-2 text-[#46c7ab] font-semibold">
              <Camera className="h-5 w-5" /> Upload your outfit photo
            </div>

            <div className="mt-4 flex-1 grid place-items-center">
              {imagePreview ? (
                <div className="relative w-full">
                 <Image
  src={imagePreview}
  alt="Preview"
  width={600}   // you must provide width
  height={400}  // you must provide height
  className="w-full rounded-xl border"
  unoptimized   // 👈 add this since `imagePreview` is base64
/>

                  <button onClick={reset} className="absolute top-2 right-2 rounded-full bg-white/80 p-2 border hover:bg-blue-50" aria-label="Remove image">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-56 rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/40 cursor-pointer hover:bg-blue-50 transition">
                  <Upload className="h-6 w-6" />
                  <span className="mt-2 text-sm text-slate-600">Drag & drop or click to browse</span>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onBrowse} />
                </label>
              )}
            </div>

            <div className="mt-4">
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g., university event, smart casual, humid weather" className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 outline-none focus:ring-2 focus:ring-blue-300" rows={3} />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={analyze}
                disabled={loading || !fileB64}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#46c7ab] to-[#2a7968] px-4 py-2 text-white disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}{' '}
                Analyze Outfit
              </button>                
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50">
                <Shirt className="h-4 w-4" /> Reset
              </button>
            </div>
                
            {error && <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          </motion.div>

          <motion.div className="rounded-2xl border border-blue-200 bg-white/70 shadow-sm backdrop-blur p-5">
            <div className="flex items-center gap-2 text-blue-700 font-semibold">
              <Palette className="h-5 w-5" /> Result
            </div>

            {!analysis ? (
              <p className="mt-4 text-slate-600 text-sm">Upload a photo and hit Analyze. The AI will evaluate your look.</p>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between rounded-xl border bg-white p-3">
                  <span className="text-lg">
  {analysis.verdict} <span className="text-slate-500">({analysis.score}/100)</span>
</span>

                </div>

                <p className="text-slate-700 leading-relaxed">{analysis.summary}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-white p-3">
                    <h3 className="font-semibold mb-2">Strengths</h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-blue-300" /><span>{s}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border bg-white p-3">
                    <h3 className="font-semibold mb-2">Quick Fixes</h3>
                    <ul className="space-y-1 text-sm text-slate-700">
                      {analysis.fixes.map((s, i) => (
                        <li key={i} className="flex items-start gap-2"><ChevronRight className="h-4 w-4 mt-0.5 text-blue-600" /><span>{s}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-3">
                  <h3 className="font-semibold mb-3">Suggested Palette</h3>
                  <div className="flex flex-wrap gap-3">
                    {analysis.colorPalette.map((c, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full border" style={{ background: c.hex }} />
                        <span className="text-sm">{c.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-3">
                  <h3 className="font-semibold mb-2">Try Adding</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.suggestedPieces.map((p, i) => (
                      <span key={i} className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </main>
  );
}