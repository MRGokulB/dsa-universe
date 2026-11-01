"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "@/components/trees/HeroScene";
import AnalogyScene from "@/components/trees/AnalogyScene";
import BstMechanicsScene from "@/components/trees/BstMechanicsScene";
import TraversalScene from "@/components/trees/TraversalScene";
import PatternsScene from "@/components/trees/PatternsScene";
import SandboxScene from "@/components/trees/SandboxScene";
import QuizScene from "@/components/trees/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TreesStoryPage() {
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
      <section id="bst">
        <BstMechanicsScene />
      </section>
      <section id="traversals">
        <TraversalScene />
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
        href="https://graphs-xi.vercel.app/"
        title="Module 05: Graphs"
        description="Transition from hierarchical trees to cyclic networks, adjacency matrices, BFS/DFS pathfinding, and Dijkstra's algorithm."
      />
    </div>
  );
}
