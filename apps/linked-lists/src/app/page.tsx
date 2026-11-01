"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "@/components/linked-lists/HeroScene";
import AnalogyScene from "@/components/linked-lists/AnalogyScene";
import MemoryScene from "@/components/linked-lists/MemoryScene";
import OperationsScene from "@/components/linked-lists/OperationsScene";
import PatternsScene from "@/components/linked-lists/PatternsScene";
import SandboxScene from "@/components/linked-lists/SandboxScene";
import QuizScene from "@/components/linked-lists/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LinkedListsStoryPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="w-full relative bg-[#050505]">
      <section id="intro">
        <HeroScene />
      </section>
      <section id="analogy">
        <AnalogyScene />
      </section>
      <section id="memory">
        <MemoryScene />
      </section>
      <section id="operations">
        <OperationsScene />
      </section>
      <section id="patterns">
        <PatternsScene />
      </section>
      <section id="sandbox">
        <SandboxScene />
      </section>
      <section id="quiz">
        <QuizScene />
      </section>
      <NextSection
        href="https://home-two-rust.vercel.app/"
        title="DSA Universe Curriculum"
        description="Return to the central universe to explore more interactive visual algorithms and data structures."
      />
    </div>
  );
}
