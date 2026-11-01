import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";
import { NavigationControls } from "@/components/navigation/NavigationControls";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const DOMAIN = "https://trees-dsa.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Learn Trees Visually | Master Hierarchies & BSTs",
    template: "%s | Trees Visualizer",
  },
  description: "Master hierarchical tree data structures through interactive animations. Explore binary search trees, in-order, pre-order, and post-order traversals, lowest common ancestor, and real-time tree sandboxes.",
  keywords: ["Trees", "Binary Search Tree", "BST", "Data Structures", "Algorithms", "Tree Traversal", "Inorder", "Lowest Common Ancestor"],
  authors: [{ name: "DSA Visualizer Team" }],
  creator: "DSA Visualizer",
  publisher: "DSA Visualizer",
  metadataBase: new URL(DOMAIN),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Learn Trees Visually | Master Hierarchies & BSTs",
    description: "Master trees and binary search trees through cinematic visual storytelling.",
    url: DOMAIN,
    siteName: "DSA Visualizer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Trees Visually",
    description: "Master hierarchical tree data structures and recursive algorithms visually.",
  },
  robots: { index: true, follow: true },
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
      <body suppressHydrationWarning className="bg-[#050505] text-white overflow-x-hidden min-h-screen selection:bg-amber-500/30">
        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-orange-500/10 blur-[150px] pointer-events-none z-0" />
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        <NavigationControls topicName="Trees" />
        <main className="relative w-full min-h-screen pb-24 z-10">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
