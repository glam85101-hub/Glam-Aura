"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import AuthModal from "@/components/AuthModal";
import { LogOut } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");
  const pathname = usePathname();
  const { user, isSignedIn, isLoaded, signOut } = useAuth();

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/component/about" },
    { label: "Features", href: "/component/features" },
    { label: "Pricing", href: "/component/pricing" },
    { label: "Contact", href: "/component/contact" },
  ];

  const authLinks = [
    { label: "Dashboard", href: "/component/usage-dashboard" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openSignIn = () => {
    setAuthMode("sign-in");
    setShowAuthModal(true);
  };

  const openSignUp = () => {
    setAuthMode("sign-up");
    setShowAuthModal(true);
  };

  if (!mounted) {
    return (
      <>
        <nav className="bg-brand-teal/90 backdrop-blur-md fixed w-full top-0 left-0 z-50 border-b border-white/10 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full bg-white/20 p-1 backdrop-blur-sm">
                <img
                  src="/logo2.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Glam<span className="text-brand-mint">Aura</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-white font-medium">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="relative py-1">{link.label}</Link>
              ))}
            </div>
          </div>
        </nav>
        <div className="h-16 md:h-16" />
      </>
    );
  }

  return (
    <>
      <nav className="bg-brand-teal/90 backdrop-blur-md fixed w-full top-0 left-0 z-50 border-b border-white/10 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group transition-transform hover:scale-105 active:scale-95">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full bg-white/20 p-1 backdrop-blur-sm">
              <img
                src="/logo2.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Glam<span className="text-brand-mint">Aura</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative py-1 transition-colors hover:text-brand-mint after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-mint after:transition-all hover:after:w-full ${pathname === link.href ? 'text-brand-mint after:w-full' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4">
              {isSignedIn && authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-brand-mint after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-mint after:transition-all hover:after:w-full ${pathname === link.href ? 'text-brand-mint after:w-full' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
              {!isSignedIn ? (
                <button onClick={openSignIn} className="px-6 py-2 bg-white text-brand-teal rounded-full font-bold shadow-md hover:bg-brand-mint hover:text-white hover:shadow-lg transition-all active:scale-95">Get Started</button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <button onClick={() => signOut()} className="p-2 text-white/60 hover:text-white transition-colors" title="Sign Out">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger + Auth */}
          <div className="flex md:hidden items-center gap-4">
            {isSignedIn && (
              <button onClick={() => signOut()} className="p-2 text-white/60 hover:text-white transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="relative w-10 h-10 flex items-center justify-center text-white focus:outline-none bg-white/10 rounded-lg backdrop-blur-sm"
            >
              <div className="w-6 flex flex-col items-end gap-1.5">
                <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
                <span className={`block h-0.5 bg-white transition-all duration-200 rounded-full ${isOpen ? 'opacity-0' : 'w-4'}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden absolute top-full left-0 w-full bg-brand-teal/95 backdrop-blur-xl border-t border-white/10 overflow-hidden transition-all duration-500 ease-in-out shadow-2xl ${
            isOpen ? "max-h-[80vh] py-8 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-6 px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xl font-bold tracking-wide w-full text-center py-2 transition-colors ${pathname === link.href ? 'text-brand-mint' : 'text-white hover:text-brand-mint'}`}
              >
                {link.label}
              </Link>
            ))}

            {isSignedIn && authLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xl font-bold tracking-wide w-full text-center py-2 transition-colors ${pathname === link.href ? 'text-brand-mint' : 'text-white hover:text-brand-mint'}`}
              >
                {link.label}
              </Link>
            ))}

            {!isSignedIn && (
              <button onClick={() => { setIsOpen(false); openSignIn(); }} className="w-full py-4 bg-brand-mint text-brand-teal rounded-2xl font-bold shadow-xl hover:bg-white transition-all active:scale-[0.98] mt-4 pt-6 border-t border-white/10">Get Started</button>
            )}

            {isSignedIn && (
              <button onClick={() => { setIsOpen(false); signOut(); }} className="w-full py-4 bg-red-500/20 border border-red-500/30 text-white rounded-2xl font-bold hover:bg-red-500/30 transition-all">Sign Out</button>
            )}
          </div>
        </div>
      </nav>

      <div className="h-16 md:h-16" />

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authMode} />
    </>
  );
}