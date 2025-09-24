import Image from "next/image";
import Link from "next/link";

export default function Outfit(){
  return (
    <section className="bg-[#f8f2ef] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Image */}
        <div className="relative flex justify-center order-1 md:order-none">
          {/* Background Shape */}
          <div className="absolute top-1/2 -translate-y-1/2 w-72 h-72 bg-[#f3e5db] rounded-full -z-10"></div>

          {/* Mobile Mockup */}
          <div className="relative w-[260px] h-[520px] bg-black rounded-[2.5rem] shadow-lg overflow-hidden border-[6px] border-black"data-aos="fade-down-right">
            <Image
              src="/outfit.jpg" // Put your image in /public
              alt="outfit"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Text */}
        <div data-aos="fade-down-right">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f]">
            LookSense
          </h2>
          <p className="mt-4 text-lg text-[#444] leading-relaxed">
             Outfit Checker is a smart tool that analyzes your style and helps you choose the perfect outfit based on colors, fashion trends, and personal preferences.
             Whether you&rsquo;re preparing for a casual day out, a party, or a formal event, Outfit Checker helps you look your best with confidence.
          </p>
          <Link
            href="/component/outfit-analyzer"
            className="inline-block mt-8 px-6 py-3 bg-[#5af1d0] text-white rounded-full font-medium shadow hover:bg-[#4ad4b6] transition animate-bounce"
          >
            Try it →
          </Link>
        </div>
      </div>
    </section>
  );
}