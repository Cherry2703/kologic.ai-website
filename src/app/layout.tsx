import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotWidget } from "@/components/ui/ChatbotWidget";
import { GlobalSplash } from "@/components/ui/GlobalSplash";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kologic AI | Enterprise AI SaaS Platform",
  description: "Conversational AI, Agentic Automation, and Intelligent Digital Platforms for modern enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-primary/20 selection:text-primary min-h-screen flex flex-col relative`}>
        <GlobalSplash />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
