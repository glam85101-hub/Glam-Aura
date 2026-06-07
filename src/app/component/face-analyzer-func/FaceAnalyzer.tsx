'use client';

import React, { useRef, useEffect } from "react";

import { Features } from "../facial-analysis/FacialAnalysis";
export type FaceAnalysisResult = {
  skinColor: string;
  tone: string;
  undertone: string;
  season: string;
  dominantExpression: string;
  suit: string[];
  palette?: { name: string; hex: string }[];
  description?: string;
  features: Features; 
};

export interface FaceAnalyzerProps {
  running: boolean;
  onResult: (result: FaceAnalysisResult) => void;
  onError?: (error: string) => void;
  streamRef?: React.MutableRefObject<MediaStream | null>; // optional stream ref from parent
}

const FaceAnalyzer: React.FC<FaceAnalyzerProps> = ({ running, onResult, onError, streamRef }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Capture frame and send to Gemini API
  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const scale = Math.min(1, 640 / video.videoWidth);
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ensure video has loaded
    if (canvas.width === 0 || canvas.height === 0) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frameB64 = canvas.toDataURL("image/jpeg").split(",")[1];

    if (!frameB64) {
      if (onError) onError("Failed to capture frame");
      return;
    }

    try {
      const res = await fetch("/api/face", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_b64: frameB64 }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (onError) onError(data.error || "Analysis failed");
        return;
      }
      if (data.analysis) onResult(data.analysis); // Gemini result
    } catch (err: any) {
      console.error("Gemini API error:", err);
      if (onError) onError(err.message || "Connection error");
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

      let failureCount = 0;
      const maxFailures = 5;

      const loop = async () => {
        if (!running) return;
        
        try {
          await captureFrame();
          failureCount = 0; // Reset on success
        } catch (err) {
          failureCount++;
          console.warn(`Capture failed (${failureCount}/${maxFailures}):`, err);
          if (failureCount >= maxFailures) {
            if (onError) onError("Multiple capture failures - please try again");
            return;
          }
        }
        
        setTimeout(loop, 2000);
      };
      loop();
    } catch (err) {
      console.error("Camera error:", err);
      if (onError) onError("Camera access denied or not available");
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
}, [running, streamRef, onError]);

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