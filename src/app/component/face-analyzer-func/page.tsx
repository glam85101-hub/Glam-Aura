"use client";

import React, { useState } from "react";
import FaceAnalyzer, { FaceAnalysisResult } from "../face-analyzer-func/FaceAnalyzer";

export default function Page() {
  const [result, setResult] = useState<FaceAnalysisResult | null>(null);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Face Analyzer</h1>
      <div className="h-[500px] w-full">
        <FaceAnalyzer running={true} onResult={setResult} />
      </div>
      {result && (
        <pre className="mt-4 p-3 bg-gray-100 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}