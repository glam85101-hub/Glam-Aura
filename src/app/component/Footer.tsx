"use client";

import Link from "next/link";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-brand-teal p-1.5 transition-transform group-hover:scale-110">
                <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Glam<span className="text-brand-teal">Aura</span>
              </span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed">
              Elevating your style with the precision of Artificial Intelligence.
            </p>
            <div className="flex gap-5 text-2xl text-gray-400">
              <a href="https://www.instagram.com/glamaura387/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-all hover:-translate-y-1"><FaInstagram /></a>
              <a href="https://x.com/HumemaA44967" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-all hover:-translate-y-1"><FaTwitter /></a>
              <a href="https://www.facebook.com/profile.php?id=61583609165895" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-all hover:-translate-y-1"><FaFacebook /></a>
              <a href="https://www.linkedin.com/company/glamaura-studio" target="_blank" rel="noopener noreferrer" className="hover:text-brand-teal transition-all hover:-translate-y-1"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest text-sm">Navigation</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/" className="hover:text-brand-teal transition-colors">Home</Link></li>
              <li><Link href="/component/about" className="hover:text-brand-teal transition-colors">About Us</Link></li>
              <li><Link href="/component/features" className="hover:text-brand-teal transition-colors">Features</Link></li>
              <li><Link href="/component/pricing" className="hover:text-brand-teal transition-colors">Pricing</Link></li>
              <li><Link href="/component/contact" className="hover:text-brand-teal transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest text-sm">Services</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/component/skin-analyzer" className="hover:text-brand-teal transition-colors">Skin Analysis</Link></li>
              <li><Link href="/component/makeup" className="hover:text-brand-teal transition-colors">Makeup Guide</Link></li>
              <li><Link href="/component/outfit" className="hover:text-brand-teal transition-colors">Outfit Checker</Link></li>
              <li><Link href="/component/facial-analysis" className="hover:text-brand-teal transition-colors">Facial Analysis</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest text-sm">Legal</h3>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link href="/component/privacy-policy" className="hover:text-brand-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/component/terms-and-conditions" className="hover:text-brand-teal transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/component/faq" className="hover:text-brand-teal transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} GlamAura Studio. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Designed with ❤️ by Faria & Humema</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
