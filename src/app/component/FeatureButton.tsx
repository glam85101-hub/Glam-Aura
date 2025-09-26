"use client";

import { getFeatureUsage, incrementFeatureUsage } from "../utils/usageTracker";

export default function FeatureButton() {
  const handleClick = () => {
    const used = getFeatureUsage();
    if (used >= 2) {
      alert("Free limit over! Please subscribe to continue.");
      window.location.href = "/pricing";
      return;
    }

    incrementFeatureUsage();
    alert("✅ Feature used successfully!");
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Use Feature
    </button>
  );
}
