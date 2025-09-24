import Image from "next/image";
import Link from "next/link";

export default function Analysis() {
  return (
    <section className="bg-[#f8f2ef] py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12" >
        
        {/* Left Text */}
        <div data-aos="fade-down-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f]">
            Color Analysis
          </h2>
          <p className="mt-4 text-lg text-[#444] leading-relaxed">
            You’re one selfie away from seeing your personalized color palette.
            Our smart science will analyze your features and reveal the colors
            that will best enhance your natural beauty.
          </p>
          <Link
            href="/component/face-analyzer-front"
            className="inline-block mt-8 px-6 py-3 bg-[#5af1d0] text-white rounded-full font-medium shadow hover:bg-[#4ed4ce] transition animate-bounce"
          >
            Find your color →
          
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          {/* Background Circle */}
          <div className="absolute top-1/2 -translate-y-1/2 w-64 h-64 bg-[#f8cfa9] rounded-full -z-10"></div>
          
          {/* Mobile Mockup */}
          <div className="w-[250px] h-[500px] bg-black rounded-[2rem] shadow-lg overflow-hidden flex flex-col border-[6px] border-black" data-aos="fade-down-right">
            <div className="flex-1 relative " >
              <Image
                src="/col.jpg" 
                alt="Your Style"
                fill
                className="object-cover"
              />
            </div>
            {/* Color Palette */}
            <div className="bg-white p-4 border-t text-black">
              <p className="text-sm font-semibold">Your Color type</p>
              <p className="text-sm mb-3">Light Summer</p>
              <div className="grid grid-cols-5 gap-2">
                {["#C6D7E2", "#B1C8DB", "#9AB6D4", "#BDAED6", "#E2C8E1", "#F4D0E1", "#EDBFD6", "#E4B0C8", "#F2A8B0", "#F7B5A6"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}