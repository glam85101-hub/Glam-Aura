export default function About() {
  return (
    <section className="bg-[#f8f2ef] text-black body-font">
      <div className="container px-4 sm:px-5 py-16 sm:py-24 mx-auto">

        {/* Heading Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-2">
            ABOUT OUR PROJECT
          </h2>
          <h1 className="title-font text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            AI-Powered Personal Styling
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Our platform leverages Artificial Intelligence to analyze facial features, skin tone, and
            recommend clothing styles, colors, jewelry, and accessories for a personalized look.
          </p>
        </div>

        {/* Mission & Why Choose Us */}
        <div className="flex flex-wrap -mx-4 -my-8">
          <div className="py-8 px-4 w-full lg:w-1/2">
            <div className="h-full flex items-start" data-aos="fade-down">
              <div className="flex-grow max-w-[500px] mx-auto">
                <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-1">
                  OUR MISSION
                </h2>
                <h1 className="title-font text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  Making Style Simple
                </h1>
                <p className="leading-relaxed mb-5 text-base sm:text-lg text-gray-700">
                  Fashion should not be intimidating. With the power of AI, our platform guides users
                  to find their ideal look without the stress of trial and error.
                </p>
                <p className="leading-relaxed mb-5 text-base sm:text-lg text-gray-700">
                  Our goal is to boost confidence, save time, and empower people to embrace their unique
                  style with recommendations tailored exclusively for them.
                </p>
              </div>
            </div>
          </div>

          <div className="py-8 px-4 w-full lg:w-1/2">
            <div className="h-full flex items-start" data-aos="fade-down">
              <div className="flex-grow max-w-[500px] mx-auto">
                <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-1">
                  WHY CHOOSE US
                </h2>
                <h1 className="title-font text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  Personalized AI Styling
                </h1>
                <p className="leading-relaxed mb-5 text-base sm:text-lg text-gray-700">
                  By combining AI insights with style expertise, we provide recommendations that help
                  individuals feel confident and stylish every day.
                </p>
                <p className="leading-relaxed mb-5 text-base sm:text-lg text-gray-700">
                  Accessible anytime, our platform ensures everyone can get personal styling
                  guidance tailored just for them.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* About Us / Founders Section */}
        <div className="mt-16 sm:mt-20 text-center">
          <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-2">
            MEET THE FOUNDERS
          </h2>
          <h1 className="title-font text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            The Team Behind the Vision
          </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Our platform is built by two passionate developers committed to blending beauty,
            technology, and AI to make styling easier and more personal for everyone.
          </p>

          <div className="flex flex-wrap justify-center -mx-4">
            {/* Huma */}
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4 mb-8" data-aos="fade-up">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-[380px] mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Humema Israr
                </h3>
                <p className="text-[#5af1d0] font-medium text-xs sm:text-sm mb-3">
                  Frontend Developer • Agentic AI Developer
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  Specializes in creating beautiful, intuitive user interfaces and integrating
                  advanced agentic AI to deliver instant, interactive styling experiences.
                </p>
              </div>
            </div>

            {/* Faria */}
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4 mb-8" data-aos="fade-up">
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md max-w-[380px] mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Faria Mustaqim
                </h3>
                <p className="text-[#5af1d0] font-medium text-xs sm:text-sm mb-3">
                  Backend Developer • Agentic AI Developer
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  Expert in backend engineering and AI architecture, she ensures the platform is
                  fast, scalable, and capable of delivering accurate styling recommendations.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 sm:mt-8 text-gray-800 text-base sm:text-lg font-medium max-w-xl mx-auto">
            Together, Humema and Faria are the founders of the Personal Styling AI Platform.
          </p>
        </div>
      </div>
    </section>
  );
}
