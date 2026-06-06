import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Footer from "../app/component/Footer";
import Header from "../app/component/Header";
import RegisterClient from "../app/component/RegisterClient";
import ChatBot from "../app/component/ChatBot";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
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
  icons: {
    icon: "/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <ClerkProvider> 
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
                <RegisterClient /> {/* Har login ke baad user DB me register ho jayega */}

        <Header />
        {children}
        <Footer/>
        <ChatBot />
      </body>
    </html>
    </ClerkProvider>              

  );
}