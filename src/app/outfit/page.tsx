import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Upload your outfit",
    desc: "A full-body or half-body photo is enough.",
  },
  {
    n: "02",
    title: "AI scores the look",
    desc: "Coordination, fit, color harmony and occasion.",
  },
  {
    n: "03",
    title: "Get fixes & swaps",
    desc: "Concrete changes plus pieces that would lift it.",
  },
];

export default function Outfit() {
  return (
    <section className="relative bg-brand-dark py-16 sm:py-24 lg:py-28 overflow-hidden">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 bg-brand-teal/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 w-[28rem] h-[28rem] bg-brand-mint/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">

        {/* ===== Left: device preview ===== */}
        <div className="relative flex justify-center lg:justify-start" data-aos="fade-right">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-brand-mint/5 rounded-full blur-3xl" />

          <div className="group relative w-[280px] sm:w-[320px] aspect-[9/18.5] rounded-[3rem] overflow-hidden border-[8px] border-white/10 ring-1 ring-white/20 shadow-2xl shadow-black/60 transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/outfit.jpg"
              alt="AI outfit analysis preview"
              fill
              sizes="320px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-transparent to-brand-dark/75" />

            {/* Status chip */}
            <div className="absolute top-6 left-6">
              <span className="inline-block bg-brand-mint text-brand-dark text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-full shadow-lg">
                Personalized Selection
              </span>
            </div>

            {/* Report card */}
            <div className="absolute left-4 right-4 bottom-6">
              <div className="rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-2xl border border-white/60 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-teal">
                    Style Report
                  </span>
                  <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
                </div>
                <p className="text-brand-dark font-black text-sm leading-snug">
                  Strengths, fixes &amp; occasion-ready tips
                </p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-brand-teal/10 overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-brand-teal" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Right: copy ===== */}
        <div className="relative z-10" data-aos="fade-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-mint/15 text-brand-mint font-bold text-xs uppercase tracking-widest">
            Style Advisor
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            The Ultimate <span className="text-brand-mint italic">Outfit Checker</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
            Upload any outfit and get an honest AI critique — what works, what to
            change, and how to style it for where you&apos;re going.
          </p>

          {/* How it works — numbered steps (deliberately not another checklist) */}
          <ol className="mt-8 space-y-4 max-w-lg">
            {steps.map((step) => (
              <li
                key={step.n}
                className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-4"
              >
                <span className="shrink-0 w-9 h-9 rounded-xl bg-brand-mint text-brand-dark flex items-center justify-center font-black text-sm">
                  {step.n}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-white text-base sm:text-lg leading-snug">
                    {step.title}
                  </span>
                  <span className="block text-sm text-gray-400 leading-snug mt-0.5">
                    {step.desc}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <Link
              href="/outfit-checker"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white rounded-full font-bold text-base sm:text-lg shadow-xl shadow-brand-teal/20 hover:bg-brand-mint hover:text-brand-dark transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Check Your Outfit
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-500 font-medium">
              Works on any photo · full body or half body
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
