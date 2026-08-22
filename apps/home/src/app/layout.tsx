import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const DOMAIN = "https://home-two-rust.vercel.app"; // The permanent domain can be configured here

export const metadata: Metadata = {
  title: {
    default: "Master DSA Visually | Next-Gen Interactive Learning",
    template: "%s | DSA Visualizer",
  },
  description: "Stop staring at walls of text. Understand Data Structures & Algorithms through cinematic, step-by-step interactive animations, memory visualization, and real code execution.",
  keywords: ["DSA", "Data Structures", "Algorithms", "Visualizer", "Interactive Learning", "Learn Coding", "LeetCode Prep", "Computer Science"],
  authors: [{ name: "DSA Visualizer Team" }],
  creator: "DSA Visualizer",
  publisher: "DSA Visualizer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(DOMAIN),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Master DSA Visually | Interactive Data Structures",
    description: "Learn Data Structures & Algorithms with cinematic, step-by-step 3D animations and real-time code execution.",
    url: DOMAIN,
    siteName: "DSA Visualizer",
    images: [
      {
        url: "/og-image.jpg", // You can add a real OG image later
        width: 1200,
        height: 630,
        alt: "DSA Visualizer Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Master DSA Visually | Interactive Data Structures",
    description: "Learn Data Structures & Algorithms with cinematic, step-by-step 3D animations and real-time code execution.",
    creator: "@dsavisualizer", // Replace if applicable
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Generative Engine Optimization (GEO) Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "DSA Visualizer",
  "url": DOMAIN,
  "logo": `${DOMAIN}/logo.png`, // Add a logo later
  "description": "An interactive educational platform teaching Data Structures and Algorithms through visual, step-by-step animations.",
  "sameAs": [
    // Social links go here
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${DOMAIN}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#09090b] text-white min-h-screen">{children}</body>
    </html>
  );
}
