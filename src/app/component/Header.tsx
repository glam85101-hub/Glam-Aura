
"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <nav className="bg-[#46c7ab] w-full border border-[#33353F] top-0 left-0 right-0 z-10 bg-opacity-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between container px-4 py-4 lg:py-3 mx-auto text-center md:text-left">
        {/* Logo / Brand */}
        <div className="font-semibold text-3xl md:text-2xl mb-2 md:mb-0">
          Personal Styling
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-6 text-xl items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/component/about" className="hover:underline">
            About
          </Link>
          <Link href="/component/features" className="hover:underline">
            Features
          </Link>

          {/* Clerk Auth Section */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-white text-[#46c7ab] rounded-lg font-medium hover:bg-gray-100 transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-[#33353F] text-white rounded-lg font-medium hover:bg-gray-800 transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}