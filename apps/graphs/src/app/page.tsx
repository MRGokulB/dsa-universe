"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "@/components/graphs/HeroScene";
import AnalogyScene from "@/components/graphs/AnalogyScene";
import RepresentationsScene from "@/components/graphs/RepresentationsScene";
import DijkstraScene from "@/components/graphs/DijkstraScene";
import SandboxScene from "@/components/graphs/SandboxScene";
import QuizScene from "@/components/graphs/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GraphsStoryPage() {
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
      <section id="representations">
        <RepresentationsScene />
      </section>
      <section id="dijkstra">
        <DijkstraScene />
      </section>
      <section id="sandbox">
        <SandboxScene />
      </section>
      <section id="quiz">
        <QuizScene />
      </section>
      <NextSection
        href="https://dp-sigma-one.vercel.app"
        title="Module 06: Dynamic Programming"
        description="Master overlapping subproblems, memoization tables, bottom-up tabulation, and the 0/1 knapsack algorithm."
      />
    </div>
  );
}
