import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "../app/component/Footer";
import Header from "../app/component/Header";
import ChatBot from "../app/component/ChatBot";
import { AuthProvider } from "../app/component/AuthProvider";

import "./globals.css";

// Fonts
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "Glam Aura",
  description: "Created by Faria & Humema",
  icons: {
    icon: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
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
