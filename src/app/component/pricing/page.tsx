"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "ESSENTIAL",
      price: 0,
      description: [
        "Basic facial feature & skin tone scan",
        "Quick color palette suggestion",
        "General clothing style tips",
        "Limited daily analysis",
      ],
    },
    {
      name: "ELITE",
      price: 1, // $1 for upgrade
      variantId: "2028004", // LEMONSQUEEZY_PRO_VARIANT_ID
      description: [
        "Full AI style analysis (face, skin, body shape)",
        "Personalized clothing & color recommendations",
        "Accessory & jewelry matching guide",
        "Seasonal style updates & trend alerts",
        "Priority support & unlimited analysis",
      ],
      popular: true,
    },
  ];

  const handleCheckout = async (variantId: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("API error:", errorText);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Lemon Squeezy checkout error:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-brand-beige py-24">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-brand-dark">
        {/* HEADER */}
        <header className="text-center mb-20 max-w-3xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
            Investment
          </div>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6"
          >
            Choose Your <span className="text-brand-teal italic">Style Path</span>
          </motion.h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">
            Unlock your full style potential with our AI-driven insights. From basics to elite personalized guidance.
          </p>
        </header>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 shadow-xl
                ${
                  plan.popular
                    ? "border-brand-teal bg-brand-dark text-white shadow-brand-teal/20"
                    : "border-brand-teal/10 bg-white text-brand-dark shadow-brand-teal/5"
                }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-mint text-brand-dark px-6 py-1.5 text-xs font-black rounded-full shadow-lg uppercase tracking-widest">
                  Highly Recommended
                </span>
              )}

              <h2
                className={`text-sm tracking-[0.2em] mb-6 font-black uppercase ${
                  plan.popular ? "text-brand-mint" : "text-brand-teal"
                }`}
              >
                {plan.name}
              </h2>

              <div className="flex items-baseline mb-8">
                <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                {plan.price > 0 && (
                  <span className={`ml-2 text-lg font-medium ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>/lifetime</span>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.description.map((item, i) => (
                  <li key={i} className="flex items-start text-lg leading-tight">
                    <span
                      className={`w-6 h-6 mr-3 flex items-center justify-center rounded-full flex-shrink-0 mt-0.5
                        ${plan.popular ? "bg-brand-mint text-brand-dark" : "bg-brand-teal text-white"}`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </span>
                    <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>{item}</span>
                  </li>
                ))}
              </ul>

              {plan.price === 0 ? (
                <Link
                  href="/component/face-analyzer-front"
                  className="block text-center w-full py-5 rounded-2xl font-black text-white bg-brand-teal hover:bg-brand-dark transition-all shadow-lg shadow-brand-teal/20 active:scale-95"
                >
                  Get Started Free
                </Link>
              ) : (
                <button
                  onClick={() => handleCheckout(plan.variantId || "")}
                  className="w-full py-5 rounded-2xl font-black text-brand-dark bg-brand-mint hover:bg-white transition-all shadow-lg shadow-brand-mint/30 active:scale-95"
                >
                  Upgrade to Elite
                </button>
              )}

              <p className={`mt-6 text-sm text-center font-medium ${plan.popular ? 'text-gray-500' : 'text-gray-400'}`}>
                {plan.price === 0
                  ? "Instant access to core AI analysis tools."
                  : "One-time investment for lifelong style confidence."}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pricing;