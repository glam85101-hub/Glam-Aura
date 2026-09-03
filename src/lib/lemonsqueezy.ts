import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

// Variant IDs for your products
export const VARIANTS = {
  ELITE_PLAN: process.env.LEMONSQUEEZY_PRO_VARIANT_ID || "",
};

export { createCheckout };
