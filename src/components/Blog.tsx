import { Sparkles, Shirt, Users } from "lucide-react";

const posts = [
  {
    tag: "AI & Fashion",
    icon: Sparkles,
    title: "AI in Fashion: The Future of Personal Styling",
    desc: "Discover how artificial intelligence is transforming the way we choose outfits — from analysing skin tone to suggesting colours that truly match your personality.",
    read: "4 min read",
    featured: false,
  },
  {
    tag: "Wardrobe",
    icon: Shirt,
    title: "Building a Smarter Wardrobe",
    desc: "How data-driven styling helps you save time, shop smarter and build a wardrobe that works for every occasion — without the usual guesswork.",
    read: "5 min read",
    featured: true,
  },
  {
    tag: "Everyday Style",
    icon: Users,
    title: "From Runway to Real Life",
    desc: "How technology bridges the gap between high-fashion trends and practical, everyday wear that fits your lifestyle and preferences.",
    read: "4 min read",
    featured: false,
  },
];

export default function Blog() {
  return (
    <section className="relative bg-white py-16 sm:py-24 overflow-hidden">
      {/* Soft background accents */}
      <div className="pointer-events-none absolute -top-20 -left-24 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-96 h-96 bg-brand-mint/15 rounded-full blur-3xl" />

      <div className="relative container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            GlamAura Journal
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-dark tracking-tight mb-4">
            Latest from <span className="text-brand-teal italic">GlamAura</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Exploring the intersection of fashion, technology and personal expression.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {posts.map((post, i) => {
            const Icon = post.icon;
            return (
              <article
                key={post.title}
                className={`group relative flex flex-col h-full p-6 sm:p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
                  post.featured
                    ? "bg-brand-dark border-brand-dark shadow-xl shadow-brand-dark/20"
                    : "bg-brand-beige border-brand-teal/10 shadow-lg shadow-brand-teal/5 hover:shadow-xl hover:shadow-brand-teal/10"
                }`}
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="flex items-start justify-between gap-4 mb-6 sm:mb-8">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ${
                      post.featured
                        ? "bg-brand-mint text-brand-dark"
                        : "bg-brand-teal text-white"
                    }`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.8} />
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      post.featured
                        ? "bg-brand-mint/15 text-brand-mint"
                        : "bg-brand-teal/10 text-brand-teal"
                    }`}
                  >
                    {post.tag}
                  </span>
                </div>

                <h3
                  className={`text-xl sm:text-2xl font-bold mb-4 leading-snug transition-colors ${
                    post.featured
                      ? "text-white group-hover:text-brand-mint"
                      : "text-brand-dark group-hover:text-brand-teal"
                  }`}
                >
                  {post.title}
                </h3>

                <p
                  className={`leading-relaxed text-base sm:text-lg ${
                    post.featured ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {post.desc}
                </p>

                <div
                  className={`mt-auto pt-6 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest border-t ${
                    post.featured
                      ? "border-white/10 text-gray-500"
                      : "border-brand-teal/10 text-gray-400"
                  }`}
                >
                  <span>GlamAura Journal</span>
                  <span
                    className={`h-1 w-1 rounded-full ${
                      post.featured ? "bg-brand-mint" : "bg-brand-teal"
                    }`}
                  />
                  <span>{post.read}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
