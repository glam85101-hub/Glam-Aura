'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-is-mobile';

export default function Contact() {
  const [result, setResult] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult('Sending....');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '078fa6cb-6b01-4e8a-ad43-20df68e86e93');
    formData.append('to_email', 'glam85101@gmail.com');
    formData.append('subject', 'New Contact Form Submission');
    formData.append('autoresponse', 'Thank you for contacting me! I will reply soon.');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');
        form.reset();
      } else {
        console.error(data);
        setResult('Error');
      }
    } catch (error) {
      console.error(error);
      setResult('Error');
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige text-brand-dark py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-mint/5 rounded-full blur-3xl -z-10"></div>

      <header className="text-center mb-20 max-w-3xl mx-auto" data-aos="fade-up">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-xs uppercase tracking-widest">
          Connect
        </div>
        <motion.h1
          initial={isMobile ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6"
        >
          Let's Start a <span className="text-brand-teal italic">Conversation</span>
        </motion.h1>
        <p className="text-lg sm:text-xl text-gray-600 font-medium">
          Have a question about our AI styling or want to partner with us? We're here to help you elevate your aesthetic.
        </p>
      </header>


      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left Side - Social Links */}
        <div className="space-y-6 sm:space-y-8" data-aos="fade-right">
          {[
            {
              name: 'LinkedIn',
              link: 'https://www.linkedin.com/in/glam-aura-087205387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              ),
              desc: 'Follow our professional journey'
            },
            {
              name: 'Twitter',
              link: 'https://x.com/HumemaA44967',
              icon: (
                 <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              ),
              desc: 'Stay updated with latest trends'
            },
            {
              name: 'Instagram',
              link: 'https://www.instagram.com/glamaura387/',
              icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              ),
              desc: 'Discover visual style inspiration'
            },
          ].map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className="
                  relative overflow-hidden rounded-[2rem] p-8
                  bg-white
                  border border-brand-teal/10
                  hover:shadow-2xl hover:shadow-brand-teal/10
                  hover:-translate-y-1
                  transition-all duration-500
                "
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-brand-teal/5 text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-all duration-500">
                      {social.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-brand-dark">
                        {social.name}
                      </h3>
                      <p className="text-gray-500 mt-1 font-medium">
                        {social.desc}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-2xl transform group-hover:translate-x-2 
                    transition-transform duration-300 text-brand-teal"
                  >
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Right Side - Contact Form */}
        <div className="relative" data-aos="fade-left">
          <div className="absolute inset-0 bg-brand-teal/20 rounded-[2.5rem] blur-2xl transform translate-y-4"></div>
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-[2.5rem] p-10 border border-brand-teal/10 shadow-xl"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-brand-teal uppercase tracking-widest ml-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  className="w-full px-6 py-4 bg-brand-beige/50 rounded-2xl border border-brand-teal/10 focus:border-brand-teal focus:bg-white transition-all duration-300 outline-none text-brand-dark placeholder:text-gray-400 font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-brand-teal uppercase tracking-widest ml-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  className="w-full px-6 py-4 bg-brand-beige/50 rounded-2xl border border-brand-teal/10 focus:border-brand-teal focus:bg-white transition-all duration-300 outline-none text-brand-dark placeholder:text-gray-400 font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-brand-teal uppercase tracking-widest ml-1">Your Message</label>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-6 py-4 bg-brand-beige/50 rounded-2xl border border-brand-teal/10 focus:border-brand-teal focus:bg-white transition-all duration-300 outline-none text-brand-dark placeholder:text-gray-400 font-medium resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={result === 'Sending....'}
                className="w-full pt-4 group"
              >
                <div className="relative px-8 py-5 bg-brand-dark rounded-2xl text-white font-black text-lg hover:bg-brand-teal transition-all duration-300 shadow-xl shadow-brand-dark/20 active:scale-[0.98] flex items-center justify-center gap-3">
                  {result === 'Sending....' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : 'Send Message'}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>

              {result === 'Form Submitted Successfully' && (
                <motion.p 
                  initial={isMobile ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center bg-green-50 text-green-700 border border-green-100 px-6 py-4 rounded-2xl font-bold"
                >
                  ✨ Message received! We'll be in touch shortly.
                </motion.p>
              )}
              {result === 'Error' && (
                <motion.p 
                  initial={isMobile ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center bg-red-50 text-red-700 border border-red-100 px-6 py-4 rounded-2xl font-bold"
                >
                  ❌ Oops! Something went wrong. Please try again.
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}