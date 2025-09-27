"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Track route changes

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/component/about" },
    { label: "Features", href: "/component/features" },
    { label: "Pricing", href: "/component/pricing" },
    { label: "Contact", href: "/component/contact" },
  ];

  return (
    <main className="pt-16">
    <nav className="bg-[#46c7ab]/95 w-full border-b border-[#33353F] fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="text-2xl font-bold text-white">Personal Styling</div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-white text-lg">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-white text-[#46c7ab] rounded-lg hover:bg-gray-100 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-[#33353F] text-white rounded-lg hover:bg-gray-800 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Hamburger + UserButton */}
        <div className="flex md:hidden items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex flex-col justify-between w-6 h-5 focus:outline-none"
          >
            <span
              className={`block h-0.5 w-full bg-white transform transition duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transform transition duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

    {/* Mobile Dropdown */}
<div
  className={`md:hidden bg-[#46c7ab]/95 overflow-hidden transition-max-height duration-500 ${
    isOpen ? "max-h-screen py-4" : "max-h-0 py-0"
  }`}
>
  <div className="flex flex-col items-center gap-6 text-white text-lg">
    {links.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="hover:underline"
        onClick={() => setIsOpen(false)}
      >
        {link.label}
      </Link>
    ))}
    <SignedOut>
      <SignInButton mode="modal">
        <button
          className="px-6 py-2 bg-white text-[#46c7ab] rounded-lg hover:bg-gray-100 transition"
          onClick={() => setIsOpen(false)}
        >
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button
          className="px-6 py-2 bg-[#33353F] text-white rounded-lg hover:bg-gray-800 transition"
          onClick={() => setIsOpen(false)}
        >
          Sign Up
        </button>
      </SignUpButton>
    </SignedOut>
  </div>
</div>
    </nav>
    </main>
  );
}
