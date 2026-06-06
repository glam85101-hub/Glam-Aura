import Image from "next/image";
import Link from "next/link";

export default function Outfit(){
  return (
    <section className="bg-brand-beige py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

        {/* Left Image */}
        <div className="relative flex justify-center lg:justify-start" data-aos="fade-right">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-mint/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

          {/* Mobile Mockup */}
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

        {/* Right Text */}
        <div data-aos="fade-left" className="relative z-10">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm uppercase tracking-wider">
            Style Advisor
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-tight">
            The Ultimate <span className="text-brand-teal italic">Outfit Checker</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
             Our smart advisor analyzes your aesthetic and helps you choose the perfect outfit based on current trends, your color palette, and the occasion.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-teal/5">
              <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">Occasion</p>
              <p className="text-brand-dark font-bold">Party Ready</p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-teal/5">
              <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">Confidence</p>
              <p className="text-brand-dark font-bold">100% Boost</p>
            </div>
          </div>
          <div className="mt-10">
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