export default function Blog() {
  return (
    <section className="bg-brand-beige py-24 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto" data-aos="fade-up">

        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Insights & Style
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-brand-dark tracking-tight mb-4">Latest from GlamAura</h2>
          <p className="text-gray-600 text-lg">Exploring the intersection of fashion, technology, and personal expression.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Blog Feature 1 */}
          <div className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-brand-teal/5 border border-brand-teal/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-brand-teal/10">
            <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} className="w-8 h-8" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-teal transition-colors">
              AI in Fashion: The Future of Personal Styling
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Discover how artificial intelligence is transforming the way we choose outfits, from analyzing skin tone to suggesting colors that truly match your personality.
            </p>
          </div>

          {/* Blog Feature 2 */}
          <div className="group relative bg-brand-dark p-8 rounded-3xl shadow-xl transition-all duration-500 hover:-translate-y-2">
             <div className="w-16 h-16 rounded-2xl bg-brand-mint/20 text-brand-mint flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} className="w-8 h-8" viewBox="0 0 24 24">
                <circle cx={6} cy={6} r={3} />
                <circle cx={6} cy={18} r={3} />
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-mint transition-colors">
              Building a Smarter Wardrobe
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              Learn how data-driven styling can help you save time, shop smarter, and create a wardrobe that works for every occasion without the usual guesswork.
            </p>
          </div>

          {/* Blog Feature 3 */}
          <div className="group relative bg-white p-8 rounded-3xl shadow-xl shadow-brand-teal/5 border border-brand-teal/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-brand-teal/10">
            <div className="w-16 h-16 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} className="w-8 h-8" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-teal transition-colors">
              From Runway to Real Life
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              How technology bridges the gap between high-fashion trends and practical, everyday wear that fits your unique lifestyle and preferences.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}