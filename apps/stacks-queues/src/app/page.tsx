"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "@/components/stacks-queues/HeroScene";
import AnalogyScene from "@/components/stacks-queues/AnalogyScene";
import StackMechanicsScene from "@/components/stacks-queues/StackMechanicsScene";
import QueueMechanicsScene from "@/components/stacks-queues/QueueMechanicsScene";
import PatternsScene from "@/components/stacks-queues/PatternsScene";
import SandboxScene from "@/components/stacks-queues/SandboxScene";
import QuizScene from "@/components/stacks-queues/QuizScene";
import { NextSection } from "@/components/layout/NextSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StacksQueuesStoryPage() {
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
      <section id="stack">
        <StackMechanicsScene />
      </section>
      <section id="queue">
        <QueueMechanicsScene />
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
        description="Return to the central universe to explore Trees, Graphs, and Dynamic Programming."
      />
    </div>
  );
}
