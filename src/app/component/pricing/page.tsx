"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { motion } from "framer-motion";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "START",
      price: 0,
      description: [
        "Basic facial feature & skin tone scan",
        "Quick color palette suggestion",
        "General clothing style tips",
      ],
    },
    {
      name: "PRO",
      price: 1, // $1 for upgrade
      description: [
        "Full AI style analysis (face, skin, body shape)",
        "Personalized clothing & color recommendations",
        "Accessory & jewelry matching guide",
        "Seasonal style updates",
      ],
      popular: true,
    },
  ];

  const handleCheckout = async (price: number) => {
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price * 100 }),
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
      console.error("Stripe checkout error:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f2ef]">
         <main className="max-w-6xl mx-auto p-10 text-gray-900">
      {/* HEADER */}
      <header className="flex flex-col items-center justify-center mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
        >
          Style <span className="text-[#46c7ab]">Plans</span>
        </motion.h1>

        <p className="text-gray-500 max-w-xl">
          Choose a plan that fits your style needs — from a quick style check to full personalized guidance.
        </p>
      </header>

      {/* PRICING CARDS */}
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative w-full md:w-1/2 xl:w-1/3 p-6 rounded-2xl border-2 shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 
              ${
                plan.popular
                  ? "border-[#5af1d0] bg-gradient-to-b from-[#5af1d0]/10 to-white"
                  : "border-black bg-white"
              }`}
          >
            {plan.popular && (
              <span className="absolute right-6 top-6 bg-[#5af1d0] text-white px-3 py-1 text-xs font-medium rounded-full shadow-md">
                MOST POPULAR
              </span>
            )}

            <h2
              className={`text-sm tracking-widest mb-2 font-medium uppercase ${
                plan.popular ? "text-[#46c7ab]" : "text-gray-500"
              }`}
            >
              {plan.name}
            </h2>

            <h1 className="text-4xl font-bold text-gray-900 flex items-end mb-6">
              <span>${plan.price}</span>
              {plan.price > 0 && (
                <span className="ml-2 text-base font-normal text-gray-500">/month</span>
              )}
            </h1>

            <ul className="space-y-3 mb-8">
              {plan.description.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <span
                    className={`w-5 h-5 mr-3 inline-flex items-center justify-center rounded-full flex-shrink-0 shadow 
                      ${plan.popular ? "bg-[#5af1d0] text-white" : "bg-black text-white"}`}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {plan.price === 0 ? (
              <a
                href="/component/features"
                className="block text-center w-full py-3 rounded-xl font-medium text-white bg-[#5af1d0] hover:bg-[#46c7ab] transition-colors"
              >
                Get Started
              </a>
            ) : (
              <button
                onClick={() => handleCheckout(plan.price)}
                className="w-full py-3 rounded-xl font-medium text-white bg-black hover:bg-gray-800 shadow-md transition-colors"
              >
                Upgrade to PRO ${plan.price}
              </button>
            )}

            <p className="mt-4 text-sm text-gray-500 text-center">
              {plan.price === 0
                ? "Perfect for a quick style boost without commitment."
                : "Great for anyone wanting consistent style confidence."}
            </p>
          </div>
        ))}
      </div>
      </main>
    </div>
  );
};

export default Pricing;
