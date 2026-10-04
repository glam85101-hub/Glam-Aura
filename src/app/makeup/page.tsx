import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Instant facial feature detection",
  "Customized makeup shade matching",
  "Trend-aware beauty suggestions",
];

const swatches = ["#F5D3B3", "#E7B08A", "#C98A6B", "#9C6244", "#6E4130"];

export default function Pallete() {
  return (
    <section className="relative bg-white py-16 sm:py-24 lg:py-28 overflow-hidden">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -top-24 -right-20 w-96 h-96 bg-brand-mint/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">

        {/* ===== Left: copy ===== */}
        <div className="order-2 lg:order-1" data-aos="fade-right">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            AI Beauty Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark leading-tight tracking-tight">
            Precision <span className="text-brand-teal italic">Beauty Analysis</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            Our AI reads your facial features and skin undertones to deliver
            makeup recommendations built for your face — never a generic preset.
          </p>

          <ul className="mt-8 space-y-4 max-w-lg">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center shadow-md shadow-brand-teal/20">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span className="font-semibold text-brand-dark text-base sm:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/makeup-guide"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white rounded-full font-bold text-base sm:text-lg shadow-xl shadow-brand-teal/20 hover:bg-brand-dark transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Start Beauty Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-500 font-medium">
              Works on any selfie · no special lighting needed
            </p>
          </div>
        </div>

        {/* ===== Right: device preview ===== */}
        <div
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          data-aos="fade-left"
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-brand-teal/5 rounded-full blur-3xl" />

          <div className="group relative w-[280px] sm:w-[320px] aspect-[9/18.5] bg-brand-dark rounded-[3rem] shadow-2xl shadow-brand-dark/25 overflow-hidden border-[8px] border-brand-dark ring-4 ring-brand-dark/5 transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/pallete.jpg"
              alt="AI beauty analysis preview"
              fill
              sizes="320px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-brand-dark/10 to-brand-dark/25" />

            {/* Status chip */}
            <div className="absolute top-6 left-6">
              <span className="inline-block bg-brand-mint text-brand-dark text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-full shadow-lg">
                AI Powered
              </span>
            </div>

            {/* Result card */}
            <div className="absolute left-4 right-4 bottom-6">
              <div className="rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-2xl border border-white/60 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal">
                    Analysis Complete
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                </div>
                <p className="text-brand-dark font-black text-sm leading-snug">
                  Warm undertone · Soft Autumn palette
                </p>
                <div className="mt-3 flex gap-1.5">
                  {swatches.map((color) => (
                    <span
                      key={color}
                      className="w-6 h-6 rounded-full ring-1 ring-black/5 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
