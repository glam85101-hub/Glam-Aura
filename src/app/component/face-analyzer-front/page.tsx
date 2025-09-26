"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import FaceAnalyzer, { FaceAnalysisResult } from "../face-analyzer-func/page";
import { Droplet, Smile, Sun } from "lucide-react";


export default function FaceAnalyzerPage() {
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);
  const [showColors, setShowColors] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);

  const handleEnableCamera = () => setCameraEnabled(true);

  const handleDisableCamera = () => {
    setCameraEnabled(false);
    setResult(null);
    setShowColors(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleResetResults = () => {
    setResult(null);
    setShowColors(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2eceab] via-white to-[#4ea893] flex flex-col items-center p-6">
      {/* Animated Title */}
      <header className="flex items-center justify-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-[#1f1f1f]"
        >
          Facial Feature <span className="text-[#46c7ab]">Analyzer</span>
        </motion.h1>
      </header>

      {/* Main content: Camera + Results */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8 md:gap-10">
        {/* Camera Section */}
        <div className="relative w-full md:w-2/3 aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white bg-black flex items-center justify-center">
          {!cameraEnabled ? (
            <button
              onClick={handleEnableCamera}
              className="px-6 py-3 bg-[#52d8bb] text-white font-semibold rounded-xl shadow hover:bg-[#48c0a6]"
            >
              Enable Camera
            </button>
          ) : (
            <>
              <FaceAnalyzer
                running={true}
                onResult={setResult}
                streamRef={streamRef}
              />
              <button
                onClick={handleDisableCamera}
                className="absolute bottom-4 right-4 px-6 py-3 bg-[#52d8bb] text-white font-semibold rounded-xl shadow hover:bg-[#48c0a6]"
              >
                Disable Camera
              </button>
            </>
          )}
        </div>

        {/* Analysis Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:w-1/3 flex flex-col">
          {!result ? (
            <p className="text-gray-600 text-center md:text-left mt-4">
              {cameraEnabled
                ? "Waiting for analysis..."
                : "Enable the camera to start analysis."}
            </p>
          ) : (
            <>
{/* Feature Display with Icons */}
<p className="text-lg font-semibold flex items-center gap-2">
  <Droplet className="w-5 h-5 text-[#52d8bb]" />
  Skin Tone: <span className="font-normal">{result.tone}</span>
</p>

<p className="text-lg font-semibold flex items-center gap-2">
  <Smile className="w-5 h-5 text-[#facc15]" />
  Expression: <span className="font-normal">{result.dominantExpression}</span>
</p>

<p className="text-lg font-semibold flex items-center gap-2">
  <Sun className="w-5 h-5 text-[#f97316]" />
  Season: <span className="font-normal">{result.season}</span>
</p>

{/* Dynamic description from Gemini */}
{result.description && (
  <p className="mt-2 text-gray-700 italic">{result.description}</p>
)}


              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={() => setShowColors(!showColors)}
                  className="px-6 py-3 rounded-full font-medium shadow bg-[#52d8bb] text-white hover:bg-[#48c0a6] transition"
                >
                  {showColors ? "Hide Colors" : "Explore Colors"}
                </button>

                <button
                  onClick={handleResetResults}
                  className="px-6 py-3 rounded-full font-medium shadow bg-[#032c23] text-white hover:bg-[#48c0a6] transition "
                >
                  Reset Results
                </button>
              </div>

              {/* Show color suggestions */}
              {showColors && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {result.suit.map((color, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-medium border bg-gray-200"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
