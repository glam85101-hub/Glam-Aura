import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Sparkles,
  ScanFace,
  Shirt,
  Palette,
  ArrowRight,
  FileText,
  Download,
} from "lucide-react";

const tools = [
  {
    icon: ScanFace,
    title: "Face & Color Analysis",
    desc: "Map your face shape, skin tone and undertone from a single selfie — then get a personal color palette built for you.",
    href: "/face-analyzer",
    cta: "Analyze your face",
  },
  {
    icon: Shirt,
    title: "Outfit Checker",
    desc: "Upload a photo of any outfit for an honest AI critique: strengths, improvements and occasion-ready styling tips.",
    href: "/outfit-checker",
    cta: "Check an outfit",
  },
  {
    icon: Palette,
    title: "Makeup Recommendations",
    desc: "Receive makeup shades and product picks curated to your complexion, features and seasonal coloring.",
    href: "/makeup-guide",
    cta: "Get shade matches",
  },
];

export default function About() {
  return (
    <section className="relative bg-brand-beige text-brand-dark py-16 sm:py-24 overflow-hidden">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-brand-mint/20 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== HERO ===== */}
        <header className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Our Story
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-brand-dark tracking-tight mb-6">
            Blending Beauty with{" "}
            <span className="text-brand-teal italic">Intelligence</span>
          </h1>
          <div className="mx-auto mb-7 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            <span className="h-1 w-16 bg-gradient-to-r from-brand-teal to-brand-mint rounded-full" />
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint" />
          </div>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
            We&apos;re on a mission to revolutionize personal styling through the
            power of advanced AI, making high-end fashion insights accessible to
            everyone.
          </p>
        </header>

        {/* ===== MISSION & VISION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-14 sm:mb-20 max-w-6xl mx-auto">
          {/* Mission */}
          <div
            className="group relative p-7 sm:p-10 bg-white rounded-3xl sm:rounded-[2rem] shadow-lg shadow-brand-teal/5 border border-brand-teal/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-teal/10"
            data-aos="fade-up"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Target className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">
                  Our Mission
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-dark">
                  Making Style Simple
                </h3>
              </div>
            </div>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
              Fashion should be an expression of confidence, not a source of
              stress. We use AI to remove the guesswork, guiding you to your
              ideal look with precision.
            </p>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Our goal is to empower individuals to embrace their unique beauty
              with recommendations tailored exclusively for them.
            </p>
          </div>

          {/* Why Choose Us */}
          <div
            className="group relative p-7 sm:p-10 bg-brand-teal text-white rounded-3xl sm:rounded-[2rem] shadow-xl shadow-brand-teal/20 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative flex items-center gap-4 mb-6">
              <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/15 text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-brand-mint font-black text-xs uppercase tracking-widest mb-1">
                  Why Choose Us
                </p>
                <h3 className="text-xl sm:text-2xl font-bold">
                  AI Precision Styling
                </h3>
              </div>
            </div>
            <p className="relative text-brand-beige/90 text-base sm:text-lg leading-relaxed mb-4">
              By merging style expertise with neural network analysis, we
              provide hyper-personalized insights that help you feel confident
              every single day.
            </p>
            <p className="relative text-brand-beige/90 text-base sm:text-lg leading-relaxed">
              Accessible anywhere, our platform is your 24/7 personal stylist,
              evolving with your preferences and trends.
            </p>
          </div>
        </div>

        {/* ===== WHAT WE DO ===== */}
        <div
          className="relative bg-white rounded-[2rem] sm:rounded-[3rem] border border-brand-teal/10 shadow-lg shadow-brand-teal/5 px-5 sm:px-10 lg:px-14 py-12 sm:py-16 mb-12 sm:mb-16 overflow-hidden"
          data-aos="fade-up"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
              What We Do
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Three AI Tools, One Style Platform
            </h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-8 max-w-5xl mx-auto">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group flex flex-col bg-brand-beige border border-brand-teal/5 rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-teal/10 hover:border-brand-teal/30"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-mint flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform duration-500">
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-2.5">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                    {tool.desc}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-brand-teal font-bold text-sm transition-all group-hover:gap-2.5">
                    {tool.cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ===== FOUNDERS ===== */}
        <div className="relative bg-white rounded-[2rem] sm:rounded-[3rem] border border-brand-teal/10 shadow-lg shadow-brand-teal/5 overflow-hidden mb-12 sm:mb-16">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative px-5 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20">
            <div className="text-center mb-10 sm:mb-14" data-aos="fade-up">
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
                The Visionaries
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-brand-dark">
                Meet the Founders
              </h2>
            </div>

            {/* Co-founder spotlight — Zainab & Humema */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center max-w-5xl mx-auto mb-12 sm:mb-16"
              data-aos="fade-up"
            >
              <div className="relative w-full max-w-sm mx-auto lg:max-w-none group">
                <div className="absolute -inset-3 bg-brand-teal/10 rounded-[2rem] rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                <div className="relative aspect-[3/4] rounded-[1.75rem] overflow-hidden border-4 border-white shadow-2xl shadow-brand-teal/20">
                  <Image
                    src="/founder.jpeg"
                    alt="Faria Mustaqim and Humema Israr, co-founders of Glam Aura"
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
                  Co-Founders
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-dark mb-2">
                  Faria Mustaqim &amp; Humema Israr
                </h3>
                <p className="text-brand-teal font-black text-[11px] sm:text-xs uppercase tracking-widest mb-6">
                  Founders of Glam Aura
                </p>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4">
                  Glam Aura began with a shared belief: personal style should
                  feel effortless, not overwhelming. Together they lead the
                  product vision — pairing advanced AI with a real understanding
                  of what makes each person unique.
                </p>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  From the everyday experience to the intelligence behind every
                  recommendation, they work side by side to make high-end
                  styling guidance accessible to everyone.
                </p>
              </div>
            </div>

            <p
              className="text-center text-brand-teal font-black text-[11px] sm:text-xs uppercase tracking-[0.2em] mb-6 sm:mb-8"
              data-aos="fade-up"
            >
              The Team
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-4xl mx-auto">
              {/* Humema */}
              <div
                className="group relative bg-brand-beige p-6 sm:p-10 rounded-3xl border border-brand-teal/5 transition-all duration-500 hover:shadow-xl hover:shadow-brand-teal/10 hover:-translate-y-1.5"
                data-aos="fade-up"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-8 group-hover:rotate-6 transition-transform">
                  <div className="absolute inset-0 bg-brand-teal rounded-2xl shadow-lg shadow-brand-teal/20 -rotate-6"></div>
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/humema.jpeg"
                      alt="Humema Israr"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-brand-dark mb-1.5">
                  Humema Israr
                </h3>
                <p className="text-brand-teal font-black text-[11px] sm:text-xs uppercase tracking-widest mb-4">
                  Frontend &amp; Agentic AI Architect
                </p>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
                  Specializing in crafting intuitive, beautiful interfaces that
                  bring AI insights to life through seamless user experiences.
                </p>
              </div>

              {/* Faria */}
              <div
                className="group relative bg-brand-beige p-6 sm:p-10 rounded-3xl border border-brand-teal/5 transition-all duration-500 hover:shadow-xl hover:shadow-brand-teal/10 hover:-translate-y-1.5"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5 sm:mb-8 group-hover:-rotate-6 transition-transform">
                  <div className="absolute inset-0 bg-brand-dark rounded-2xl shadow-lg shadow-brand-dark/20 rotate-6"></div>
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src="/faria.jpg"
                      alt="Faria Mustaqim"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-brand-dark mb-1.5">
                  Faria Mustaqim
                </h3>
                <p className="text-brand-teal font-black text-[11px] sm:text-xs uppercase tracking-widest mb-4">
                  Backend &amp; AI Core Developer
                </p>
                <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
                  Expert in scalable AI architecture, ensuring that every
                  recommendation is fast, accurate, and data-driven.
                </p>
              </div>
            </div>

            <p
              className="mt-10 sm:mt-14 text-lg sm:text-xl font-bold text-brand-dark italic max-w-2xl mx-auto leading-relaxed text-center"
              data-aos="fade-up"
            >
              &ldquo;Together, we&apos;re building the future of personalized
              beauty and style.&rdquo;
            </p>
          </div>
        </div>

        {/* ===== BRAND DECK (PDF) ===== */}
        <div
          className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 bg-white rounded-[2rem] sm:rounded-[3rem] border border-brand-teal/10 shadow-lg shadow-brand-teal/5 px-6 sm:px-10 lg:px-14 py-9 sm:py-11 mb-12 sm:mb-16 overflow-hidden"
          data-aos="fade-up"
        >
          <div className="absolute -bottom-20 -left-16 w-56 h-56 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative shrink-0 w-14 h-14 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center">
            <FileText className="w-7 h-7" strokeWidth={1.8} />
          </div>
          <div className="relative flex-1 text-center sm:text-left">
            <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-1">
              Brand Deck
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-1.5">
              The Glam Aura Story, in One PDF
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Our mission, the three AI tools and the vision behind the platform
              — a shareable overview for partners, press and curious minds.
            </p>
          </div>
          <a
            href="/GlamAura.pdf"
            download="GlamAura-Brand-Deck.pdf"
            className="relative shrink-0 inline-flex items-center gap-2 px-6 py-3.5 bg-brand-dark text-white rounded-full font-bold text-sm sm:text-base shadow-lg shadow-brand-dark/10 hover:bg-brand-teal transition-all transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            Download PDF
            <span className="text-brand-mint font-bold text-xs sm:text-sm">
              · 28 MB
            </span>
          </a>
        </div>

        {/* ===== CLOSING CTA ===== */}
        <div
          className="relative overflow-hidden bg-brand-dark rounded-[2rem] sm:rounded-[3rem] px-6 sm:px-12 py-12 sm:py-16 text-center shadow-2xl shadow-brand-dark/20"
          data-aos="fade-up"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-72 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-2xl mx-auto">
            <div className="inline-block px-4 py-1.5 mb-5 rounded-full bg-brand-mint/10 text-brand-mint font-bold text-xs uppercase tracking-widest">
              Ready When You Are
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Ready to Discover Your Best Look?
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-8">
              Start with a free analysis — see your face shape, colors and style
              profile in under a minute.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/face-analyzer"
                className="px-8 py-4 bg-brand-teal text-white rounded-full font-bold text-lg shadow-xl shadow-brand-teal/20 hover:bg-brand-mint hover:text-brand-dark transition-all transform hover:-translate-y-1"
              >
                Start Free Analysis
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:-translate-y-1"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
