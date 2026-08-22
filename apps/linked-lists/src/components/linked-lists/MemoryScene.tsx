"use client";

import React, { useEffect, useRef } from "react";
import { Cpu } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INITIAL_ADDRESSES = [100, 104, 108, 112, 116, 120, 124, 128]
const HEX_ADDRESSES = ['0x2A4', '0x7F0', '0x110', '0xBC8', '0x5D2']
const SCATTER_POSITIONS = [
  { left: 20, top: 20 },
  { left: 80, top: 20 },
  { left: 50, top: 50 },
  { left: 20, top: 80 },
  { left: 80, top: 80 }
]
const DATA_VALUES = [42, 17, 99, 3, 8]

const ArrowHead = ({ left, top, rotate, color = "text-white/20", className = "" }: any) => (
  <div className={`absolute z-30 ${color} ${className}`} style={{ left, top, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="24,12 0,24 0,0"/>
    </svg>
  </div>
);

export default function MemoryScene() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context

    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=2500',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        })

        tl.to('.text-beat-1', { opacity: 0, y: -20, duration: 1 })
          .to('.text-beat-2', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-extra', { opacity: 0, scale: 0.5, duration: 0.5, stagger: 0.05 }, '<')
          .to('.node-linked', {
            left: (i) => `${SCATTER_POSITIONS[i].left}%`,
            top: (i) => `${SCATTER_POSITIONS[i].top}%`,
            stagger: 0.1,
            duration: 1.5,
            ease: 'power2.inOut'
          }, '<')
          .to('.address-dec', { opacity: 0, duration: 0.5 }, '<0.5')
          .to('.address-hex', { opacity: 1, duration: 0.5 }, '<')

        tl.to('.text-beat-2', { opacity: 0, y: -20, duration: 1 })
          .to('.text-beat-3', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-linked-1', {
            left: '50%',
            top: '50%',
            scale: 1.5,
            duration: 1,
            zIndex: 50,
            ease: 'power2.inOut'
          }, '<')
          .to('.node-other', { opacity: 0.2, duration: 1 }, '<')
          .to('.node-data-compartment', { backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.5)', duration: 0.5 }, '<0.5')
          .to('.node-next-compartment', { opacity: 1, width: '4rem', duration: 0.5 }, '<')
          .to('.callout-card', { opacity: 1, y: 0, duration: 0.5 })

        tl.to('.text-beat-3', { opacity: 0, y: -20, duration: 1 })
          .to('.callout-card', { opacity: 0, y: -20, duration: 1 }, '<')
          .to('.text-beat-4', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-linked-1', {
            left: `${SCATTER_POSITIONS[0].left}%`,
            top: `${SCATTER_POSITIONS[0].top}%`,
            scale: 1,
            zIndex: 10,
            duration: 1,
            ease: 'power2.inOut'
          }, '<')
          .to('.node-other', { opacity: 1, duration: 1 }, '<')
          .to('.node-data-compartment', { backgroundColor: 'rgba(255, 255, 255, 0.02)', borderColor: 'rgba(255, 255, 255, 0.1)', duration: 0.5 }, '<')
          .to('.svg-lines', { opacity: 1, duration: 1 }, '<0.5')
          .to('.head-label', { opacity: 1, y: 0, duration: 0.5 })
          .to('.cpu-status', { opacity: 1, y: 0, duration: 0.5 }, '<')

        SCATTER_POSITIONS.forEach((pos, i) => {
          tl.to('.traversal-cursor', {
            left: `${pos.left}%`,
            top: `${pos.top}%`,
            opacity: 1,
            duration: 0.5,
            ease: 'power1.inOut'
          })
          if (i < SCATTER_POSITIONS.length - 1) {
            tl.to({}, { duration: 0.2 })
          }
        })
      }, wrapperRef)
    }, 500)

    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="w-full h-screen bg-transparent relative overflow-hidden text-white flex flex-col pt-24 md:pt-32 px-4">
      <div className="relative w-full max-w-3xl mx-auto h-24 md:h-32 text-center z-30 shrink-0">
        <p className="text-beat-1 absolute inset-0 text-base md:text-2xl font-light text-white opacity-100">
          Remember: arrays live in a tidy row of consecutive memory addresses.
        </p>
        <p className="text-beat-2 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5">
          Linked list nodes can live ANYWHERE in memory. They don't need to be next to each other.
        </p>
        <p className="text-beat-3 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5">
          Each node carries two things: its data, and the memory address of the next node. That address IS the pointer.
        </p>
        <p className="text-beat-4 absolute inset-0 text-base md:text-2xl font-light text-white opacity-0 translate-y-5">
          To find the 4th node, you must hop through 1, 2, 3 first. No shortcut. That's why access is O(n).
        </p>
      </div>

      <div className="callout-card absolute top-32 md:top-48 left-1/2 -translate-x-1/2 opacity-0 translate-y-5 bg-[#0d1117] border border-white/10 p-3 md:p-4 rounded-lg backdrop-blur-xl z-50 text-white/80 font-mono text-xs md:text-sm max-w-[90%] md:max-w-md text-center flex flex-col items-center gap-2 shadow-2xl">
        <div className="flex gap-1.5 w-full justify-start mb-1">
          <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        A pointer is just a number - a memory address. It's not magic.
      </div>

      <div className="cpu-status absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 opacity-0 translate-y-5 bg-[#0d1117] border border-white/10 p-2 md:p-3 rounded-full backdrop-blur-xl z-50 flex items-center gap-2 md:gap-3 shadow-2xl max-w-[90%] overflow-x-auto whitespace-nowrap">
        <Cpu className="w-4 h-4 md:w-5 md:h-5 text-blue-400 shrink-0" />
        <span className="font-mono text-xs md:text-sm text-white/80">
          Following: 0x2A4 → 0x7F0 → 0x110 → 0xBC8 → 0x5D2 → null
        </span>
      </div>

      <div className="visual-container relative w-full flex-1 max-h-[60vh] max-w-5xl mx-auto z-20">
        <div className="svg-lines absolute inset-0 opacity-0 z-0">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {SCATTER_POSITIONS.map((pos, i) => {
              if (i === SCATTER_POSITIONS.length - 1) return null
              const nextPos = SCATTER_POSITIONS[i + 1]
              return (
                <line
                  key={`line-${i}`}
                  x1={`${pos.left}%`}
                  y1={`${pos.top}%`}
                  x2={`${nextPos.left}%`}
                  y2={`${nextPos.top}%`}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
              )
            })}
          </svg>
          
          <ArrowHead left="calc(80% - 60px)" top="20%" rotate={0} />
          <ArrowHead left="calc(50% + 40px)" top="calc(50% - 40px)" rotate={135} />
          <ArrowHead left="calc(20% + 40px)" top="calc(80% - 40px)" rotate={135} />
          <ArrowHead left="calc(80% - 60px)" top="80%" rotate={0} />
        </div>

        <div className="head-label absolute opacity-0 -translate-y-4 z-20 flex flex-col items-center" style={{ left: `calc(${SCATTER_POSITIONS[0].left}%)`, top: `calc(${SCATTER_POSITIONS[0].top}% - 4rem)`, transform: 'translateX(-50%)' }}>
          <span className="font-mono text-blue-400 text-xs md:text-sm mb-1">head</span>
          <div className="w-px h-4 md:h-6 bg-blue-400"></div>
        </div>

        <div className="traversal-cursor absolute w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-400 bg-yellow-400/20 opacity-0 z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ left: '10%', top: '40%' }} />

        {INITIAL_ADDRESSES.map((addr, i) => {
          const isExtra = i >= 5
          const initLeft = (i * 12) + 10
          const isNode1 = i === 0

          return (
            <div
              key={addr}
              className={`absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2
                ${isExtra ? 'node-extra' : 'node-linked'} 
                ${isNode1 ? 'node-linked-1' : ''} 
                ${!isExtra && !isNode1 ? 'node-other' : ''}`}
              style={{ left: `${initLeft}%`, top: `40%` }}
            >
              <div className="font-mono text-[10px] md:text-xs text-white/50 mb-1 md:mb-2 relative h-4 w-full text-center">
                <span className="address-dec absolute inset-0">{addr}</span>
                {!isExtra && (
                  <span className="address-hex absolute inset-0 opacity-0 text-blue-300">{HEX_ADDRESSES[i]}</span>
                )}
              </div>
              <div className="flex bg-[#0d1117] rounded-lg shadow-2xl border border-white/10 relative z-20">
                <div className="node-data-compartment w-10 h-10 md:w-12 md:h-12 flex flex-col items-center justify-center">
                  <span className="font-mono text-sm md:text-lg">{isExtra ? '-' : DATA_VALUES[i]}</span>
                </div>
                {!isExtra && (
                  <div className="node-next-compartment w-0 h-10 md:h-12 bg-purple-500/10 border-l border-purple-500/30 flex flex-col items-center justify-center opacity-0 overflow-hidden">
                    <span className="font-mono text-[10px] text-purple-300">Next</span>
                    <span className="font-mono text-[10px] text-purple-200">{i < 4 ? HEX_ADDRESSES[i + 1] : 'null'}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
