"use client";

import SandboxScene from "@/components/linked-lists/SandboxScene";
import { NextSection } from "@/components/layout/NextSection";

export default function Page() {
  return (
    <div className="relative w-full block">
      <SandboxScene />
      <NextSection
        href="/quiz"
        title="Knowledge Check"
        description="Test your understanding with tricky pointer-tracing and conceptual questions."
      />
    </div>
  );
}
