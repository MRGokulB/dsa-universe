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

const DOMAIN = "https://arrays-rho.vercel.app"; // The permanent domain for the Arrays app

export const metadata: Metadata = {
  title: {
    default: "Learn Arrays Visually | Master Data Structures",
    template: "%s | Arrays Visualizer",
  },
  description: "Master contiguous memory, pointer arithmetic, two-pointer techniques, and the sliding window pattern visually. Step-by-step interactive animations.",
  keywords: ["Arrays", "Data Structures", "Two Pointers", "Sliding Window", "Big O Notation", "Memory Allocation", "Interactive Learning", "Computer Science"],
  authors: [{ name: "DSA Visualizer Team" }],
  creator: "DSA Visualizer",
  publisher: "DSA Visualizer",
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Learn Arrays Visually | Master Data Structures",
    description: "Master contiguous memory, pointer arithmetic, two-pointer techniques, and the sliding window pattern visually.",
    url: DOMAIN,
    siteName: "DSA Visualizer",
    images: [
      {
        url: "/og-arrays.jpg",
        width: 1200,
        height: 630,
        alt: "Interactive Arrays Course",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Arrays Visually",
    description: "Master contiguous memory, pointer arithmetic, two-pointer techniques, and the sliding window pattern visually.",
    creator: "@dsavisualizer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Generative Engine Optimization (GEO) Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Master Arrays Visually",
  "description": "An interactive, visual course covering Array memory allocation, Big-O complexity, and algorithmic patterns like Two-Pointers and Sliding Window.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "DSA Visualizer",
    "url": "https://home-two-rust.vercel.app"
  },
  "coursePrerequisites": "Basic programming knowledge",
  "educationalLevel": "Beginner to Intermediate",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "PT2H"
  },
  "offers": {
    "@type": "Offer",
    "category": "Free",
    "price": "0",
    "priceCurrency": "USD"
  }
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
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
