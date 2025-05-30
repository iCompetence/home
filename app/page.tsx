"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [animationState, setAnimationState] = useState(0)

  useEffect(() => {
    // First animation after 1 second
    const timer1 = setTimeout(() => {
      setAnimationState(1)
    }, 1000)

    // Second animation after 3 seconds
    const timer2 = setTimeout(() => {
      setAnimationState(2)
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white overflow-hidden h-screen">
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

          {/* Logo in nav */}
          <div className="absolute left-1/2 -translate-x-1/2">
            {/* <h1 className="text-4xl font-bold">iCompetence</h1> */}
          </div>

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

        {/* Main content */}
        <div className="px-4 mt-16 md:mt-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-center max-w-6xl mx-auto">
            Wie können wir Ihnen weiterhelfen?
          </h2>

          {/* Content card */}
          <div className="mt-16 max-w-6xl mx-auto bg-[#E0FBFC] backdrop-blur-xl border border-[#0099cc] rounded-3xl p-8 text-gray-700">
            <div className="italic text-2xl md:text-4xl font-serif text-[#7F7F7F]/60">
              Ich möchte personalisierte Angebote auf meiner Website anbieten.
            </div>

            <div className="h-px bg-gray-300 my-8"></div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col">
                  <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-gray-200">
                    <Image
                      src={`/placeholder.svg?height=336&width=336`}
                      alt="Service image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="font-medium">Personalization Injection</h3>
                    <p className="text-gray-500">Lucky Bike, pepXpress</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
