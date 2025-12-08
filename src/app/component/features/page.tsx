"use client";

import { motion } from "framer-motion";
import Analysis from "../skin-analyzer/page";
import Outfit from "../outfit/page";
import Pallete from "../makeup/page";

export default function Features() {
  return (
    <section className="bg-[#f8f2ef] text-black body-font">
      <div className="container px-5 py-24 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="tracking-widest text-xs font-medium text-[#5af1d0] mb-2 uppercase">
            OUR FEATURES
          </h2>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Explore What Our AI Can Do
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From skin analysis to personalized outfit suggestions, our platform
            brings intelligent styling tools together in one place. Each feature
            is designed to guide you toward your best look.
          </p>
        </div>

        <div className="space-y-16">
          {/* Makeup Palette */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
          >
            <Pallete />
          </motion.div>

          {/* Outfit Checker */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
          >
            <Outfit />
          </motion.div>

          {/* Skin & Face Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-lg p-8 md:p-12"
          >
            <Analysis />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
