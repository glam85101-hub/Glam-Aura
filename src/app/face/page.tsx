import Image from "next/image";
import Link from "next/link";

export default function FacePage() {
  return (
    <section className="bg-brand-beige py-24 overflow-hidden relative min-h-screen">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

        {/* Left Image */}
        <div
          className="relative flex justify-center lg:justify-start"
          data-aos="fade-right"
        >
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-mint/5 rounded-full blur-3xl -z-10 animate-pulse"></div>

          {/* Mobile Mockup */}
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/18.5] bg-brand-dark rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-brand-dark ring-4 ring-white/10 group transition-transform duration-500 hover:scale-[1.02]">

            <Image
              src="/col.jpg"
              alt="AI Skin Color Analysis Preview"
              fill
              sizes="320px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/20 via-transparent to-brand-dark/70"></div>

            {/* Top Badge */}
            <div className="absolute top-6 left-6 right-6">
              <div className="bg-brand-mint text-brand-dark text-[10px] font-black uppercase tracking-widest py-1.5 px-3 rounded-full w-fit shadow-lg">
                AI Color Analysis
              </div>
            </div>

            {/* Analysis Result */}
            <div className="absolute bottom-5 left-4 right-4 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl">

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-teal font-bold mb-1">
                    Analysis Result
                  </p>

                  <p className="text-lg font-black text-brand-dark">
                    Light Summer
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z" />
                  </svg>
                </div>
              </div>

              {/* Color Palette */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  "#C6D7E2",
                  "#B1C8DB",
                  "#9AB6D4",
                  "#BDAED6",
                  "#E2C8E1",
                  "#F4D0E1",
                  "#EDBFD6",
                  "#E4B0C8",
                  "#F2A8B0",
                  "#F7B5A6",
                ].map((color, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md shadow-inner transition-transform hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <p className="mt-4 text-[11px] text-gray-500 font-medium text-center italic">
                98% match with your skin undertones
              </p>
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div
          data-aos="fade-left"
          className="relative z-10"
        >
          {/* Badge */}
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm uppercase tracking-wider">
            Smart Technology
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-dark leading-tight">
            Uncover Your{" "}
            <span className="text-brand-teal italic">
              Perfect Palette
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
            You&rsquo;re just one selfie away from a data-driven color
            analysis. Our AI-powered engine identifies the precise shades
            that enhance your natural features.
          </p>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-teal/5">
              <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">
                Skin Tone
              </p>
              <p className="text-brand-dark font-bold">
                Personalized
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-teal/5">
              <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">
                Color Match
              </p>
              <p className="text-brand-dark font-bold">
                98% Accuracy
              </p>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/face-analyzer"
              className="px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold shadow-xl shadow-brand-dark/20 hover:bg-brand-teal transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 w-fit"
            >
              Analyze Your Skin Tone
              <span className="text-xl">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}