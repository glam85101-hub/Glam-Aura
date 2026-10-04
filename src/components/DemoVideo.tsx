import Link from "next/link";

/**
 * Product demo showcase — sits right below the home hero.
 * Beige band so it alternates against the dark hero above and the white
 * Beauty Analysis section below. Native controls + poster frame, so nothing
 * downloads until the user presses play.
 */
export default function DemoVideo() {
  return (
    <section className="relative bg-brand-beige py-16 sm:py-24 overflow-hidden">
      {/* Soft glow behind the player */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-20 w-80 h-80 bg-brand-mint/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Product Demo
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tight mb-5">
            See Glam Aura <span className="text-brand-teal italic">in Action</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
            A quick tour of how our AI turns a single selfie into a complete personal
            style report — from color analysis to outfit recommendations.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-teal/40 via-brand-mint/40 to-brand-teal/40 rounded-[1.75rem] blur opacity-70" />
          <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-brand-dark/20 bg-black">
            <video
              className="w-full aspect-video"
              controls
              preload="metadata"
              poster="/demo-poster.jpg"
              playsInline
            >
              <source src="/glam-aura-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-12" data-aos="fade-up" data-aos-delay="200">
          <Link
            href="/face-analyzer"
            className="inline-block px-8 py-4 bg-brand-teal text-white rounded-full font-bold text-lg shadow-xl shadow-brand-teal/20 hover:bg-brand-dark transition-all transform hover:-translate-y-1"
          >
            Try It Yourself — Free
          </Link>
          <p className="mt-4 text-sm text-gray-500 font-medium">
            2 free analyses · no credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
