"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroScene } from "@/components/arrays/HeroScene";
import { AnalogyScene } from "@/components/arrays/AnalogyScene";
import { MemoryScene } from "@/components/arrays/MemoryScene";
import { ComplexityScene } from "@/components/arrays/ComplexityScene";
import { PatternsScene } from "@/components/arrays/PatternsScene";
import { SandboxScene } from "@/components/arrays/SandboxScene";
import { QuizScene } from "@/components/arrays/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArraysStoryPage() {
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
      <section id="big-o">
        <ComplexityScene />
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
        href="https://linked-lists-xi.vercel.app/"
        title="Module 02: Linked Lists"
        description="Break free from contiguous memory. Master dynamic node allocation, pointer manipulation, and cycle detection."
      />
    </div>
  );
}
