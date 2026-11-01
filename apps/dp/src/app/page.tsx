"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "@/components/dp/HeroScene";
import AnalogyScene from "@/components/dp/AnalogyScene";
import MemoizationScene from "@/components/dp/MemoizationScene";
import TabulationScene from "@/components/dp/TabulationScene";
import SandboxScene from "@/components/dp/SandboxScene";
import QuizScene from "@/components/dp/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DynamicProgrammingStoryPage() {
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
      <section id="memoization">
        <MemoizationScene />
      </section>
      <section id="tabulation">
        <TabulationScene />
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
        description="Congratulations! You have completed all core data structures. Return to the central universe to review any module."
      />
    </div>
  );
}
