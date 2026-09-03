import Image from "next/image";

export default function About() {
  return (
    <section className="bg-brand-beige text-brand-dark py-24 sm:py-32 overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">

        {/* Heading Section */}
        <div className="text-center mb-20 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark tracking-tight mb-6">
            Blending Beauty with <span className="text-brand-teal italic">Intelligence</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
            We're on a mission to revolutionize personal styling through the power of advanced AI, making high-end fashion insights accessible to everyone.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          <div className="relative group p-10 bg-white rounded-3xl shadow-xl shadow-brand-teal/5 transition-all duration-500 hover:-translate-y-2 border border-brand-teal/10" data-aos="fade-right">
            <div className="absolute top-0 right-0 p-8 text-brand-teal/10 group-hover:text-brand-teal/20 transition-colors">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21H23L12 2ZM12 6L19.53 19H4.47L12 6ZM11 11V13H13V11H11ZM11 15V17H13V15H11Z"/></svg>
            </div>
            <h2 className="text-brand-teal font-black text-sm uppercase tracking-widest mb-4">Our Mission</h2>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">Making Style Simple</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Fashion should be an expression of confidence, not a source of stress. We use AI to remove the guesswork, guiding you to your ideal look with precision.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our goal is to empower individuals to embrace their unique beauty with recommendations tailored exclusively for them.
            </p>
          </div>

          <div className="relative group p-10 bg-brand-teal text-white rounded-3xl shadow-2xl shadow-brand-teal/30 transition-all duration-500 hover:-translate-y-2" data-aos="fade-left">
            <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:text-white/20 transition-colors">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <h2 className="text-brand-mint font-black text-sm uppercase tracking-widest mb-4">Why Choose Us</h2>
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">AI Precision Styling</h3>
            <p className="text-brand-beige/90 text-lg leading-relaxed mb-6">
              By merging style expertise with neural network analysis, we provide hyper-personalized insights that help you feel confident every single day.
            </p>
            <p className="text-brand-beige/90 text-lg leading-relaxed">
              Accessible anywhere, our platform is your 24/7 personal stylist, evolving with your preferences and trends.
            </p>
          </div>
        </div>

        {/* Founders Section */}
        <div className="text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[150%] bg-white -z-10 skew-y-3"></div>
          
          <div className="pt-24 pb-32">
            <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest" data-aos="fade-up">
              The Visionaries
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-brand-dark mb-16" data-aos="fade-up">Meet the Founders</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
              {/* Humema */}
              <div className="group relative bg-brand-beige p-10 rounded-[2.5rem] border border-brand-teal/5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-teal/10 hover:-translate-y-2" data-aos="fade-up">
                <div className="relative w-20 h-20 mb-8 group-hover:rotate-12 transition-transform">
                  <div className="absolute inset-0 bg-brand-teal rounded-2xl shadow-xl shadow-brand-teal/20 -rotate-6"></div>
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                    <Image 
                      src="/humema.jpeg" 
                      alt="Humema Israr"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Humema Israr</h3>
                <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-6">Frontend & Agentic AI Architect</p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Specializing in crafting intuitive, beautiful interfaces that bring AI insights to life through seamless user experiences.
                </p>
              </div>

              {/* Faria */}
              <div className="group relative bg-brand-beige p-10 rounded-[2.5rem] border border-brand-teal/5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-teal/10 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
                <div className="relative w-20 h-20 mb-8 group-hover:-rotate-12 transition-transform">
                  <div className="absolute inset-0 bg-brand-dark rounded-2xl shadow-xl shadow-brand-dark/20 rotate-6"></div>
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                    <Image 
                      src="/faria.jpg" 
                      alt="Faria Mustaqim"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-brand-dark mb-2">Faria Mustaqim</h3>

                <p className="text-brand-teal font-black text-xs uppercase tracking-widest mb-6">Backend & AI Core Developer</p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Expert in scalable AI architecture, ensuring that every recommendation is fast, accurate, and data-driven.
                </p>
              </div>
            </div>

            <p className="mt-20 text-xl font-bold text-brand-dark italic max-w-2xl mx-auto leading-relaxed" data-aos="fade-up">
              "Together, we're building the future of personalized beauty and style."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}