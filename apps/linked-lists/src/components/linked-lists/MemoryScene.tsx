'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const INITIAL_ADDRESSES = [100, 104, 108, 112, 116, 120, 124, 128]
const HEX_ADDRESSES = ['0x2A4', '0x7F0', '0x110', '0xBC8', '0x5D2']
const SCATTER_POSITIONS = [
  { x: 100, y: 150 },
  { x: 600, y: 100 },
  { x: 350, y: 300 },
  { x: 150, y: 450 },
  { x: 650, y: 400 }
]
const DATA_VALUES = [42, 17, 99, 3, 8]

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
            anticipatePin: 1
          }
        })

        tl.to('.text-beat-1', { opacity: 0, y: -20, duration: 1 })
          .to('.text-beat-2', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-extra', { opacity: 0, scale: 0, duration: 1, stagger: 0.1 }, '<')
          .to('.node-linked', {
            x: (i) => SCATTER_POSITIONS[i].x,
            y: (i) => SCATTER_POSITIONS[i].y,
            stagger: 0.1,
            duration: 1.5,
            ease: 'power2.inOut'
          }, '<')
          .to('.address-dec', { opacity: 0, duration: 0.5 }, '<0.5')
          .to('.address-hex', { opacity: 1, duration: 0.5 }, '<')

        tl.to('.text-beat-2', { opacity: 0, y: -20, duration: 1 })
          .to('.text-beat-3', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-linked-1', {
            x: 400,
            y: 250,
            scale: 1.5,
            duration: 1,
            zIndex: 50,
            ease: 'power2.inOut'
          }, '<')
          .to('.node-other', { opacity: 0.2, duration: 1 }, '<')
          .to('.node-data-compartment', { backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.5)', duration: 0.5 }, '<0.5')
          .to('.node-next-compartment', { opacity: 1, x: 0, duration: 0.5 }, '<')
          .to('.callout-card', { opacity: 1, y: 0, duration: 0.5 })

        tl.to('.text-beat-3', { opacity: 0, y: -20, duration: 1 })
          .to('.callout-card', { opacity: 0, y: -20, duration: 1 }, '<')
          .to('.text-beat-4', { opacity: 1, y: 0, duration: 1 }, '<')
          .to('.node-linked-1', {
            x: SCATTER_POSITIONS[0].x,
            y: SCATTER_POSITIONS[0].y,
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
            x: pos.x + 32,
            y: pos.y + 32,
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
    <div ref={wrapperRef} className="w-full h-screen bg-transparent relative overflow-hidden text-white">
      <div className="absolute top-12 left-0 w-full flex flex-col items-center justify-center pointer-events-none z-50">
        <div className="relative h-24 w-full max-w-2xl text-center">
          <p className="text-beat-1 absolute w-full text-xl md:text-2xl font-light text-white opacity-100">
            Remember: arrays live in a tidy row of consecutive memory addresses.
          </p>
          <p className="text-beat-2 absolute w-full text-xl md:text-2xl font-light text-white opacity-0 translate-y-5">
            Linked list nodes can live ANYWHERE in memory. They don't need to be next to each other.
          </p>
          <p className="text-beat-3 absolute w-full text-xl md:text-2xl font-light text-white opacity-0 translate-y-5">
            Each node carries two things: its data, and the memory address of the next node. That address IS the pointer.
          </p>
          <p className="text-beat-4 absolute w-full text-xl md:text-2xl font-light text-white opacity-0 translate-y-5">
            To find the 4th node, you must hop through 1, 2, 3 first. No shortcut. That's why access is O(n).
          </p>
        </div>
      </div>

      <div className="callout-card absolute top-40 left-1/2 -translate-x-1/2 opacity-0 translate-y-5 bg-[#0d1117] border border-white/10 p-4 rounded-lg backdrop-blur-xl z-50 text-white/80 font-mono text-sm max-w-md text-center flex flex-col items-center gap-2 shadow-2xl">
        <div className="flex gap-1.5 w-full justify-start mb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
        </div>
        A pointer is just a number — a memory address. It's not magic.
      </div>

      <div className="cpu-status absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 translate-y-5 bg-[#0d1117] border border-white/10 p-3 rounded-full backdrop-blur-xl z-50 flex items-center gap-3 shadow-2xl">
        <Cpu className="w-5 h-5 text-blue-400" />
        <span className="font-mono text-sm text-white/80">
          Following: 0x2A4 → 0x7F0 → 0x110 → 0xBC8 → 0x5D2 → null
        </span>
      </div>

      <div className="relative w-full max-w-4xl h-[600px] mx-auto mt-32">
        <svg className="svg-lines absolute inset-0 w-full h-full pointer-events-none opacity-0 z-0">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.2)" />
            </marker>
          </defs>
          {SCATTER_POSITIONS.map((pos, i) => {
            if (i === SCATTER_POSITIONS.length - 1) return null
            const nextPos = SCATTER_POSITIONS[i + 1]
            return (
              <line
                key={`line-${i}`}
                x1={pos.x + 64}
                y1={pos.y + 32}
                x2={nextPos.x}
                y2={nextPos.y + 32}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            )
          })}
        </svg>

        <div className="head-label absolute opacity-0 -translate-y-4 z-20 flex flex-col items-center" style={{ left: SCATTER_POSITIONS[0].x + 32 - 24, top: SCATTER_POSITIONS[0].y - 48 }}>
          <span className="font-mono text-blue-400 text-sm mb-1">head</span>
          <div className="w-px h-6 bg-blue-400"></div>
        </div>

        <div className="traversal-cursor absolute w-8 h-8 rounded-full border-2 border-yellow-400 bg-yellow-400/20 opacity-0 z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        {INITIAL_ADDRESSES.map((addr, i) => {
          const isExtra = i >= 5
          const initX = i * 110 + 20
          const initY = 250
          const isNode1 = i === 0

          return (
            <div
              key={addr}
              className={`absolute flex flex-col items-center
                ${isExtra ? 'node-extra' : 'node-linked'} 
                ${isNode1 ? 'node-linked-1' : ''} 
                ${!isExtra && !isNode1 ? 'node-other' : ''}`}
              style={{ transform: `translate(${initX}px, ${initY}px)` }}
            >
              <div className="font-mono text-xs text-white/50 mb-2 relative h-4 w-full text-center">
                <span className="address-dec absolute inset-0">{addr}</span>
                {!isExtra && (
                  <span className="address-hex absolute inset-0 opacity-0 text-blue-300">{HEX_ADDRESSES[i]}</span>
                )}
              </div>
              <div className="flex">
                <div className="node-data-compartment w-16 h-16 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-l-lg flex flex-col items-center justify-center shadow-lg relative">
                  <span className="font-mono text-lg">{isExtra ? '-' : DATA_VALUES[i]}</span>
                </div>
                {!isExtra && (
                  <div className="node-next-compartment w-24 h-16 bg-purple-500/10 backdrop-blur-xl border-y border-r border-purple-500/30 rounded-r-lg flex flex-col items-center justify-center opacity-0 -translate-x-4">
                    <span className="font-mono text-xs text-purple-300">Next</span>
                    <span className="font-mono text-sm text-purple-200">{i < 4 ? HEX_ADDRESSES[i + 1] : 'null'}</span>
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
