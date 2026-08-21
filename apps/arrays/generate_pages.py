import os

base_path = r"D:\FreeLance\DSA visualizations\dsa-visualizer\src\app\arrays"

pages = {
    "analogy": "AnalogyScene",
    "memory": "MemoryScene",
    "big-o": "ComplexityScene",
    "sandbox": "SandboxScene",
    "patterns": "PatternsScene",
    "quiz": "QuizScene"
}

template = """"use client";

import {{ {component} }} from "@/components/arrays/{component}";
import gsap from "gsap";
import {{ ScrollTrigger }} from "gsap/ScrollTrigger";
import {{ useEffect, useRef }} from "react";
import Link from "next/link";
import {{ ArrowLeft }} from "lucide-react";

export default function Page() {{
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {{
    gsap.registerPlugin(ScrollTrigger);
  }}, []);

  return (
    <div ref={{ref}} className="relative min-h-screen">
      <Link href="/arrays" className="fixed top-8 left-8 z-50 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors flex items-center gap-2 text-sm text-white/60 hover:text-white glass-panel border border-white/10">
        <ArrowLeft size={{16}} /> Back to Module Hub
      </Link>
      <{component} />
    </div>
  );
}}
"""

for route, component in pages.items():
    page_path = os.path.join(base_path, route, "page.tsx")
    with open(page_path, "w", encoding="utf-8") as f:
        f.write(template.format(component=component))

print("Created all pages.")
