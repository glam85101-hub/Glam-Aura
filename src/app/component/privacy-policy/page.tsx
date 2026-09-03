"use client";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      {/* Page Title */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2 hover:text-blue-500 transition-colors">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500">Last Updated: September 26, 2025</p>
      </header>

      {/* Introduction */}
      <p className="mb-8 text-lg text-gray-700">
        Welcome to{" "}
        <span className="font-semibold text-gray-900">Our Personal Styling</span>{" "}
        (“we,” “our,” “us”). Your privacy is our priority. This Privacy Policy
        explains how we collect, use, and protect your data when you use our
        platform, which includes{" "}
        <span className="font-medium text-blue-500">Outfit Checker</span>,{" "}
        <span className="font-medium text-blue-500">Color Analyzer</span>, and{" "}
        <span className="font-medium text-blue-500">Makeup Recommendation</span>{" "}
        features.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          1. Information We Collect
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Images you upload (outfit, face, makeup photos) for analysis.</li>
          <li>Basic details such as your email or name (if you create an account).</li>
          <li>
            Device information (browser type, OS, IP address) for security and
            analytics.
          </li>
        </ul>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Provide outfit suggestions tailored to your style.</li>
          <li>Analyze skin tone and recommend matching colors.</li>
          <li>Offer personalized makeup recommendations.</li>
          <li>Enhance our platform and improve user experience.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          3. Data Security
        </h2>
        <p className="text-gray-700">
          We implement industry-standard safeguards to protect your information
          against unauthorized access, misuse, or loss.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          4. Data Storage & Retention
        </h2>
        <p className="text-gray-700">
          Uploaded images are processed securely and stored only as long as
          necessary to generate results. We do not sell or share your data with
          advertisers.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          5. Your Rights
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Request deletion of your data at any time.</li>
          <li>Contact us for privacy-related concerns.</li>
          <li>Opt out by discontinuing use of our services.</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          6. Third-Party Services
        </h2>
        <p className="text-gray-700">
          Some features rely on trusted third-party AI models to analyze your
          data. These providers process information only to deliver results and
          do not use it for other purposes.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          7. Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about this Privacy Policy, please reach out
          through our official social channels:
        </p>

        <div className="flex gap-6 text-3xl">
          <a
            href="https://www.instagram.com/glamaura387/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/HumemaA44967"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61583609165895"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.linkedin.com/company/glamaura-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </section>
    </div>
  );
}