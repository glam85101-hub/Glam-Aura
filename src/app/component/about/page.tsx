

export default function About() {
  return (
  <section className="bg-[#f8f2ef] text-black body-font">
  <div className="container px-5 py-24 mx-auto">
    {/* Heading Section */}
    <div className="text-center mb-16">
      <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-2">
        ABOUT OUR PROJECT
      </h2>
      <h1 className="title-font text-3xl font-bold text-gray-900">
        AI-Powered Personal Styling
      </h1>
      <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
        Our platform leverages Artificial Intelligence to analyze facial features, skin tone, and
        recommend clothing styles, colors, jewelry, and accessories for a personalized look.
      </p>
    </div>

    <div className="flex flex-wrap -mx-4 -my-8">
      <div className="py-8 px-4 lg:w-1/2">
        <div className="h-full flex items-start" data-aos="fade-down">
          <div className="flex-grow">
            <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-1">
              OUR MISSION
            </h2>
            <h1 className="title-font text-2xl font-semibold text-gray-900 mb-3">
              Making Style Simple
            </h1>
            <p className="leading-relaxed mb-5 text-lg text-gray-700">
              Fashion should not be intimidating. With the power of AI, our platform guides users
              to find their ideal look without the stress of trial and error.
            </p>
            <p className="leading-relaxed mb-5 text-lg text-gray-700">
              Our goal is to boost confidence, save time, and empower people to embrace their unique
              style with recommendations tailored exclusively for them.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 px-4 lg:w-1/2">
        <div className="h-full flex items-start" data-aos="fade-down">
          <div className="flex-grow">
            <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-1">
              WHY CHOOSE US
            </h2>
            <h1 className="title-font text-2xl font-semibold text-gray-900 mb-3">
              Personalized AI Styling
            </h1>
            <p className="leading-relaxed mb-5 text-lg text-gray-700">
              By combining AI insights with style expertise, we provide recommendations that help
              individuals feel confident and stylish every day.
            </p>
            <p className="leading-relaxed mb-5 text-lg text-gray-700">
              Accessible anytime, our platform ensures everyone can get personal styling
              guidance tailored just for them.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}