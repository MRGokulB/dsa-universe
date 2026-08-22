"use client";

import PatternsScene from "@/components/linked-lists/PatternsScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full block">
      <PatternsScene />
      <NextSection
        href="/sandbox"
        title="Sandbox"
        description="Build your own linked list — prepend, append, insert, and delete nodes live."
      />
    </div>
  );
}
