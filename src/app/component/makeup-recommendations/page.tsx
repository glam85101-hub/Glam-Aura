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
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

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

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setFileB64(result.split(",")[1] || result);
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
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const res = await fetch("/api/makeup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_b64: fileB64 }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast({ title: "Error", description: err.message || "Error occurred" });
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
    <main className="min-h-screen bg-gradient-to-br from-[#2eceab] via-white to-[#4ea893] text-slate-800">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-4">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Makeup Stylist <span className="text-[#46c7ab]">AI</span>
          </motion.h1>
        </header>
        <section className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Upload & Controls */}
          <motion.div className="rounded-2xl border border-pink-200 bg-white/70 shadow-sm p-6 flex flex-col">
            <div className="flex items-center gap-2 text-[#46c7ab] font-semibold">
              <Camera className="h-5 w-5" /> Upload your face photo
            </div>
            <div className="flex-1 mt-4 grid place-items-center">
              {imagePreview ? (
                <div className="relative w-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={600}
                    height={400}
                    className="w-full rounded-xl border"
                    unoptimized
                  />
                  <button
                    onClick={reset}
                    className="absolute top-2 right-2 rounded-full bg-white/80 p-2 border hover:bg-pink-50"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  className="flex flex-col items-center justify-center w-full h-56 rounded-xl border-2 border-dashed border-pink-300 bg-pink-50/40 cursor-pointer hover:bg-pink-50 transition"
                  htmlFor="file-upload"
                >
                  <Upload className="h-6 w-6" />
                  <span className="mt-2 text-sm text-slate-600">
                    Click or drag & drop to upload
                  </span>
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
            {/* Buttons */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={analyze}
                disabled={loading || !fileB64}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#46c7ab] to-[#2a7968] px-4 py-2 text-white disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}{" "}
                Analyze Makeup
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
            {/* Error message */}
            {error && (
              <p className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </motion.div>
          {/* RIGHT: Results or Ready + Symbols below */}
          <motion.div className="rounded-2xl border border-purple-200 bg-white/70 shadow-sm p-6 flex flex-col min-h-[400px]">
            {loading || analysis ? (
              <>
                {analysis ? (
                  <div className="space-y-6 overflow-auto flex-grow">
                    {/* Summary */}
                    {analysis.summary && (
                      <p className="text-slate-700 leading-relaxed">
                        {analysis.summary}
                      </p>
                    )}

                    {/* Features with Icons */}
                    {analysis.features && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(analysis.features).map(([k, v]) => {
                          let Icon;
                          switch (k.toLowerCase()) {
                            case "faceshape":
                              Icon = Camera;
                              break;
                            case "eyeshape":
                              Icon = Eye;
                              break;
                            case "eyecolor":
                              Icon = Palette;
                              break;
                            case "skintone":
                              Icon = Sparkles;
                              break;
                            case "undertone":
                              Icon = Droplet;
                              break;
                            case "lipshape":
                              Icon = Smile;
                              break;
                            default:
                              Icon = Sparkles;
                          }
                          return (
                            <div
                              key={k}
                              className="rounded-xl border bg-white p-3 shadow-sm flex items-center gap-3"
                            >
                              <Icon className="h-5 w-5 text-[#46c7ab]" />
                              <div>
                                <p className="text-sm text-gray-500 capitalize">{k}</p>
                                <p className="font-semibold">{v}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Best Makeup Tips */}
                    {analysis.bestMakeupTips?.length > 0 && (
                      <div>
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <ThumbsUp className="text-[#46c7ab]" /> Best Makeup Tips
                        </h3>
                        <ul className="space-y-1 text-sm text-slate-700">
                          {analysis.bestMakeupTips.map((tip, i) => (
                            <li key={i}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Avoid These */}
                    {analysis.avoidTips?.length > 0 && (
                      <div>
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <ThumbsDown className="text-red-500" /> Avoid These
                        </h3>
                        <ul className="space-y-1 text-sm text-slate-700">
                          {analysis.avoidTips.map((tip, i) => (
                            <li key={i}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Suggested Palette */}
                    {analysis.colorPalette?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Suggested Palette</h3>
                        <div className="flex flex-wrap gap-3">
                          {analysis.colorPalette.map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div
                                className="h-7 w-7 rounded-full border"
                                style={{ background: c.hex }}
                              />
                              <span className="text-sm">{c.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-grow">
                    <Loader2 className="h-8 w-8 animate-spin text-[#46c7ab]" />
                    <span className="mt-3 text-slate-600">Analyzing...</span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
                <Sparkles className="h-9 w-9 text-[#46c7ab]" />
                <h2 className="mt-3 text-xl font-semibold">Ready for Analysis?</h2>
                <p className="mt-1 text-slate-600 max-w-xs mx-auto">
                  Upload your photo and start the analysis to get personalized makeup
                  recommendations.
                </p>
              </div>
            )}

            
          </motion.div>
        </section>
      </div>
    </main>
  );
}
