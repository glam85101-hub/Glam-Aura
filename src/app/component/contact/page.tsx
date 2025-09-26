'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('message', formData.message);
    form.append('_subject', 'New Contact Form Submission');
    form.append('_template', 'table');
    form.append('_captcha', 'false');
    form.append('_autoresponse', 'Thank you for contacting me! I will reply soon.');

    try {
      const response = await fetch('https://formsubmit.co/56bfe3c8dc7e27c91310ebff7098c7cc', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f2ef] text-black relative overflow-hidden px-4">
      {/* HEADER */}
      <header className="flex items-center justify-center pt-16 mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center border-b-4 border-[#46c7ab] pb-2"
        >
          Get in <span className="text-[#46c7ab]">Touch</span>
        </motion.h1>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Left Side - Social Links */}
        <div className="space-y-6 sm:space-y-8">
          {[
            {
              name: 'LinkedIn',
              link: 'https://www.linkedin.com/in/glam-aura-087205387?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
              icon: '→',
            },
            {
              name: 'Twitter',
              link: 'https://x.com/HumemaA44967',
              icon: '→',
            },
            {
              name: 'Facebook',
              link: 'https://www.facebook.com/profile.php?id=61581457560218',
              icon: '→',
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
                  relative overflow-hidden rounded-lg p-6
                  bg-white
                  border-2 border-[#46c7ab]
                  hover:shadow-lg hover:shadow-[#46c7ab]/30
                  transition-all duration-500
                "
              >
                <div className="relative flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-black">
                      {social.name}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                      Connect with me
                    </p>
                  </div>
                  <span
                    className="text-2xl sm:text-3xl transform group-hover:translate-x-2 
                    transition-transform duration-300 text-[#46c7ab]"
                  >
                    {social.icon}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Right Side - Contact Form */}
        <div className="relative">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#46c7ab] shadow-md"
          >
            <div className="space-y-5 sm:space-y-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-lg border-2 border-[#46c7ab] focus:border-[#46c7ab] transition-all duration-300 outline-none text-black placeholder:text-gray-500"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-lg border-2 border-[#46c7ab] focus:border-[#46c7ab] transition-all duration-300 outline-none text-black placeholder:text-gray-500"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white rounded-lg border-2 border-[#46c7ab] focus:border-[#46c7ab] transition-all duration-300 outline-none text-black placeholder:text-gray-500"
                required
              />

              <button
                type="submit"
                disabled={status === 'sending'}
                className="relative w-full"
              >
                <div className="relative px-6 py-3 bg-[#46c7ab] rounded-lg text-white font-semibold hover:bg-[#3da18c] transition-colors duration-300">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </div>
              </button>

              {status === 'success' && (
                <p className="mt-4 text-center bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded-md font-medium">
                  Message sent successfully.
                </p>
              )}
              {status === 'error' && (
                <p className="mt-4 text-center bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-md font-medium">
                  Failed to send message. Please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
