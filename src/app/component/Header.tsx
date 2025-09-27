"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/component/about" },
    { label: "Features", href: "/component/features" },
    { label: "Pricing", href: "/component/pricing" },
    { label: "Contact", href: "/component/contact" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="bg-[#46c7ab]/95 fixed w-full top-0 left-0 z-50 border-b border-[#33353F]">
        <div className="max-w-[100%] flex justify-between items-center h-16 px-4 md:px-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-white truncate">Personal Styling</div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-white text-lg">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline truncate">
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
          <div className="flex md:hidden items-center gap-3">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="flex flex-col justify-between w-6 h-5 focus:outline-none"
            >
              <span
                className={`block h-0.5 w-6 bg-white transform transition duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transform transition duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden fixed top-16 left-0 w-full bg-[#46c7ab]/95 overflow-auto transition-all duration-300 z-50 ${
            isOpen ? "max-h-[calc(100vh-4rem)] py-4" : "max-h-0 py-0"
          }`}
        >
          <div className="flex flex-col items-center gap-6 text-white text-lg px-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:underline truncate w-full text-center"
              >
                {link.label}
              </Link>
            ))}

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-white text-[#46c7ab] rounded-lg hover:bg-gray-100 transition w-full">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-6 py-2 bg-[#33353F] text-white rounded-lg hover:bg-gray-800 transition w-full">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content hidden under fixed navbar */}
      <div className="h-16 md:h-16" />
    </>
  );
}
