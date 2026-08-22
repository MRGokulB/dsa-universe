"use client";

import AnalogyScene from "@/components/linked-lists/AnalogyScene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div className="relative w-full block">
      <AnalogyScene />
      <NextSection
        href="/memory"
        title="Memory & Pointers"
        description="See how linked list nodes scatter across RAM and connect via memory addresses."
      />
    </div>
  );
}
