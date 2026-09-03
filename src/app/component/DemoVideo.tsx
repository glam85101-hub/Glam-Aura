"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

export default function DemoVideo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Demo Video Button */}
      <section className="py-8 flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 px-8 py-4 bg-brand-teal text-white rounded-2xl font-bold shadow-xl shadow-brand-teal/20 hover:bg-brand-dark transition-all transform hover:-translate-y-1 active:scale-95"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Demo Video</span>
        </button>
      </section>

      {/* Video Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            <video
              src="/demo-video.mp4"
              controls
              autoPlay
              className="w-full aspect-video"
            />
          </div>
        </div>
      )}
    </>
  );
}
