"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How does the analysis work?",
    answer:
      "Our platform combines different AI tools: FaceFusion (upload a selfie for makeup insights), LookSense (outfit photo or preferences for style check), and Color Analysis (live camera or selfie to reveal your best personal palette).",
  },
  {
    question: "Do I need to enable my camera?",
    answer:
      "Only for skin and color analysis. Makeup and outfit features work with uploaded photos.",
  },
  {
    question: "What type of photos should I upload?",
    answer:
      "For makeup analysis: a clear front-facing selfie. For outfit analysis: a full or partial outfit photo. Use good lighting (preferably natural) for accurate results.",
  },
  {
    question: "Are my photos safe?",
    answer:
      "Yes. Uploaded photos are only used for real-time AI analysis. We do not permanently store or share your images.",
  },
  {
    question: "What kind of recommendations will I get?",
    answer:
      "Makeup: Foundation shade, lipstick, eye makeup styles. Outfits: Event-based styling, body type suggestions, fashion trends. Colors: Seasonal palettes (Spring, Summer, Autumn, Winter).",
  },
  {
    question: "Is it free?",
    answer:
      "Basic analysis (makeup, outfit, and color recommendations) is free. Premium features like saved profiles or advanced styling may be added later.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f8f2ef] text-black body-font py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <h2 className="tracking-widest text-xs title-font font-medium text-[#5af1d0] mb-2 uppercase">
            FAQ
          </h2>
          <h1 className="title-font text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Find answers to the most common questions about our AI-powered
            personal styling platform. Learn how to use features like
            FaceFusion, LookSense, and Color Analysis with ease.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-gray-300 rounded-xl bg-white shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-lg font-medium text-gray-800 hover:text-[#52d8bb] transition"
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 text-gray-600 text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
