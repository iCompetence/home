"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion"
import { fetchProductsFromSheet, ProductData } from "../lib/googleSheets"

// TiltCard component with the tilt effect
interface TiltCardProps {
  card: ProductData;
  index: number;
  onClick: () => void;
}

function TiltCard({ card, index, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  
  const springValues = {
    damping: 15,
    stiffness: 300,
    mass: 0.5,
  }
  
  const rotateX = useSpring(0, springValues)
  const rotateY = useSpring(0, springValues)
  const scale = useSpring(1, springValues)
  
  const rotateAmplitude = 14
  const scaleOnHover = 1.05

  // Check if we're on desktop/ultra-wide
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || !isDesktop) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - rect.width / 2
    const offsetY = e.clientY - rect.top - rect.height / 2

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude

    rotateX.set(rotationX)
    rotateY.set(rotationY)
  }

  function handleMouseEnter() {
    if (!isDesktop) return
    scale.set(scaleOnHover)
  }

  function handleMouseLeave() {
    if (!isDesktop) return
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="[perspective:800px]">
      <motion.div
        ref={ref}
        onClick={onClick}
        className="group bg-[#E0FBFC] hover:bg-[#161925] rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] xl:rounded-[36px] 2xl:rounded-[40px] flex flex-col w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px] 2xl:max-w-[400px] p-3 sm:p-4 md:p-5 lg:p-6 cursor-pointer hover:shadow-lg transition-all duration-300"
        style={{
          rotateX: isDesktop ? rotateX : 0,
          rotateY: isDesktop ? rotateY : 0,
          scale: isDesktop ? scale : 1,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouse}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          {card.image.includes('drive.google.com') && card.image.includes('/preview') ? (
            // Render video for Google Drive preview links (no autoplay due to CSP restrictions)
            <iframe
              src={card.image}
              className="w-full aspect-square rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[32px] 2xl:rounded-[36px]"
              allow="encrypted-media"
              style={{ border: 'none' }}
              title={card.title}
            />
          ) : (
            // Render image for regular image URLs
            <img 
              src={card.image}
              alt={card.title}
              className="w-full aspect-square object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[32px] 2xl:rounded-[36px]"
              onError={(e) => {
                // Fallback to default image if Google Drive image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80";
              }}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[32px] 2xl:rounded-[36px] flex items-center justify-center">
            <button className="bg-[#E0FBFC] text-[#161925] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-theinhardt font-medium hover:bg-[#0099CC] hover:text-[#E0FBFC] transition-colors">
              Details ansehen
            </button>
          </div>
        </div>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium text-black group-hover:text-[#E0FBFC] m-0 font-theinhardt mb-1 sm:mb-2 transition-colors duration-300">{card.title}</h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#888] group-hover:text-[#E0FBFC] font-normal font-theinhardt transition-colors duration-300">{card.subtitle}</p>
      </motion.div>
    </div>
  )
}

export default function Home() {
  const [animationState, setAnimationState] = useState(0)
  const [bgAnimationState, setBgAnimationState] = useState(0)
  const [backgroundTransition, setBackgroundTransition] = useState(false)
  const [missionWordIndex, setMissionWordIndex] = useState(0)
  const [missionFadingOut, setMissionFadingOut] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentFrameRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const [frameMargin, setFrameMargin] = useState(60)
  const [baseMargin, setBaseMargin] = useState(60)
  const [showMenu, setShowMenu] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showBottomText, setShowBottomText] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [showFloatingSearch, setShowFloatingSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [showOnePager, setShowOnePager] = useState(false)
  const [cards, setCards] = useState<ProductData[]>([])
  const [isLoadingCards, setIsLoadingCards] = useState(true)

  // Mission text split into words
  const missionText = "Unsere Mission ist es, intelligente, autonome KI-Agenten zu entwickeln, die komplexe Herausforderungen lösen, Effizienz steigern und nachhaltigen Mehrwert für unsere Kunden schaffen, stets unter Berücksichtigung höchster Standards für Datenschutz und ethische KI."
  const missionWords = missionText.split(' ')

  // Ensure client-side hydration is complete
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState(1), 1000) // Logo moves up
    const timer2 = setTimeout(() => setAnimationState(2), 2500) // Mission text starts
    const timer3 = setTimeout(() => setAnimationState(3), 2500 + (missionWords.length * 200) + 1000) // Mission text stands for 1 second, then starts fading out
    const bgTimer = setTimeout(() => setBgAnimationState(1), 500)
    const bgTransitionTimer = setTimeout(() => setBackgroundTransition(true), 1000) // Start background transition when logo moves up
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(bgTimer)
      clearTimeout(bgTransitionTimer)
    }
  }, [missionWords.length])

  // Handle mission fade-out trigger
  useEffect(() => {
    if (animationState === 3) {
      setMissionFadingOut(true)
    }
  }, [animationState])

  // Mission text word-by-word animation
  useEffect(() => {
    if (animationState >= 2 && missionWordIndex < missionWords.length) {
      const wordTimer = setTimeout(() => {
        setMissionWordIndex(prev => prev + 1)
      }, 200) // 200ms between each word
      
      return () => clearTimeout(wordTimer)
    }
  }, [animationState, missionWordIndex, missionWords.length])

  useEffect(() => {
    const updateBaseMargin = () => {
      if (typeof window === 'undefined') return;
      let newBaseMargin;
      if (window.innerWidth >= 1536) {
        newBaseMargin = 160; // Ultra-wide (2xl+)
      } else if (window.innerWidth >= 1024) {
        newBaseMargin = 120; // Desktop (lg+)
      } else if (window.innerWidth >= 640) {
        newBaseMargin = 80; // Tablet (sm+)
      } else {
        newBaseMargin = 0; // Mobile
      }
      setBaseMargin(newBaseMargin);
      setFrameMargin(newBaseMargin);
    };
    
    // Only run on client side after hydration
    updateBaseMargin();
    window.addEventListener('resize', updateBaseMargin);
    
    const handleScroll = () => {
      if (!contentFrameRef.current) return;
      const rect = contentFrameRef.current.getBoundingClientRect();
      const initialOffset = 360;
      const distanceFromTop = rect.top;
      let progress = 1 - Math.max(0, Math.min(distanceFromTop / initialOffset, 1));
      // Interpolate margin from baseMargin to 0px
      let newMargin = baseMargin - baseMargin * progress;
      setFrameMargin(newMargin);
      // Show menu when content frame reaches top
      setShowMenu(distanceFromTop <= 0);

      // Check if content frame reaches bottom of viewport
      const windowHeight = window.innerHeight;
      const distanceFromBottom = windowHeight - rect.bottom;
      setIsAtBottom(distanceFromBottom <= 0);

      // Show bottom text only when container is full-width (frameMargin is 0)
      setShowBottomText(newMargin <= 1);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBaseMargin);
    };
  }, [baseMargin]);

  // Fetch products from Google Sheets
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingCards(true);
      try {
        const products = await fetchProductsFromSheet();
        setCards(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoadingCards(false);
      }
    };

    loadProducts();

    // Set up polling to check for updates every hour
    const interval = setInterval(loadProducts, 3600000);

    return () => clearInterval(interval);
  }, []);

  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen text-white">
      {/* Background - Solid base layer */}
      <div className="fixed inset-0 w-full h-full bg-[#0099CC]" />
      {/* Background - Gradient overlay layer */}
      <div className={`fixed inset-0 w-full h-full bg-gradient-to-br from-[#0099cc] to-[#004d66] transition-opacity duration-1000 ease-in-out ${
        backgroundTransition ? 'opacity-100' : 'opacity-0'
      }`} />

      {/* Floating Search Bar */}
      {/* <div className={`fixed top-[4.5rem] sm:top-[5.25rem] md:top-[5.75rem] lg:top-[6.25rem] xl:top-[6.75rem] 2xl:top-[7.5rem] right-4 sm:right-5 md:right-6 lg:right-7 xl:right-8 2xl:right-10 z-30 transition-all duration-300 ${
        showFloatingSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <button
          onClick={() => {
              document.getElementById('produkte')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 bg-[#161925] rounded-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#E0FBFC" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div> */}

      {/* Title */}
      <div className={`fixed inset-0 w-full h-full z-20 pointer-events-none`}>
        <div className={`absolute transition-all duration-1000 ease-in-out animate-fade-in ${
          animationState >= 1 ? 'top-4 sm:top-5 md:top-6 lg:top-7 xl:top-8 2xl:top-10 left-1/2 -translate-x-1/2' : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        }`}>
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-theinhardt transition-opacity duration-0 cursor-pointer pointer-events-auto hover:text-[#E0FBFC] transition-colors ${showMenu ? 'opacity-0' : 'opacity-100'}`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            iCompetence
          </h1>
        </div>
      </div>

      {/* Mission Statement */}
      <div 
        className={`fixed inset-0 w-full h-full z-20 pointer-events-none transition-all duration-1000 ease-in-out ${
          animationState >= 2 && !missionFadingOut ? 'opacity-100' : 'opacity-0'
        }`}
        onTransitionEnd={(e) => {
          // Only trigger when the opacity transition ends and we're fading out
          if (e.propertyName === 'opacity' && missionFadingOut && e.target === e.currentTarget) {
            setAnimationState(4) // Show website after fade-out is complete
          }
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 px-4">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#E0FBFC] text-left leading-relaxed font-['EB_Garamond'] italic">
            {missionWords.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-2 transition-all duration-700 ease-out transform ${
                  index < missionWordIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-[#161925] z-40 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Title in overlay */}
        <div className="absolute top-4 sm:top-5 md:top-6 lg:top-7 xl:top-8 2xl:top-10 left-4 sm:left-5 md:left-6 lg:left-7 xl:left-8 2xl:left-10">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[#E0FBFC] hover:text-[#0099CC] transition-colors"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold font-theinhardt">iCompetence</h1>
          </button>
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
            href="#produkte" 
            className="text-[#E0FBFC] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-theinhardt hover:text-[#0099CC] transition-colors text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Unsere Produkte
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

      {/* Full homepage - appears in fifth state */}
      <div
        className={`transition-all duration-1000 ease-in-out z-10 ${
          animationState >= 4 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="fixed inset-0 w-full h-full z-0 text-white">
          {/* Solid base layer */}
          <div className="absolute inset-0 bg-[#0099CC]" />
          {/* Gradient overlay layer */}
          <div className={`absolute inset-0 bg-gradient-to-br from-[#0099cc] to-[#004d66] transition-opacity duration-1000 ease-in-out ${
            backgroundTransition ? 'opacity-100' : 'opacity-0'
          }`} />
          {/* Navigation */}
          <nav className={`relative z-20 transition-all duration-1000 ease-in-out ${
            animationState >= 4 ? "opacity-100" : "opacity-0"
          } flex justify-between items-center p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12`}>
            <div className="hidden lg:flex flex-wrap justify-start space-x-3">
              <Link href="https://www.icompetence.de/" target="_blank" rel="noopener noreferrer" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-5 xl:px-6 py-2 rounded-full text-lg xl:text-xl font-theinhardt">
                Über uns
              </Link>
              <Link href="#produkte" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-5 xl:px-6 py-2 rounded-full text-lg xl:text-xl font-theinhardt">
                Unsere Produkte
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
          <div className="relative z-20 flex justify-center items-center" style={{ height: 'calc(50vh - 100px)' }}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-center max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-none mx-auto text-[#E0FBFC] 2xl:whitespace-nowrap px-4">
              Wie können wir Ihnen weiterhelfen?
            </h2>
          </div>
          {/* Bottom text */}
          <div className={`absolute left-0 w-full flex justify-center items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 2xl:pb-16 transition-opacity duration-500 ${
            showBottomText ? 'opacity-100' : 'opacity-0'
          }`} style={{ bottom: 0 }}>
            <span className="text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl text-[#E0FBFC] text-center px-4">Ihr Entwickler für proprietäre KI-Agenten</span>
          </div>
        </div>
        <div
          ref={contentFrameRef}
          id="produkte"
          className={`relative z-10 bg-[#E0FBFC] py-12 transition-all duration-300 mt-[50vh] mb-[200px] ${
            showMenu 
              ? isAtBottom 
                ? 'rounded-none' 
                : 'rounded-b-[24px]'
              : 'rounded-[24px]'
          }`}
          style={isMounted ? {
            marginLeft: `${frameMargin}px`,
            marginRight: `${frameMargin}px`,
            transition: 'margin 0.2s',
            minHeight: '100vh'
          } : {
            marginLeft: '60px',
            marginRight: '60px',
            minHeight: '100vh'
          }}
        >
          <div className="h-full overflow-y-auto px-0 lg:px-10">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
              {/* <div className="mb-6">
                <div className="relative" ref={searchBarRef}>
                  <input
                    type="text"
                    placeholder="Ich möchte personalisierte Angebote auf meiner Website anbieten."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      document.getElementById('produkte')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-['EB_Garamond'] italic text-[#161925] placeholder-[#7F7F7F]/60 focus:outline-none bg-transparent truncate"
                  />
                </div>
              </div>
              <div className="w-full h-px bg-[#7F7F7F]/20 mb-6"></div> */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#161925] text-center sm:text-left mb-4 sm:mb-4 lg:mb-6 2xl:mb-6 font-theinhardt ml-0 sm:ml-4 lg:ml-8 2xl:ml-12">Unsere Produkte</h2>
              
              {isLoadingCards ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-[#161925] text-lg sm:text-xl font-theinhardt">Laden...</div>
                </div>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-6 2xl:gap-8 justify-items-center">
                  {cards.map((card, index) => (
                    <TiltCard 
                      key={`${card.title}-${index}`} 
                      card={card}
                      index={index}
                      onClick={() => {
                        setSelectedCard(index);
                        setShowOnePager(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product One-Pager Overlay */}
      {showOnePager && selectedCard !== null && (
        <div className="fixed inset-0 bg-[#161925] z-[100] overflow-y-auto lg:overflow-hidden">
          <div className="min-h-screen lg:h-full flex flex-col lg:justify-center lg:items-center">
                        {/* Back Button - Desktop only */}
            <button
              onClick={() => {
                setShowOnePager(false);
                setSelectedCard(null);
              }}
              className="hidden lg:flex fixed top-4 sm:top-6 md:top-8 lg:top-12 xl:top-16 2xl:top-20 right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 2xl:right-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#E0FBFC] rounded-full items-center justify-center z-[101] hover:bg-[#0099CC] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#161925" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

                        {/* One-Pager Content */}
            <div className="w-full lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 pt-4 sm:pt-6 md:pt-8 lg:py-8 xl:py-12 2xl:py-16 pb-3 sm:pb-6 md:pb-8">
              
                            {/* Navigation Buttons - Mobile/Tablet: at the top */}
              <div className="flex justify-between items-center mb-6 sm:mb-7 md:mb-8 lg:hidden">
                {selectedCard > 0 ? (
                  <button
                    onClick={() => {
                      setSelectedCard(selectedCard - 1);
                    }}
                    className="bg-[#E0FBFC] hover:bg-[#0099CC] rounded-full p-2 sm:p-3 md:p-4 flex items-center gap-1.5 sm:gap-2 md:gap-3 transition-colors group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-[#161925] group-hover:text-[#E0FBFC]">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                      <span className="text-[#161925] group-hover:text-[#E0FBFC] text-xs sm:text-sm md:text-base font-theinhardt font-medium whitespace-nowrap">
                        <span className="sm:hidden">Vorherige</span>
                        <span className="hidden sm:inline">Vorheriges Produkt</span>
                      </span>
                      {cards[selectedCard - 1].image.includes('drive.google.com') ? (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#0099CC] rounded-full flex items-center justify-center">
                          <span className="text-[#E0FBFC] text-xs font-bold">
                            {cards[selectedCard - 1].title.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <img 
                          src={cards[selectedCard - 1].image}
                          alt={cards[selectedCard - 1].title}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover rounded-full"
                        />
                      )}
                    </div>
                  </button>
                ) : (
                  <div></div>
                )}

                {/* Back Button - Mobile/Tablet: always centered */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => {
                      setShowOnePager(false);
                      setSelectedCard(null);
                    }}
                    className="bg-[#E0FBFC] hover:bg-[#0099CC] rounded-full p-2 sm:p-3 md:p-4 flex items-center justify-center transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#161925" className="w-4 h-4 sm:w-5 sm:h-5 hover:stroke-[#E0FBFC] transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedCard < cards.length - 1 ? (
                  <button
                    onClick={() => {
                      setSelectedCard(selectedCard + 1);
                    }}
                    className="bg-[#E0FBFC] hover:bg-[#0099CC] rounded-full p-2 sm:p-3 md:p-4 flex items-center gap-1.5 sm:gap-2 md:gap-3 transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                      {cards[selectedCard + 1].image.includes('drive.google.com') ? (
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-[#0099CC] rounded-full flex items-center justify-center">
                          <span className="text-[#E0FBFC] text-xs font-bold">
                            {cards[selectedCard + 1].title.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <img 
                          src={cards[selectedCard + 1].image}
                          alt={cards[selectedCard + 1].title}
                          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover rounded-full"
                        />
                      )}
                      <span className="text-[#161925] group-hover:text-[#E0FBFC] text-xs sm:text-sm md:text-base font-theinhardt font-medium whitespace-nowrap">
                        <span className="sm:hidden">Nächste</span>
                        <span className="hidden sm:inline">Nächstes Produkt</span>
                      </span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-[#161925] group-hover:text-[#E0FBFC]">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 xl:gap-16 2xl:gap-24 h-full items-start">
                {/* Left Column - Image (and Benefits on desktop) */}
                <div>
                  {cards[selectedCard].image.includes('drive.google.com') && cards[selectedCard].image.includes('/preview') ? (
                    // Render video for Google Drive preview links (no autoplay due to CSP restrictions)
                    <iframe
                      src={cards[selectedCard].image}
                      className="w-full aspect-square rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] xl:rounded-[28px] 2xl:rounded-[32px] mb-4 sm:mb-5 md:mb-6 lg:mb-4 xl:mb-5 2xl:mb-6"
                      allow="encrypted-media"
                      style={{ border: 'none' }}
                      title={cards[selectedCard].title}
                    />
                  ) : (
                    // Render image for regular image URLs
                    <img 
                      src={cards[selectedCard].image}
                      alt={cards[selectedCard].title}
                      className="w-full aspect-square object-cover rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] xl:rounded-[28px] 2xl:rounded-[32px] mb-4 sm:mb-5 md:mb-6 lg:mb-4 xl:mb-5 2xl:mb-6"
                      onError={(e) => {
                        // Fallback to default image if Google Drive image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  )}
                  
                  {/* Benefits - Desktop only */}
                  <div className="hidden lg:block bg-[#0099CC] p-4 rounded-none">
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-bold text-[#E0FBFC] font-['EB_Garamond'] italic mb-1 sm:mb-1.5 md:mb-2">
                      Ihr Vorteil
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl text-[#E0FBFC] font-['EB_Garamond'] italic leading-relaxed">
                      {cards[selectedCard].benefits}
                    </p>
                  </div>
                </div>

                {/* Right Column - Title, Subtitle, Description, Benefits (mobile/tablet), and Contact */}
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-6xl font-bold text-[#E0FBFC] font-theinhardt mb-1 sm:mb-1.5 md:mb-2">
                    {cards[selectedCard].title}
                  </h1>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl text-[#E0FBFC] opacity-80 font-theinhardt mb-4 sm:mb-5 md:mb-6">
                    {cards[selectedCard].subtitle}
                  </p>
                  
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl text-[#E0FBFC] font-theinhardt mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                    {cards[selectedCard].description}
                  </p>

                  {/* Benefits - Mobile/Tablet only */}
                  <div className="lg:hidden bg-[#0099CC] p-4 rounded-none mb-4 sm:mb-5 md:mb-6">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#E0FBFC] font-['EB_Garamond'] italic mb-1 sm:mb-1.5 md:mb-2">
                      Ihr Vorteil
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#E0FBFC] font-['EB_Garamond'] italic leading-relaxed">
                      {cards[selectedCard].benefits}
                    </p>
                  </div>

                  {/* Contact Buttons */}
                  <div className="mt-4 sm:mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Additional CTA Button - Show only if link exists */}
                    {cards[selectedCard].link && (
                      <Link 
                        href={cards[selectedCard].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-[#0099CC] text-[#E0FBFC] hover:bg-[#161925] hover:text-[#E0FBFC] px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-10 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-3.5 2xl:py-5 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-theinhardt transition-colors text-center"
                      >
                        Mehr erfahren
                      </Link>
                    )}
                    
                    {/* Contact Button */}
                    <Link 
                      href="https://www.icompetence.de/kontakt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-[#E0FBFC] text-[#161925] hover:bg-[#0099CC] hover:text-[#E0FBFC] px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-10 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-3.5 2xl:py-5 rounded-full text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-3xl font-theinhardt transition-colors text-center"
                    >
                      Kontaktiere uns
                    </Link>
                  </div>
                </div>
              </div>


            </div>

            {/* Navigation Buttons - Desktop: fixed at bottom right */}
            <div className="hidden lg:flex fixed bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 xl:bottom-16 2xl:bottom-20 right-4 sm:right-6 md:right-8 lg:right-12 xl:right-16 2xl:right-20 gap-4 z-[101]">
              {/* Previous Service Button - Show from second item onwards */}
              {selectedCard > 0 && (
                <button
                  onClick={() => {
                    setSelectedCard(selectedCard - 1);
                  }}
                  className="bg-[#E0FBFC] hover:bg-[#0099CC] rounded-full p-3 sm:p-4 flex items-center gap-2 sm:gap-3 transition-colors group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-[#161925] group-hover:text-[#E0FBFC]">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[#161925] group-hover:text-[#E0FBFC] text-xs sm:text-sm md:text-base font-theinhardt font-medium whitespace-nowrap">
                      Vorheriges Produkt
                    </span>
                    {cards[selectedCard - 1].image.includes('drive.google.com') ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#0099CC] rounded-full flex items-center justify-center">
                        <span className="text-[#E0FBFC] text-sm font-bold">
                          {cards[selectedCard - 1].title.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <img 
                        src={cards[selectedCard - 1].image}
                        alt={cards[selectedCard - 1].title}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-full"
                      />
                    )}
                  </div>
                </button>
              )}

              {/* Next Service Button - Hide on last item */}
              {selectedCard < cards.length - 1 && (
                <button
                  onClick={() => {
                    setSelectedCard(selectedCard + 1);
                  }}
                  className="bg-[#E0FBFC] hover:bg-[#0099CC] rounded-full p-3 sm:p-4 flex items-center gap-2 sm:gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {cards[selectedCard + 1].image.includes('drive.google.com') ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#0099CC] rounded-full flex items-center justify-center">
                        <span className="text-[#E0FBFC] text-sm font-bold">
                          {cards[selectedCard + 1].title.charAt(0)}
                        </span>
                      </div>
                    ) : (
                      <img 
                        src={cards[selectedCard + 1].image}
                        alt={cards[selectedCard + 1].title}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-full"
                      />
                    )}
                    <span className="text-[#161925] group-hover:text-[#E0FBFC] text-xs sm:text-sm md:text-base font-theinhardt font-medium whitespace-nowrap">
                      Nächstes Produkt
                    </span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 text-[#161925] group-hover:text-[#E0FBFC]">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
