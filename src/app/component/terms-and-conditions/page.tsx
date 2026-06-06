'use client';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
      {/* Page Title */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold mb-2 hover:text-blue-500 transition-colors">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500">Last Updated: September 26, 2025</p>
      </header>

      {/* Introduction */}
      <p className="mb-8 text-lg text-gray-700">
        Welcome to{" "}
        <span className="font-semibold text-gray-900">Our Personal Styling</span>.
        By using our website, you agree to comply with these Terms & Conditions.
        Please read them carefully before using our services, which include{" "}
        <span className="font-medium text-blue-500">Outfit Checker</span>,{" "}
        <span className="font-medium text-blue-500">Color Analyzer</span>, and{" "}
        <span className="font-medium text-blue-500">Makeup Recommendation</span>.
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700">
          By accessing or using our platform, you confirm that you have read,
          understood, and agreed to these Terms & Conditions. If you do not
          agree, you must discontinue use immediately.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          2. Use of Services
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Use the platform for personal, non-commercial purposes only.</li>
          <li>Do not upload harmful, inappropriate, or offensive content.</li>
          <li>You are responsible for the accuracy of the photos you upload.</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          3. Intellectual Property
        </h2>
        <p className="text-gray-700">
          All content, design, and technology on this website belong to{" "}
          <span className="font-medium">Our Personal Styling</span>. You may not
          copy, redistribute, or resell our content without written permission.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          4. Disclaimer
        </h2>
        <p className="text-gray-700">
          Our platform provides AI-generated suggestions. We do not guarantee
          100% accuracy. Style and makeup recommendations are for informational
          purposes only.
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          5. Limitation of Liability
        </h2>
        <p className="text-gray-700">
          We are not responsible for any outcomes, events, or decisions made
          based on suggestions provided by our platform.
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          6. Changes to Terms
        </h2>
        <p className="text-gray-700">
          We may update these Terms & Conditions from time to time. Continued
          use of the website means you accept the updated terms.
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3 hover:text-blue-500 transition-colors">
          7. Contact Us
        </h2>
        <p className="text-gray-700 mb-4">
          If you have any questions about these Terms & Conditions, please reach
          out through our official social platforms:
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