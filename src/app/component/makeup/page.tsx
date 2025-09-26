import Image from "next/image";
import Link from "next/link";


export default function Pallete() {
  return (
    <section className="bg-[#f8f2ef] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Text */}
        <div data-aos="fade-down-right">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f]">
             FaceFusion
          </h2>
          <p className="mt-4 text-lg text-[#444] leading-relaxed">
            The Analysis Page is a personalized beauty analysis feature that transforms the user experience with smart, AI-powered insights.

Upload your photo effortlessly for instant analysis.

An advanced (currently simulated) AI engine evaluates facial features with precision.

Receive tailored beauty and makeup recommendations designed to match your unique style.

Enjoy a sleek, modern, and interactive UI/UX for an engaging experience.

As the centerpiece of our beauty-tech application, the Analysis Page seamlessly blends AI simulation, personalization, and cutting-edge design, delivering a fun, innovative, and truly useful experience for every user.
   
          </p>
          <Link
            href="/component/makeup-recommendations"
            className="inline-block mt-8 px-6 py-3 bg-[#5af1d0] text-white rounded-full font-medium shadow hover:bg-[#49d3c0] transition animate-bounce"
          >
            Try it →
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center order-1 md:order-none"data-aos="fade-down-right">
          {/* Background Shape */}
          <div className="absolute top-1/2 -translate-y-1/2 w-72 h-72 bg-[#f3e5db] rounded-full -z-10"></div>

          {/* Mobile Mockup */}
          <div className="relative w-[260px] h-[520px] bg-black rounded-[2.5rem] shadow-lg overflow-hidden border-[6px] border-black" >
            <Image
              src="/pallete.jpg" // Put your image in /public
              alt="Color Temperature"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}