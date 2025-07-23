"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Logo {
  id: string
  name: string
  src: string
  alt: string
}

interface LogoCarouselProps {
  logos?: Logo[]
  className?: string
}

// Beispiel-Logos als inline SVGs (können später durch echte Kundenlogos ersetzt werden)
const defaultLogos: Logo[] = [
  {
    id: "1",
    name: "TechCorp",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='60' viewBox='0 0 150 60'%3E%3Crect width='150' height='60' fill='%232563eb'/%3E%3Ctext x='75' y='35' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3ETechCorp%3C/text%3E%3C/svg%3E",
    alt: "TechCorp Logo"
  },
  {
    id: "2", 
    name: "InnovateLab",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='65' viewBox='0 0 160 65'%3E%3Crect width='160' height='65' fill='%23dc2626'/%3E%3Ctext x='80' y='37' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3EInnovateLab%3C/text%3E%3C/svg%3E",
    alt: "InnovateLab Logo"
  },
  {
    id: "3",
    name: "DataSys", 
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='55' viewBox='0 0 140 55'%3E%3Crect width='140' height='55' fill='%23059669'/%3E%3Ctext x='70' y='32' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3EDataSys%3C/text%3E%3C/svg%3E",
    alt: "DataSys Logo"
  },
  {
    id: "4",
    name: "CloudTech",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='70' viewBox='0 0 170 70'%3E%3Crect width='170' height='70' fill='%237c3aed'/%3E%3Ctext x='85' y='40' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3ECloudTech%3C/text%3E%3C/svg%3E", 
    alt: "CloudTech Logo"
  },
  {
    id: "5",
    name: "DigitalPro",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='155' height='62' viewBox='0 0 155 62'%3E%3Crect width='155' height='62' fill='%23ea580c'/%3E%3Ctext x='77.5' y='36' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3EDigitalPro%3C/text%3E%3C/svg%3E",
    alt: "DigitalPro Logo"
  },
  {
    id: "6",
    name: "AI Solutions",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='165' height='68' viewBox='0 0 165 68'%3E%3Crect width='165' height='68' fill='%230891b2'/%3E%3Ctext x='82.5' y='39' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3EAI Solutions%3C/text%3E%3C/svg%3E",
    alt: "AI Solutions Logo"
  },
  {
    id: "7",
    name: "SmartFlow",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='145' height='58' viewBox='0 0 145 58'%3E%3Crect width='145' height='58' fill='%23be185d'/%3E%3Ctext x='72.5' y='34' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3ESmartFlow%3C/text%3E%3C/svg%3E",
    alt: "SmartFlow Logo"
  },
  {
    id: "8",
    name: "NextGen",
    src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='135' height='52' viewBox='0 0 135 52'%3E%3Crect width='135' height='52' fill='%234338ca'/%3E%3Ctext x='67.5' y='31' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3ENextGen%3C/text%3E%3C/svg%3E",
    alt: "NextGen Logo"
  }
]

const LogoCarousel = ({ logos = defaultLogos, className = "" }: LogoCarouselProps) => {
  const [isPaused, setIsPaused] = useState(false)
  
  // Dupliziere die Logos für seamless loop
  const duplicatedLogos = [...logos, ...logos]

  return (
    <div className={`w-full bg-white overflow-hidden relative z-20 ${className}`} style={{ height: '200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        {/* Logo Karussel */}
        <div className="relative w-full">
          <div 
            className={`flex space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-20 xl:space-x-24 2xl:space-x-28 ${
              isPaused ? '' : 'animate-marquee'
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-20 w-40"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Gradient Overlays für seamless loop effect - volle Karussel-Breite und -Höhe */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  )
}

export default LogoCarousel 