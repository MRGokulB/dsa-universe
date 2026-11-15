import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const DOMAIN = "https://home-two-rust.vercel.app";

export const viewport: Viewport = {
  themeColor: "#f4f5f8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "DSA Universe | Silicon Hardware Architecture & Precision Visualizers",
    template: "%s | DSA Universe",
  },
  description: "Master Data Structures & Algorithms visually. Step through physical cache lines, pointer dereference chains, LIFO stack frames, and dynamic programming memoization on live silicon dies.",
  keywords: [
    "DSA visualizer",
    "Data Structures",
    "Algorithms",
    "Interactive computer science",
    "Cache lines memory",
    "Dijkstra algorithm visualizer",
    "Binary Search Tree visualizer",
    "Dynamic programming memoization",
    "LeetCode visualization"
  ],
  authors: [{ name: "DSA Universe Team" }],
  creator: "DSA Universe",
  publisher: "DSA Universe",
  metadataBase: new URL(DOMAIN),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: "/apple-icon.png"
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DSA Universe | Silicon Hardware Architecture & Precision Visualizers",
    description: "Step through physical cache lines, pointer dereference chains, and asymptotic execution curves on live silicon dies.",
    url: DOMAIN,
    siteName: "DSA Universe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSA Universe | Silicon Hardware Architecture & Precision Visualizers",
    description: "Interactive hardware silicon visualizers for Data Structures and Algorithms.",
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

const educationalOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "DSA Universe",
  "url": DOMAIN,
  "description": "An interactive educational platform teaching Data Structures and Algorithms through hardware silicon console visualizers.",
  "sameAs": [
    "https://github.com/MRGokulB/dsa-universe"
  ]
};

const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "DSA Universe Silicon Workbench",
  "url": DOMAIN,
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Contiguous 64-bit cache line array visualizer",
    "Floyd cycle detection pointer chain simulation",
    "LIFO RSP stack frame push and purge tracking",
    "Binary Search Tree logarithmic traversal pathfinder",
    "Dijkstra priority queue shortest path relaxation",
    "1D dynamic programming tabulation lattice"
  ]
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Data Structures & Algorithms Silicon Visualizer Masterclass",
  "description": "Step-by-step interactive course teaching algorithm time complexity, spatial locality, and memory layout.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "DSA Universe",
    "url": DOMAIN
  },
  "educationalLevel": "Beginner to Advanced",
  "about": [
    "Data Structures",
    "Algorithms",
    "Big O Complexity",
    "Computer Architecture",
    "Memory Hierarchy"
  ]
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why are Arrays faster than Linked Lists for sequential traversal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Arrays allocate memory in contiguous 64-bit blocks. When a CPU reads an array index, it loads an entire 64-byte cache line into L1 cache, achieving spatial locality with near-zero cache misses. Linked Lists store nodes dispersed across the heap, causing CPU cache misses on every pointer dereference."
      }
    },
    {
      "@type": "Question",
      "name": "What is the time complexity of Dijkstra's algorithm vs Breadth-First Search (BFS)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Breadth-First Search (BFS) operates in O(V + E) time on unweighted graphs using a standard FIFO queue. For weighted graphs with non-negative edge weights, Dijkstra's algorithm utilizes a Min-Heap priority queue, resulting in an O(E log V) time complexity."
      }
    },
    {
      "@type": "Question",
      "name": "How does Dynamic Programming tabulation differ from memoization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tabulation is an iterative bottom-up approach that fills an array or matrix starting from base cases, eliminating recursion stack overhead and optimizing CPU cache locality. Memoization is a top-down recursive approach that caches subproblem results on demand."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Call Stack operate during recursive function calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CPU Call Stack operates as a Last-In, First-Out (LIFO) data structure. Each function invocation pushes an activation frame containing return addresses, parameters, and local variables. Excessive unoptimized recursion without tail call elimination leads to Call Stack overflow."
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}}catch(e){}})();`
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </head>
      <body suppressHydrationWarning className="bg-[#f3f4f7] dark:bg-[#07090e] text-[#0f172a] dark:text-slate-100 min-h-screen transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
