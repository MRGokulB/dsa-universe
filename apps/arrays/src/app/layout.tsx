import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arrays Visualizer",
  description: "Interactive data structures and algorithms visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#050505] text-white overflow-x-hidden min-h-screen selection:bg-blue-500/30">
        {/* Global Ambient Glows */}
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none z-0" />

        {/* Global Grid Pattern overlay */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        <main className="relative w-full min-h-screen pb-24 z-10">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
