"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function MakeupFeature() {
  return (
    <section className="bg-brand-beige py-8 overflow-hidden relative rounded-3xl">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-mint/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div data-aos="fade-right" className="relative z-10 order-2 lg:order-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm uppercase tracking-wider">
              AI Beauty Engine
            </div>
            <Badge variant="default" className="bg-[#46c7ab]">Fixed</Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-tight">
            Precision <span className="text-brand-teal italic">Beauty Analysis</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            Our advanced AI evaluates your unique facial features and skin undertones to provide hyper-personalized makeup and beauty recommendations.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Instant facial feature detection",
              "Customized makeup shade matching",
              "Trend-aware beauty suggestions",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-brand-dark font-semibold">
                <span className="w-6 h-6 rounded-full bg-brand-mint/20 text-brand-teal flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              href="/component/makeup-recommendations"
              className="px-8 py-4 bg-brand-teal text-white rounded-2xl font-bold shadow-xl shadow-brand-teal/20 hover:bg-brand-dark transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 w-fit"
            >
              Start Beauty Analysis
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2" data-aos="fade-left">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-teal/5 rounded-full blur-3xl -z-10"></div>
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/18.5] bg-brand-dark rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-brand-dark ring-4 ring-white/10 group transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/pallete.jpg"
              alt="AI Beauty Analysis Preview"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-4 text-white font-bold text-sm tracking-wide">
                AI SCANNING... 98%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutfitFeature() {
  return (
    <section className="bg-brand-beige py-8 overflow-hidden relative rounded-3xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div className="relative flex justify-center lg:justify-start" data-aos="fade-right">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-mint/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/18.5] bg-brand-dark rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-brand-dark ring-4 ring-white/10 group transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/outfit.jpg"
              alt="AI Outfit Analysis Preview"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark/60"></div>
            <div className="absolute top-6 left-6 right-6">
              <div className="bg-brand-mint text-brand-dark text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-full w-fit shadow-lg">
                Personalized Selection
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm uppercase tracking-wider">
              Style Advisor
            </div>
            <Badge variant="default" className="bg-[#46c7ab]">Fixed</Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-tight">
            The Ultimate <span className="text-brand-teal italic">Outfit Checker</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            Our smart advisor analyzes your aesthetic and helps you choose the perfect outfit based on current trends, your color palette, and the occasion.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-brand-teal/5">
              <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">Occasion</p>
              <p className="text-brand-dark font-bold">Party Ready</p>
            </div>
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-brand-teal/5">
              <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">Confidence</p>
              <p className="text-brand-dark font-bold">100% Boost</p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/component/outfit-analyzer"
              className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold shadow-xl shadow-brand-dark/20 hover:bg-brand-teal transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 w-fit"
            >
              Check Your Outfit
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkinAnalysisFeature() {
  return (
    <section className="bg-brand-beige py-8 overflow-hidden rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div data-aos="fade-right" className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm uppercase tracking-wider">
              Smart Technology
            </div>
            <Badge variant="secondary" className="bg-[#5af1d0] text-brand-dark">Testing</Badge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-tight">
            Uncover Your <span className="text-brand-teal italic">Perfect Palette</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            You&rsquo;re just one selfie away from a data-driven color analysis. Our AI-powered engine identifies the precise shades that enhance your natural features.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/component/face-analyzer-front"
              className="px-8 py-4 bg-brand-teal text-white rounded-2xl font-bold shadow-xl shadow-brand-teal/20 hover:bg-brand-dark transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2"
            >
              Analyze Your Skin Tone
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end" data-aos="fade-left">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-teal/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-mint/20 rounded-full blur-2xl -z-10"></div>
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/18.5] bg-brand-dark rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-brand-dark ring-4 ring-white/10 group transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-brand-dark rounded-b-2xl z-20"></div>
            <div className="absolute inset-0">
              <Image
                src="/col.jpg"
                alt="AI Color Analysis Preview"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl transform transition-all duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-teal font-bold mb-0.5">Analysis Result</p>
                  <p className="text-lg font-black text-brand-dark">Light Summer</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"/></svg>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["#C6D7E2", "#B1C8DB", "#9AB6D4", "#BDAED6", "#E2C8E1", "#F4D0E1", "#EDBFD6", "#E4B0C8", "#F2A8B0", "#F7B5A6"].map((color, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md shadow-inner transition-transform hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="mt-4 text-[11px] text-gray-500 font-medium text-center italic">98% match with your skin undertones</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Features() {
  return (
    <section className="bg-[#f8f2ef] text-black body-font min-h-screen">
      <div className="container px-4 sm:px-6 py-12 mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="tracking-widest text-xs font-semibold text-[#46c7ab] mb-2 uppercase">
            Glam-Aura Suite
          </h2>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            AI-Powered Style Mastery
          </h1>
          <p className="mt-6 text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Experience the future of personal styling. Our integrated AI ecosystem provides precision-guided insights for your color, outfit, and facial features, helping you manifest your most confident self.
          </p>
        </div>

        <div className="space-y-6">
          <MakeupFeature />

          <OutfitFeature />

          <SkinAnalysisFeature />
          
          <div className="bg-white rounded-3xl shadow-lg border border-brand-teal/5 p-8 text-center">
            <div className="inline-block px-4 py-1.5 mb-5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm uppercase tracking-wider">
              Upcoming
            </div>
            <h2 className="text-3xl font-bold mb-2">Facial Landmark Testing</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We are currently testing advanced facial landmark detection to provide even more precise styling advice.
            </p>
            <Link 
              href="/component/facial-analysis"
              className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-teal transition-all inline-block"
            >
              View Test Results
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}