// app/components/RegisterClient.tsx
"use client";
import { useEffect } from "react";

export default function RegisterClient() {
  useEffect(() => {
    const registerUser = async () => {
      try {
        await fetch("/api/register", { method: "POST" });
      } catch (err) {
        console.error("Registration failed", err);
      }
    };

    registerUser();
  }, []);

  return null; // UI show nahi karna
}
