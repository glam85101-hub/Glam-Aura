"use client";

import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

export type FaceAnalysisResult = {
  skinColor: string;
  dominantExpression: string;
  expressions?: faceapi.FaceExpressions;
  box?: faceapi.Box;
};

export default function FaceAnalyzer({
  running,
  onResult,
}: {
  running: boolean;
  onResult: (res: FaceAnalysisResult) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // load models + start cam
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };
    loadModels();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      onResult({
        skinColor: "",
        dominantExpression: "Permission denied or unavailable",
      });
    }
  };

  const getAverageHexColor = (data: Uint8ClampedArray) => {
    let r = 0,
      g = 0,
      b = 0;
    const count = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);

    return (
      "#" +
      [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
    );
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    
    if (running) {
      interval = setInterval(async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // make sure canvas size = video size
        if (
          canvas.width !== videoRef.current.videoWidth ||
          canvas.height !== videoRef.current.videoHeight
        ) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
        }

        const detections = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (detections) {
          const resized = faceapi.resizeResults(detections, {
            width: canvas.width,
            height: canvas.height,
          });
          const box = resized.detection.box;

          // draw bounding box
          ctx.strokeStyle = "lime";
          ctx.lineWidth = 2;
          ctx.strokeRect(box.x, box.y, box.width, box.height);

          // ✅ FIX: check box dimensions
          if (box.width > 0 && box.height > 0) {
            const faceImage = ctx.getImageData(
              box.x,
              box.y,
              box.width,
              box.height
            );
            const avgColor = getAverageHexColor(faceImage.data);

            const expressions = detections.expressions;
            const dominant =
              Object.entries(expressions).sort((a, b) => b[1] - a[1])[0]?.[0] ||
              "neutral";

            onResult({
              skinColor: avgColor,
              dominantExpression: dominant,
              expressions,
              box,
            });
          }
        } else {
          onResult({
            skinColor: "",
            dominantExpression: "No face detected",
          });
        }
      }, 300);
    }

    return () => clearInterval(interval);
  }, [running, onResult]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="rounded-2xl shadow-lg w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}