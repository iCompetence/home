"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [animationState, setAnimationState] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState(1), 1000)
    const timer2 = setTimeout(() => setAnimationState(2), 3000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white">
      {/* Logo - starts centered, then moves to top */}
      <div
        className={`transition-all duration-1000 ease-in-out ${
          animationState === 0
            ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : "absolute top-6 left-1/2 -translate-x-1/2"
        }`}
      >
        <h1 className="text-4xl md:text-3xl font-bold font-theinhardt">iCompetence</h1>
      </div>

      {/* Tagline - appears in second state */}
      <div
        className={`transition-all duration-1000 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center ${
          animationState >= 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-4xl md:text-6xl font-serif"></h2>
      </div>

      {/* Full homepage - appears in third state */}
      <div
        className={`transition-all duration-1000 ease-in-out ${
          animationState >= 2 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white">
          {/* Navigation */}
          <nav className="flex justify-between items-center p-6">
            <div className="flex space-x-2">
              <Link href="#" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Über uns
              </Link>
              <Link href="#" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Unsere Leistungen
              </Link>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2"></div>
            <div className="flex space-x-2 h-10">
              <Link href="#" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Blog
              </Link>
              <Link href="#" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Kontakt
              </Link>
              <button className="bg-[#161925] p-4 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </nav>
          {/* Question headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-center max-w-6xl mx-auto text-[#E0FBFC] mt-16 md:mt-24">
            Wie können wir Ihnen weiterhelfen?
          </h2>
        </div>
        <div
          ref={frameRef}
          className="relative z-10 bg-[#E0FBFC] py-12 mx-[160px]"
          style={{ height: '1500px', marginTop: '360px' }}
        >
          <div className="text-[#161925] text-2xl font-bold p-8">Dies ist ein Overlay-Frame</div>
        </div>
      </div>
    </main>
  )
}
