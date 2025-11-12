'use client';

import React, { useRef, useEffect } from "react";

export type FaceAnalysisResult = {
  skinColor: string;
  tone: string;
  season: string;
  dominantExpression: string;
  suit: string[];
  description?: string; // <-- add optional description from Gemini
};

export interface FaceAnalyzerProps {
  running: boolean;
  onResult: (result: FaceAnalysisResult) => void;
  streamRef?: React.MutableRefObject<MediaStream | null>; // optional stream ref from parent
}

const FaceAnalyzer: React.FC<FaceAnalyzerProps> = ({ running, onResult, streamRef }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Capture frame and send to Gemini API
  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frameB64 = canvas.toDataURL("image/jpeg").split(",")[1];

    try {
      const res = await fetch("/api/face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_b64: frameB64 }),
      });

      const data = await res.json();
      if (data.analysis) onResult(data.analysis); // Gemini result
    } catch (err) {
      console.error("Gemini API error:", err);
    }
  };

useEffect(() => {
  if (!running) {
    // Stop all tracks
    const tracks = streamRef?.current?.getTracks() || [];
    tracks.forEach(track => track.stop());
    if (streamRef) streamRef.current = null;

    // Also remove the srcObject from video
    if (videoRef.current) videoRef.current.srcObject = null;
    return;
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      if (videoRef.current) videoRef.current.srcObject = stream;
      if (streamRef) streamRef.current = stream;

      const loop = async () => {
        if (!running) return;
        await captureFrame();
        setTimeout(loop, 2000);
      };
      loop();
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  startCamera();

  return () => {
    // Stop camera on unmount
    const tracks = streamRef?.current?.getTracks() || [];
    tracks.forEach(track => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    if (streamRef) streamRef.current = null;
  };
}, [running, streamRef]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="rounded-xl w-full h-full object-cover transform -scale-x-100"
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default FaceAnalyzer;
