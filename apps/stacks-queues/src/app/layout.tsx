import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";
import { NavigationControls } from "@/components/navigation/NavigationControls";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const DOMAIN = "https://stacks-queues.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Learn Stacks & Queues Visually | Master LIFO & FIFO",
    template: "%s | Stacks & Queues Visualizer",
  },
  description: "Master Stacks and Queues through interactive visualizations. Understand the CPU call stack, circular ring buffers, monotonic stacks, and breadth-first search.",
  keywords: ["Stacks", "Queues", "Data Structures", "LIFO", "FIFO", "Monotonic Stack", "Call Stack", "Circular Buffer", "Interactive Learning"],
  authors: [{ name: "DSA Visualizer Team" }],
  creator: "DSA Visualizer",
  publisher: "DSA Visualizer",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Learn Stacks & Queues Visually | Master LIFO & FIFO",
    description: "Master Stacks and Queues through interactive visualizations and real-time step-by-step animations.",
    url: DOMAIN,
    siteName: "DSA Visualizer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Stacks & Queues Visually",
    description: "Master Stacks and Queues through interactive animations and call stack visualizations.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Master Stacks & Queues Visually",
  "description": "An interactive, visual course covering Stacks and Queues, CPU call stack mechanics, circular buffers, monotonic stacks, and BFS algorithms.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "DSA Visualizer",
    "url": "https://home-two-rust.vercel.app"
  },
  "coursePrerequisites": "Basic understanding of Arrays",
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
      <body suppressHydrationWarning className="bg-[#050505] text-white overflow-x-hidden min-h-screen selection:bg-emerald-500/30">
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-teal-500/10 blur-[150px] pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        <NavigationControls topicName="Stacks & Queues" />
        <main className="relative w-full min-h-screen pb-24 z-10">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
