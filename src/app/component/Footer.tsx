"use client";

import { CgGirl } from "react-icons/cg";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const sections = [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "/component/about" },
        { label: "Features", href: "/component/features" },
        { label: "FAQ", href: "/component/faq" },
        { label: "Pricing", href: "/component/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "https://www.linkedin.com/company/glamaura-studio" },
        { label: "Contact", href: "/component/contact" },
        { label: "Privacy Policy", href: "/component/privacy-policy" },
        { label: "Terms", href: "/component/terms-and-conditions" },
      ],
    },
    {
      title: "Follow Us",
      social: [
        { icon: <FaInstagram />, href: "https://www.instagram.com/glamaura387/" },
        { icon: <FaTwitter />, href: "https://x.com/HumemaA44967" },
        { icon: <FaFacebook />, href: "https://www.facebook.com/profile.php?id=61581457560218" },
        { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/glamaura-studio" },
      ],
    },
  ];

  return (
    <footer className="text-gray-600 body-font bg-[#f8f2ef]">
      <div className="container px-5 py-12 mx-auto flex flex-wrap md:flex-nowrap md:items-start items-center">
        {/* Logo + Intro */}
        <div className="w-full md:w-64 flex-shrink-0 text-center md:text-left mb-10 md:mb-0 md:mr-16">
          <p className="flex title-font font-medium items-center justify-center md:justify-start text-gray-900">
            <CgGirl className="text-2xl" />
            <span className="ml-3 text-xl font-semibold">Personal Styling</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            AI-powered personal styling — helping you discover the clothing
            styles and colors that truly bring out your best look.
          </p>
        </div>

        {/* Footer Links + Social */}
        <div className="flex flex-1 justify-between flex-wrap gap-6">
          {sections.map((section, idx) => (
            <div key={idx} className="w-1/2 sm:w-auto px-2 md:px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                {section.title}
              </h2>
              {section.links && (
                <nav className="list-none">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-gray-800 cursor-pointer text-sm sm:text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </nav>
              )}
              {section.social && (
                <div className="flex space-x-4">
                  {section.social.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-500 text-2xl"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 Made by Humema & Faria — Personal Styling Platform
          </p>
        </div>
      </div>
    </footer>
  );
}
