"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [animationState, setAnimationState] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentFrameRef = useRef<HTMLDivElement>(null)
  const [frameMargin, setFrameMargin] = useState(160)
  const [showMenu, setShowMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState(1), 1000)
    const timer2 = setTimeout(() => setAnimationState(2), 2000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!contentFrameRef.current) return;
      const rect = contentFrameRef.current.getBoundingClientRect();
      const initialOffset = 360;
      const distanceFromTop = rect.top;
      let progress = 1 - Math.max(0, Math.min(distanceFromTop / initialOffset, 1));
      // Interpolate margin from 160px to 0px
      let newMargin = 160 - 160 * progress;
      setFrameMargin(newMargin);
      // Show menu when content frame reaches top
      setShowMenu(distanceFromTop <= 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      title: "Personalization Injection",
      subtitle: "Lucky Bike, pepXpress",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Data Visualization",
      subtitle: "DataCorp, InsightX",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "AI Automation",
      subtitle: "AutoAI, NextGen",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Cloud Integration",
      subtitle: "Cloudify, SkyNet",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "E-Commerce Boost",
      subtitle: "ShopMaster, QuickCart",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Customer Insights",
      subtitle: "InsightPro, UserSense",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Marketing Analytics",
      subtitle: "MarketGenius, AdScope",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Workflow Automation",
      subtitle: "FlowPro, TaskPilot",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Realtime Reporting",
      subtitle: "LiveStats, DashNow",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    }
  ]

  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white">
      {/* Background */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white" />

      {/* Title */}
      <div className={`fixed inset-0 w-full h-full z-20 pointer-events-none`}>
        <div className={`absolute transition-all duration-1000 ease-in-out animate-fade-in ${
          animationState >= 1 ? 'top-6 left-1/2 -translate-x-1/2' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        } ${showMenu ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-4xl md:text-3xl font-bold font-theinhardt">iCompetence</h1>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-[#161925] z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Title in overlay */}
        <div className="absolute top-6 left-6">
          <Link 
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#E0FBFC] hover:text-[#0099CC] transition-colors"
          >
            <h1 className="text-2xl font-bold font-theinhardt">iCompetence</h1>
          </Link>
        </div>
        
        <div className="h-full flex flex-col items-center justify-center space-y-8">
          <Link 
            href="https://www.icompetence.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#E0FBFC] text-2xl font-theinhardt hover:text-[#0099CC] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Über uns
          </Link>
          <Link 
            href="#leistungen" 
            className="text-[#E0FBFC] text-2xl font-theinhardt hover:text-[#0099CC] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Unsere Leistungen
          </Link>
          <Link 
            href="https://www.icompetence.de/blog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#E0FBFC] text-2xl font-theinhardt hover:text-[#0099CC] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Unser Blog
          </Link>
          <Link 
            href="https://www.icompetence.de/kontakt" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#E0FBFC] text-2xl font-theinhardt hover:text-[#0099CC] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontaktiere uns
          </Link>
        </div>
      </div>

      {/* Menu Toggle Button - Sticky */}
      <div className={`fixed top-6 right-6 z-50 transition-opacity duration-300 ${
        showMenu || isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <button 
          className="bg-[#161925] p-4 rounded-full flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Full homepage - appears in third state */}
      <div
        className={`transition-all duration-1000 ease-in-out z-10 ${
          animationState >= 2 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white">
          {/* Navigation */}
          <nav className={`transition-all duration-1000 ease-in-out ${
            animationState >= 2 ? "opacity-100" : "opacity-0"
          } flex justify-between items-center p-6`}>
            <div className="flex space-x-2">
              <Link href="https://www.icompetence.de/" target="_blank" rel="noopener noreferrer" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Über uns
              </Link>
              <Link href="#leistungen" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Unsere Leistungen
              </Link>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2"></div>
            <div className="flex space-x-2 h-10">
              <Link href="https://www.icompetence.de/blog" target="_blank" rel="noopener noreferrer" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Unser Blog
              </Link>
              <Link href="https://www.icompetence.de/kontakt" target="_blank" rel="noopener noreferrer" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Kontaktiere uns
              </Link>
            </div>
          </nav>
          {/* Question headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-center max-w-6xl mx-auto text-[#E0FBFC] mt-16 md:mt-24">
            Wie können wir Ihnen weiterhelfen?
          </h2>
          {/* Bottom text */}
          <div className="absolute left-0 w-full flex justify-center items-end pb-10" style={{ bottom: 0 }}>
            <span className="text-8xl text-[#E0FBFC]">Ihr Experience Orchestrator</span>
          </div>
        </div>
        <div
          ref={contentFrameRef}
          className="relative z-10 bg-[#E0FBFC] py-12 rounded-[24px]"
          style={{
            marginTop: '360px',
            marginLeft: `${frameMargin}px`,
            marginRight: `${frameMargin}px`,
            marginBottom: '200px',
            transition: 'margin 0.2s',
          }}
        >
          <div id="leistungen" className="h-full overflow-y-auto px-8">
            <div className="w-[1040px] mx-auto">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ich möchte personalisierte Angebote auf meiner Website anbieten."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 text-4xl font-['EB_Garamond'] italic text-[#7F7F7F]/60 placeholder-[#7F7F7F]/60 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="w-full h-px bg-[#7F7F7F]/20 mb-6"></div>
              <div className="flex flex-wrap gap-x-4 gap-y-6 justify-start">
                {filteredCards.map((card, index) => (
                  <div key={index} className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                    <img 
                      src={card.image}
                      alt={card.title}
                      className="w-full h-[336px] object-cover rounded-[32px]"
                      style={{ marginBottom: 16 }}
                    />
                    <h3 className="text-xl font-medium text-black m-0 font-theinhardt">{card.title}</h3>
                    <p className="text-lg text-[#888] font-normal font-theinhardt">{card.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
