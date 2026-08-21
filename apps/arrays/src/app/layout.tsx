import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
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
      <body className="bg-[#09090b] text-white overflow-x-hidden min-h-screen">
        <SmoothScroll>
          <main className="relative w-full min-h-screen flex flex-col pb-24">
            <Sidebar />
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
