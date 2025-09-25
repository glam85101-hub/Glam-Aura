'use client';

import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

export type FaceAnalysisResult = {
  skinColor: string;
  dominantExpression?: string;
  expressions?: faceapi.FaceExpressions;
  box?: faceapi.Box;
};

export interface FaceAnalyzerProps {
  running: boolean;
  onResult: (result: FaceAnalysisResult) => void;
}

const FaceAnalyzer: React.FC<FaceAnalyzerProps> = ({ running, onResult }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 1280, height: 720, frameRate: 30 },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera error:", err);
        onResult({ skinColor: "", dominantExpression: "Permission denied" });
      }
    };

    loadModels();

    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, [onResult]);

  const getAverageHexColor = (data: Uint8ClampedArray) => {
    let r = 0, g = 0, b = 0;
    const count = data.length / 4;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    return "#" + [r, g, b].map(x => Math.round(x / count).toString(16).padStart(2, "0")).join("");
  };

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (canvas.width !== videoRef.current.videoWidth || canvas.height !== videoRef.current.videoHeight) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
      }

      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detection) {
        const resized = faceapi.resizeResults(detection, { width: canvas.width, height: canvas.height });
        const box = resized.detection.box;

        ctx.strokeStyle = "lime";
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        if (box.width && box.height) {
          const faceImage = ctx.getImageData(box.x, box.y, box.width, box.height);
          const avgColor = getAverageHexColor(faceImage.data);

          const expressions = detection.expressions;
          const dominant = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";

          onResult({ skinColor: avgColor, dominantExpression: dominant, expressions, box });
        }
      } else {
        onResult({ skinColor: "", dominantExpression: "No face detected" });
      }
    }, 300);

    return () => clearInterval(interval);
  }, [running, onResult]);

  return (
    <div className="relative w-full h-full">
      <video ref={videoRef} autoPlay playsInline muted className="rounded-2xl shadow-lg w-full h-full object-cover" />
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
    </div>
  );
};

export default FaceAnalyzer;
