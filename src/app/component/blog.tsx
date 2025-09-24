export default function Blog() {
  return (
    <section className="bg-[#f8f2ef] text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto"data-aos="fade-down">

        {/* Blog Feature 1 */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#5af1d0] flex-shrink-0">
            {/* Icon */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="sm:w-16 sm:h-16 w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
              AI in Fashion: The Future of Personal Styling
            </h2>
            <p className="leading-relaxed text-base">
              Discover how artificial intelligence is transforming the way we choose outfits,
              from analyzing body shape and skin tone to suggesting colors and accessories
              that truly match your personality.
            </p>
            
          </div>
        </div>

        {/* Blog Feature 2 */}
        <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
              Building a Smarter Wardrobe
            </h2>
            <p className="leading-relaxed text-base">
              Learn how data-driven styling can help you save time, shop smarter, and
              create a wardrobe that works for every occasion without the usual guesswork.
            </p>
           
          </div>
          <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#5af1d0] flex-shrink-0">
            {/* Icon */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="sm:w-16 sm:h-16 w-10 h-10"
              viewBox="0 0 24 24"
            >
              <circle cx={6} cy={6} r={3} />
              <circle cx={6} cy={18} r={3} />
              <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
            </svg>
          </div>
        </div>

        {/* Blog Feature 3 */}
        <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col" >
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-[#5af1d0] flex-shrink-0">
            {/* Icon */}
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="sm:w-16 sm:h-16 w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx={12} cy={7} r={4} />
            </svg>
          </div>
          <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
              From Runway to Real Life
            </h2>
            <p className="leading-relaxed text-base">
              How technology bridges the gap between high-fashion trends and practical,
              everyday wear that fits your unique lifestyle and preferences.
            </p>
           
          </div>
        </div>
 
      </div>
    </section>
  );
}