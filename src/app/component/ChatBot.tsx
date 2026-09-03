"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";

type Message = {
  role: "user" | "aura";
  content: string;
};

const quickReplies = [
  "How do I analyze my face?",
  "Check my outfit coordination",
  "Suggest makeup for my skin tone",
  "What is GlamAura AI?",
];

const initialGreeting =
  "Hi! I'm Aura, your GlamAura style assistant. Ask me anything about your facial features, makeup recommendations, or outfit coordination!";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const greetedRef = useRef(false);
  const isMobile = useIsMobile();

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && !greetedRef.current) {
      greetedRef.current = true;
      setMessages([{ role: "aura", content: initialGreeting }]);
    }
  }, [isOpen]);

  const handleSend = async (msg: string) => {
    if (!msg.trim() || isLoading) return;

    const userMessage = msg.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "aura", content: data.response }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "aura",
          content: "I'm sorry, I encountered a style glitch. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuick = (text: string) => {
    if (isLoading) return;
    handleSend(text);
  };

  return (
    <div>
      {/* Floating Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-brand-teal to-brand-mint shadow-2xl flex items-center justify-center z-[9999] group"
        whileHover={isMobile ? {} : { scale: 1.1 }}
        whileTap={isMobile ? {} : { scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="text-brand-dark" size={30} />
        <motion.span
          className="absolute bottom-3 right-3 w-3 h-3 bg-white rounded-full"
          animate={isMobile ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.button>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-[10000] p-4 sm:p-6"
            initial={isMobile ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg bg-brand-dark border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
              initial={isMobile ? {} : { y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={isMobile ? {} : { y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-brand-dark shadow-lg">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-black tracking-tight">Aura</h3>
                    <p className="text-[10px] uppercase font-black tracking-widest text-brand-teal">AI Style Expert</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-hide">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={isMobile ? {} : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-brand-teal to-brand-mint text-brand-dark font-bold rounded-tr-none shadow-lg"
                          : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
                      }`}
                    >
                      {m.content}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    className="flex items-center space-x-2 bg-white/5 w-fit px-4 py-3 rounded-2xl rounded-tl-none border border-white/5"
                    initial={isMobile ? {} : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 className="w-4 h-4 text-brand-teal animate-spin" />
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Aura is thinking...</span>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Footer Section: Quick Replies & Input */}
              <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">
                {/* Quick Replies */}
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((q, i) => (
                    <button
                      key={i}
                      className="px-4 py-2 text-xs font-bold bg-brand-dark border border-white/10 text-gray-300 rounded-full hover:border-brand-teal hover:text-brand-teal transition-all active:scale-95"
                      onClick={() => handleQuick(q)}
                      disabled={isLoading}
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input Field */}
                <div className="relative flex items-center gap-2 bg-brand-dark border border-white/10 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-brand-teal/50 transition-all">
                  <input
                    type="text"
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 text-sm py-2"
                    placeholder="Describe your style concern..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    disabled={isLoading}
                  />
                  <button
                    className="w-10 h-10 rounded-xl bg-brand-teal text-brand-dark flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 disabled:grayscale"
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || isLoading}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
