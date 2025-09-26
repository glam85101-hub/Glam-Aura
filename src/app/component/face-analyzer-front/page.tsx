"use client";

import { useState, useMemo } from "react";
import FaceAnalyzer, { FaceAnalysisResult } from "../face-analyzer-func/FaceAnalyzer";
import { debounce, getSkinToneDetails } from "@/utils/skinTone";

export default function FaceAnalyzerPage() {
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  // Debounced result handler
  const handleResult = useMemo(
    () =>
      debounce((res: FaceAnalysisResult) => {
        setResult(res);
        setLoading(false);
      }, 500),
    []
  );

  const skinDetails = result ? getSkinToneDetails(result.skinColor) : null;


  return (
    <section className="min-h-screen bg-[#f8f2ef] flex items-center justify-center py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start w-full max-w-6xl">

        {/* Camera Section */}
        <div className="relative w-full max-w-[700px] aspect-video md:h-[500px] rounded-xl overflow-hidden shadow-lg border-4 border-white flex items-center justify-center bg-black">
          {!cameraEnabled ? (
            <button
              onClick={() => {
                setCameraEnabled(true);
                setLoading(true);
              }}
              className="px-6 py-3 bg-[#52d8bb] text-white font-semibold rounded-xl shadow hover:bg-[#48c0a6] transition"
            >
              Enable Camera
            </button>
          ) : (
            <>
              <FaceAnalyzer running={true} onResult={handleResult} />

              {/* Disable Camera */}
              <button
                onClick={() => {
                  setCameraEnabled(false);
                  setResult(null);
                  setLoading(false);
                }}
                className="absolute bottom-4 right-4 px-6 py-3 bg-[#52d8bb] text-white font-semibold rounded-xl shadow hover:bg-[#48c0a6] transition"
              >
                Disable Camera
              </button>

              {loading && (
                <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded shadow">
                  <p className="text-sm font-medium text-gray-700">Analyzing... Please wait</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Suggestions Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-[380px]">
          <h2 className="text-2xl font-bold text-[#1f1f1f] mb-4 text-center md:text-left">Analysis Result</h2>

          {!result ? (
            <p className="text-gray-600 italic text-center md:text-left">
              {cameraEnabled ? "Waiting for detection..." : "Please enable camera to start analysis"}
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full border"
                  style={{ backgroundColor: skinDetails?.color }}
                ></div>
                <p className="text-lg font-semibold text-gray-800">
                  Skin Tone: <span className="font-normal">{skinDetails?.tone}</span>
                </p>
              </div>

              <p className="text-lg font-semibold text-gray-800">
                Expression: <span className="font-normal">{result.dominantExpression || "Unknown"}</span>
              </p>

              <p className="text-lg font-semibold text-gray-800">
                Season Type: <span className="font-normal">{skinDetails?.season}</span>
              </p>

              <div>
                <p className="text-lg font-semibold text-black mb-2">Suggested Colors:</p>
                <div className="flex flex-wrap gap-2">
                  {skinDetails?.suit.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium border bg-gray-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Theme button */}
              <div className="mt-4">
                <button
                  className={`inline-block px-6 py-3 rounded-full font-medium shadow transition animate-bounce ${
                    skinDetails?.tone === "Dark"
                      ? "bg-[#5af1d0] text-white hover:bg-[#49d3c0]"
                      : skinDetails?.tone === "Medium"
                      ? "bg-[#f1b75a] text-white hover:bg-[#d39e49]"
                      : skinDetails?.tone === "Neutral"
                      ? "bg-[#e0c097] text-white hover:bg-[#c8aa82]"
                      : "bg-[#f2d6cb] text-white hover:bg-[#e0bfb0]"
                  }`}
                >
                  Explore Suggestions
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}