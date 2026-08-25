import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";
import { NavigationControls } from "@/components/navigation/NavigationControls";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const DOMAIN = "https://linked-lists.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Learn Linked Lists Visually | Master Pointer Manipulation",
    template: "%s | Linked Lists Visualizer",
  },
  description: "Master linked lists through cinematic animations. Understand pointers, node allocation, insertion, deletion, reversal, and cycle detection with step-by-step interactive visuals.",
  keywords: ["Linked Lists", "Data Structures", "Pointers", "Node", "Singly Linked List", "Floyd's Algorithm", "Reverse Linked List", "Interactive Learning"],
  authors: [{ name: "DSA Visualizer Team" }],
  creator: "DSA Visualizer",
  publisher: "DSA Visualizer",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Learn Linked Lists Visually | Master Pointer Manipulation",
    description: "Master linked lists through cinematic animations and interactive step-by-step pointer visualizations.",
    url: DOMAIN,
    siteName: "DSA Visualizer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Linked Lists Visually",
    description: "Master linked lists through cinematic animations and interactive step-by-step pointer visualizations.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Master Linked Lists Visually",
  "description": "An interactive, visual course covering linked list memory layout, pointer manipulation, insertion, deletion, reversal, and Floyd's cycle detection algorithm.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "DSA Visualizer",
    "url": "https://home-two-rust.vercel.app"
  },
  "coursePrerequisites": "Understanding of Arrays",
  "educationalLevel": "Beginner to Intermediate",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Online",
    "courseWorkload": "PT3H"
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
      <body className="bg-[#050505] text-white overflow-x-hidden min-h-screen selection:bg-purple-500/30">
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-pink-500/10 blur-[150px] pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        <main className="relative w-full min-h-screen pb-24 z-10">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
