import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ChatBot from "../components/ChatBot";
import { AuthProvider } from "../components/AuthProvider";

import "./globals.css";

// Fonts
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glam Aura",
  description: "Created by Faria & Humema",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer/>
        <ChatBot />
      </body>
    </html>
    </AuthProvider>
  );
}
