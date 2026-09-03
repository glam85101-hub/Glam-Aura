"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-is-mobile";

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
  const isMobile = useIsMobile();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-brand-beige py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-4xl relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl -z-10"></div>

        {/* Section Heading */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-dark tracking-tight mb-6">
            Everything You <span className="text-brand-teal italic">Need to Know</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Find clarity on how our AI-powered personal styling platform works and how it can help you discover your best look.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={isMobile ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === i 
                ? "border-brand-teal/30 bg-white shadow-xl shadow-brand-teal/5" 
                : "border-brand-teal/10 bg-white/50 hover:bg-white hover:border-brand-teal/20"
              }`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-8 py-6 text-left group"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === i ? 'text-brand-teal' : 'text-brand-dark group-hover:text-brand-teal'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={isMobile ? {} : { rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-brand-teal text-white' : 'bg-brand-teal/5 text-brand-teal'}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={isMobile ? {} : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-gray-600 text-lg leading-relaxed border-t border-brand-teal/5 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center" data-aos="fade-up">
           <p className="text-gray-500 font-medium mb-4">Still have questions?</p>
           <Link href="/component/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-teal transition-all shadow-lg shadow-brand-dark/20 active:scale-95">
              Contact Support Team
              <span className="text-xl">→</span>
           </Link>
        </div>
      </div>
    </section>
  );
}