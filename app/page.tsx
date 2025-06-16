"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [animationState, setAnimationState] = useState(0)
  const [bgAnimationState, setBgAnimationState] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentFrameRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [frameMargin, setFrameMargin] = useState(160)
  const [showMenu, setShowMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showBottomText, setShowBottomText] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [showFloatingSearch, setShowFloatingSearch] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState(1), 1000)
    const timer2 = setTimeout(() => setAnimationState(2), 2000)
    const bgTimer = setTimeout(() => setBgAnimationState(1), 500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(bgTimer)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!contentFrameRef.current || !searchBarRef.current) return;
      const rect = contentFrameRef.current.getBoundingClientRect();
      const searchRect = searchBarRef.current.getBoundingClientRect();
      const initialOffset = 360;
      const distanceFromTop = rect.top;
      let progress = 1 - Math.max(0, Math.min(distanceFromTop / initialOffset, 1));
      // Interpolate margin from 160px to 0px
      let newMargin = 160 - 160 * progress;
      setFrameMargin(newMargin);
      // Show menu when content frame reaches top
      setShowMenu(distanceFromTop <= 0);

      // Check if search bar is out of view
      setShowFloatingSearch(searchRect.bottom < 0);

      // Check if content frame reaches bottom of viewport
      const windowHeight = window.innerHeight;
      const distanceFromBottom = windowHeight - rect.bottom;
      setIsAtBottom(distanceFromBottom <= 0);

      // Check if scrolled to bottom
      const scrollContainer = contentFrameRef.current.querySelector('.h-full.overflow-y-auto');
      if (scrollContainer) {
        const isAtBottom = 
          Math.abs(
            scrollContainer.scrollHeight - 
            scrollContainer.scrollTop - 
            scrollContainer.clientHeight
          ) < 1;
        setShowBottomText(isAtBottom);
      }
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
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-[#0099cc] to-[#004d66]" />

      {/* Floating Search Bar */}
      <div className={`fixed top-4 sm:top-5 md:top-6 lg:top-7 xl:top-8 2xl:top-10 right-8 sm:right-12 md:right-16 lg:right-20 xl:right-24 2xl:right-32 z-30 transition-all duration-300 ${
        showFloatingSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <button
          onClick={() => {
            document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="border border-[#161925] text-[#161925] hover:bg-[#161925] hover:text-[#E0FBFC] px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-theinhardt transition-colors mr-2"
        >
          Suchen
        </button>
      </div>

      {/* Title */}
      <div className={`fixed inset-0 w-full h-full z-20 pointer-events-none`}>
        <div className={`absolute transition-all duration-1000 ease-in-out animate-fade-in ${
          animationState >= 1 ? 'top-6 left-1/2 -translate-x-1/2' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-theinhardt transition-opacity duration-0 ${showMenu ? 'opacity-0' : 'opacity-100'}`}>iCompetence</h1>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-[#161925] z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Title in overlay */}
        <div className="absolute top-4 sm:top-5 md:top-6 lg:top-7 xl:top-8 2xl:top-10 left-4 sm:left-5 md:left-6 lg:left-7 xl:left-8 2xl:left-10">
          <Link 
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#E0FBFC] hover:text-[#0099CC] transition-colors"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold font-theinhardt">iCompetence</h1>
          </Link>
        </div>
        
        <div className="h-full flex flex-col items-center justify-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 xl:space-y-12 2xl:space-y-16 px-4">
          <Link 
            href="https://www.icompetence.de/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#E0FBFC] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-theinhardt hover:text-[#0099CC] transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Über uns
          </Link>
          <Link 
            href="#leistungen" 
            className="text-[#E0FBFC] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-theinhardt hover:text-[#0099CC] transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Unsere Leistungen
          </Link>
          <Link 
            href="https://www.icompetence.de/blog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#E0FBFC] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-theinhardt hover:text-[#0099CC] transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Unser Blog
          </Link>
          <Link 
            href="https://www.icompetence.de/kontakt" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#E0FBFC] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-theinhardt hover:text-[#0099CC] transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Kontaktiere uns
          </Link>
          <Link 
            href="https://www.icompetence.de/impressum" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#E0FBFC] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-theinhardt hover:text-[#0099CC] transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Impressum & Datenschutz
          </Link>
        </div>
      </div>

      {/* Menu Toggle Button - Sticky */}
      <div className={`fixed top-4 sm:top-5 md:top-6 lg:top-7 xl:top-8 2xl:top-10 right-4 sm:right-5 md:right-6 lg:right-7 xl:right-8 2xl:right-10 z-50 transition-opacity duration-300 ${
        showMenu || isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <button 
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-[#161925] rounded-full flex items-center justify-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#E0FBFC" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#E0FBFC" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8">
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
          } flex justify-between items-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12`}>
            <div className="hidden lg:flex flex-wrap justify-start space-x-3">
              <Link href="https://www.icompetence.de/" target="_blank" rel="noopener noreferrer" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-5 xl:px-6 py-2 rounded-full text-lg xl:text-xl font-theinhardt">
                Über uns
              </Link>
              <Link href="#leistungen" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-5 xl:px-6 py-2 rounded-full text-lg xl:text-xl font-theinhardt">
                Unsere Leistungen
              </Link>
            </div>
            <div className="hidden lg:block absolute left-1/2 -translate-x-1/2"></div>
            <div className="flex justify-end space-x-3 h-10 lg:h-11 xl:h-12 items-center ml-auto">
              <Link href="https://www.icompetence.de/blog" target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-5 xl:px-6 py-2 rounded-full text-lg xl:text-xl font-theinhardt">
                Unser Blog
              </Link>
              <Link href="https://www.icompetence.de/kontakt" target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex bg-[#E0FBFC] text-[#0099CC] hover:bg-[#161925] hover:text-[#E0FBFC] px-5 xl:px-6 py-2 rounded-full text-lg xl:text-xl font-theinhardt">
                Kontaktiere uns
              </Link>
              <button 
                className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 bg-[#161925] rounded-full flex items-center justify-center ml-2 sm:ml-3 md:ml-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#E0FBFC" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </nav>
          {/* Question headline */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-center max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-none mx-auto text-[#E0FBFC] mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32 2xl:whitespace-nowrap">
            Wie können wir Ihnen weiterhelfen?
          </h2>
          {/* Bottom text */}
          <div className={`absolute left-0 w-full flex justify-center items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 2xl:pb-16 transition-opacity duration-500 ${
            showBottomText ? 'opacity-100' : 'opacity-0'
          }`} style={{ bottom: 0 }}>
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-[#E0FBFC] text-center px-4">Ihr Experience Orchestrator</span>
          </div>
        </div>
        <div
          ref={contentFrameRef}
          id="leistungen"
          className={`relative z-10 bg-[#E0FBFC] py-12 transition-all duration-300 mt-[360px] 2xl:mt-[480px] mb-[200px] ${
            showMenu 
              ? isAtBottom 
                ? 'rounded-none' 
                : 'rounded-b-[24px]'
              : 'rounded-[24px]'
          }`}
          style={{
            marginLeft: `${frameMargin}px`,
            marginRight: `${frameMargin}px`,
            transition: 'margin 0.2s',
            minHeight: '100vh'
          }}
        >
          <div className="h-full overflow-y-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
              <div className="mb-6">
                <div className="relative" ref={searchBarRef}>
                  <input
                    type="text"
                    placeholder="Ich möchte personalisierte Angebote auf meiner Website anbieten."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-['EB_Garamond'] italic text-[#161925] placeholder-[#7F7F7F]/60 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className="w-full h-px bg-[#7F7F7F]/20 mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8 justify-items-center">
                {filteredCards.map((card, index) => (
                  <div key={index} className="bg-[#E0FBFC] rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] xl:rounded-[36px] 2xl:rounded-[40px] flex flex-col w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px] 2xl:max-w-[400px] p-3 sm:p-4 md:p-5 lg:p-6">
                    <img 
                      src={card.image}
                      alt={card.title}
                      className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[280px] xl:h-[320px] 2xl:h-[360px] object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[32px] 2xl:rounded-[36px] mb-3 sm:mb-4 md:mb-5 lg:mb-6"
                    />
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium text-black m-0 font-theinhardt mb-1 sm:mb-2">{card.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#888] font-normal font-theinhardt">{card.subtitle}</p>
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
