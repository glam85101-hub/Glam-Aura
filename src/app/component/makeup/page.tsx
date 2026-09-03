import Image from "next/image";
import Link from "next/link";


export default function Pallete() {
  return (
    <section className="bg-brand-beige py-24 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-mint/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

        {/* Left Text */}
        <div data-aos="fade-right" className="relative z-10 order-2 lg:order-1">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm uppercase tracking-wider">
            AI Beauty Engine
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-tight">
            Precision <span className="text-brand-teal italic">Beauty Analysis</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            Our advanced AI evaluates your unique facial features and skin undertones to provide hyper-personalized makeup and beauty recommendations.
          </p>
          <ul className="mt-8 space-y-4">
             {[
               "Instant facial feature detection",
               "Customized makeup shade matching",
               "Trend-aware beauty suggestions"
             ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-brand-dark font-semibold">
                 <span className="w-6 h-6 rounded-full bg-brand-mint/20 text-brand-teal flex items-center justify-center">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                 </span>
                 {item}
               </li>
             ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/component/makeup-recommendations"
              className="px-8 py-4 bg-brand-teal text-white rounded-2xl font-bold shadow-xl shadow-brand-teal/20 hover:bg-brand-dark transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 w-fit"
            >
              Start Beauty Analysis
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2" data-aos="fade-left">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-teal/5 rounded-full blur-3xl -z-10"></div>

          {/* Mobile Mockup */}
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