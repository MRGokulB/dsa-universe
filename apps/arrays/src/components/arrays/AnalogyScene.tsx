"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function AnalogyScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);
  const bookRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the whole container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
        },
      });

      // Step 1: Books pop in one by one
      tl.from(bookRefs.current.slice(0, 5), {
        y: -100,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
        duration: 1,
      });

      // Step 2: Fade out first text, fade in next
      tl.to(".text-step-1", { opacity: 0, duration: 0.5 })
        .to(".text-step-2", { opacity: 1, duration: 0.5 }, "<");

      // Step 3: We want to insert a new book at index 2.
      // So books at index 2, 3, 4 must slide right to make space.
      // 16 tailwind width = 4rem, 4 tailwind gap = 1rem => total 5rem
      tl.to(bookRefs.current.slice(2, 5), {
        x: "5rem", 
        duration: 1,
        ease: "power2.inOut",
      });

      // Step 4: Fade in the new book (the "insertion")
      tl.from(bookRefs.current[5], {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "bounce.out",
      });

      // Fade in final text
      tl.to(".text-step-2", { opacity: 0, duration: 0.5 })
        .to(".text-step-3", { opacity: 1, duration: 0.5 }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center relative bg-transparent z-10 overflow-hidden">
      
      {/* Narration Text */}
      <div ref={textRef} className="w-[90vw] md:w-full max-w-3xl text-center z-20 mb-12 md:mb-24">
        <div className="grid [grid-template-areas:'stack'] place-items-center w-full">
          <h2 className="[grid-area:stack] text-xl md:text-4xl font-light text-step-1 opacity-100 w-full">
            Think of an Array like a perfectly organized <span className="text-blue-400 font-medium">bookshelf</span>.<br className="hidden md:block"/>
            Every book sits exactly next to the other.
          </h2>
          <h2 className="[grid-area:stack] text-xl md:text-4xl font-light text-step-2 opacity-0 w-full">
            What happens if we want to insert a new book right in the middle?
          </h2>
          <h2 className="[grid-area:stack] text-xl md:text-4xl font-light text-step-3 opacity-0 w-full">
            Every single book after it has to be <span className="text-red-400 font-medium">pushed</span> to the right.<br className="hidden md:block"/>
            The more books you have, the more work this takes. <span className="text-white/40 text-sm md:text-lg block mt-2">That&apos;s why inserting in the middle is slow.</span>
          </h2>
        </div>
      </div>

      {/* Visual Canvas */}
      <div className="w-full max-w-4xl h-48 md:h-64 flex flex-col justify-end items-center pb-8 border-b-4 border-white/20">
        <div ref={shelfRef} className="flex gap-2 md:gap-4 relative transform scale-75 md:scale-100 origin-bottom">
          {/* Base Books */}
          {[1, 2, 3, 4, 5].map((val, i) => (
            <div
              key={val}
              ref={(el) => { bookRefs.current[i] = el; }}
              className="w-12 h-32 md:w-16 md:h-40 bg-white/10 glass-card rounded-t-md border-b-0 border-white/20 flex items-end justify-center pb-4"
            >
              <span className="text-white/40 font-mono text-xs md:text-base">[{i}]</span>
            </div>
          ))}

          {/* The New Book to Insert */}
          <div
            ref={(el) => { bookRefs.current[5] = el; }}
            // left = md: 5rem (16 + 4) * 2 | sm: 3.5rem (12 + 2) * 2 = 7rem
            className="w-12 h-32 md:w-16 md:h-40 bg-blue-500/20 glass-card rounded-t-md border-blue-400/50 flex items-end justify-center pb-4 absolute left-[7rem] md:left-[10rem]"
          >
             <span className="text-blue-200 font-mono text-xs md:text-base">New</span>
          </div>
        </div>
      </div>
    </div>
  );
}
