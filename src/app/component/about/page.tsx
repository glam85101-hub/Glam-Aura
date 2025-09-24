

export default function About() {
  return (
    <section className="bg-[#f8f2ef] text-black body-font" >
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8" >
          <div className="py-8 px-4 lg:w-1/2">
            <div className="h-full flex items-start"data-aos="fade-down">
              <div className="flex-grow">
                <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-1">
                  ABOUT OUR PROJECT
                </h2>
                <h1 className="title-font text-3xl font-bold text-gray-900 mb-4">
                  AI-Powered Personal Styling
                </h1>
                <p className="leading-relaxed mb-5 text-lg text-gray-700">
                  The idea is to build a web application that uses Artificial
                  Intelligence to analyze a person&rsquo;s facial features, skin tone,
                  and then suggest the best clothing styles,
                  colors, jewelry, and accessories that suit them.
                </p>
                <p className="leading-relaxed mb-5 text-lg text-gray-700">
                  This tool is designed to help individuals who struggle with
                  fashion choices or feel unsure about what looks good on them.
                  By combining AI-driven insights with style expertise, we aim to
                  solve a real-world problem and make personal styling accessible,
                  intelligent, and personalized for everyone.
                </p>
              </div>
            </div>
          </div>

          <div className="py-8 px-4 lg:w-1/2">
            <div className="h-full flex items-start"data-aos="fade-down">
              <div className="flex-grow">
                <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-1">
                  OUR MISSION
                </h2>
                <h1 className="title-font text-2xl font-semibold text-gray-900 mb-3">
                  Making Style Simple
                </h1>
                <p className="leading-relaxed mb-5 text-lg text-gray-700">
                  Fashion should not be intimidating. With the power of AI, our
                  platform will guide users to find their ideal look without the
                  stress of trial and error. It&rsquo;s like having a personal stylist
                  available 24/7, right at your fingertips.
                </p>
                <p className="leading-relaxed mb-5 text-lg text-gray-700">
                  Our goal is to boost confidence, save time, and empower people
                  to embrace their unique style with recommendations tailored
                  exclusively for them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}