"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion"

// TiltCard component with the tilt effect
interface TiltCardProps {
  card: {
    title: string;
    subtitle: string;
    image: string;
    description: string;
    features: string[];
    benefits: string;
  };
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
        <img 
          src={card.image}
          alt={card.title}
          className="w-full aspect-square object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] xl:rounded-[32px] 2xl:rounded-[36px] mb-3 sm:mb-4 md:mb-5 lg:mb-6"
        />
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-medium text-black group-hover:text-[#E0FBFC] m-0 font-theinhardt mb-1 sm:mb-2 transition-colors duration-300">{card.title}</h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-[#888] group-hover:text-[#E0FBFC] font-normal font-theinhardt transition-colors duration-300">{card.subtitle}</p>
      </motion.div>
    </div>
  )
}

export default function Home() {
  const [animationState, setAnimationState] = useState(0)
  const [bgAnimationState, setBgAnimationState] = useState(0)
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

  // Ensure client-side hydration is complete
  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  const cards = [
    {
      title: "Personalization Injection",
      subtitle: "Lucky Bike, pepXpress",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Steigern Sie Ihre Conversion-Rate durch intelligente Personalisierung. Unsere AI-gestützte Lösung analysiert Nutzerverhalten in Echtzeit und passt Inhalte dynamisch an.",
      features: [
        "Real-time Nutzeranalyse",
        "Dynamische Content-Anpassung", 
        "A/B Testing Integration",
        "Performance Analytics"
      ],
      benefits: "Bis zu 35% höhere Conversion-Rate und verbesserte User Experience"
    },
    {
      title: "Data Visualization",
      subtitle: "DataCorp, InsightX",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Verwandeln Sie komplexe Daten in verständliche, interaktive Visualisierungen. Unsere Dashboards ermöglichen datengetriebene Entscheidungen auf allen Unternehmensebenen.",
      features: [
        "Interactive Dashboards",
        "Real-time Data Streaming",
        "Custom Visualizations",
        "Multi-source Integration"
      ],
      benefits: "Schnellere Entscheidungsfindung und verbesserte Datenverständlichkeit"
    },
    {
      title: "AI Automation",
      subtitle: "AutoAI, NextGen",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Automatisieren Sie repetitive Aufgaben mit intelligenten AI-Workflows. Sparen Sie Zeit und Ressourcen durch maßgeschneiderte Automatisierungslösungen.",
      features: [
        "Workflow Automation",
        "Intelligent Task Management",
        "Process Optimization",
        "Integration APIs"
      ],
      benefits: "Bis zu 60% Zeitersparnis und reduzierte Fehlerquote"
    },
    {
      title: "Cloud Integration",
      subtitle: "Cloudify, SkyNet",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Nahtlose Integration Ihrer bestehenden Systeme in die Cloud. Skalierbare, sichere und kosteneffiziente Cloud-Lösungen für Ihr Unternehmen.",
      features: [
        "Multi-Cloud Strategy",
        "Data Migration",
        "Security Implementation",
        "Cost Optimization"
      ],
      benefits: "Verbesserte Skalierbarkeit und reduzierte IT-Kosten"
    },
    {
      title: "E-Commerce Boost",
      subtitle: "ShopMaster, QuickCart",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Optimieren Sie Ihren Online-Shop für maximale Performance. Von der User Experience bis zur Conversion-Optimierung - wir steigern Ihren E-Commerce Erfolg.",
      features: [
        "Conversion Optimization",
        "Performance Tuning",
        "Mobile-first Design",
        "Analytics Integration"
      ],
      benefits: "Höhere Verkaufszahlen und verbesserte Kundenzufriedenheit"
    },
    {
      title: "Customer Insights",
      subtitle: "InsightPro, UserSense",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Verstehen Sie Ihre Kunden besser durch fortgeschrittene Analytics. Unsere Insights helfen Ihnen, zielgerichtete Marketingstrategien zu entwickeln.",
      features: [
        "Customer Journey Mapping",
        "Behavioral Analytics",
        "Segmentation Tools",
        "Predictive Modeling"
      ],
      benefits: "Verbesserte Kundenbindung und zielgerichtetes Marketing"
    },
    {
      title: "Marketing Analytics",
      subtitle: "MarketGenius, AdScope",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Messen und optimieren Sie Ihre Marketing-Performance in Echtzeit. Unsere Analytics-Lösungen geben Ihnen die Insights, die Sie für erfolgreiche Kampagnen benötigen.",
      features: [
        "Campaign Performance Tracking",
        "ROI Analysis",
        "Attribution Modeling",
        "Automated Reporting"
      ],
      benefits: "Höhere Marketing-Effizienz und besserer ROI"
    },
    {
      title: "Workflow Automation",
      subtitle: "FlowPro, TaskPilot",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Streamlinen Sie Ihre Geschäftsprozesse mit intelligenten Workflows. Automatisieren Sie komplexe Abläufe und verbessern Sie die Effizienz Ihres Teams.",
      features: [
        "Process Automation",
        "Task Management",
        "Team Collaboration",
        "Performance Monitoring"
      ],
      benefits: "Verbesserte Produktivität und reduzierte Bearbeitungszeiten"
    },
    {
      title: "Realtime Reporting",
      subtitle: "LiveStats, DashNow",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      description: "Erhalten Sie sofortige Einblicke in Ihre Geschäftsmetriken. Unsere Echtzeit-Reporting-Lösungen halten Sie immer über wichtige KPIs informiert.",
      features: [
        "Real-time Dashboards",
        "Automated Alerts",
        "Custom Reports",
        "Data Export Options"
      ],
      benefits: "Schnellere Reaktionszeiten und datenbasierte Entscheidungen"
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
      {/* <div className={`fixed top-[4.5rem] sm:top-[5.25rem] md:top-[5.75rem] lg:top-[6.25rem] xl:top-[6.75rem] 2xl:top-[7.5rem] right-4 sm:right-5 md:right-6 lg:right-7 xl:right-8 2xl:right-10 z-30 transition-all duration-300 ${
        showFloatingSearch ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <button
          onClick={() => {
            document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' });
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
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif text-center max-w-2xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-none mx-auto text-[#E0FBFC] mt-4 sm:mt-6 md:mt-12 lg:mt-20 xl:mt-24 2xl:mt-32 2xl:whitespace-nowrap">
            Wie können wir Ihnen weiterhelfen?
          </h2>
          {/* Bottom text */}
          <div className={`absolute left-0 w-full flex justify-center items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 2xl:pb-16 transition-opacity duration-500 ${
            showBottomText ? 'opacity-100' : 'opacity-0'
          }`} style={{ bottom: 0 }}>
            <span className="text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl text-[#E0FBFC] text-center px-4">Ihr Experience Orchestrator</span>
          </div>
        </div>
        <div
          ref={contentFrameRef}
          id="leistungen"
          className={`relative z-10 bg-[#E0FBFC] py-12 transition-all duration-300 mt-[160px] sm:mt-[180px] md:mt-[220px] lg:mt-[360px] 2xl:mt-[480px] mb-[200px] ${
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
                      document.getElementById('leistungen')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 2xl:py-7 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-['EB_Garamond'] italic text-[#161925] placeholder-[#7F7F7F]/60 focus:outline-none bg-transparent truncate"
                  />
                </div>
              </div>
              <div className="w-full h-px bg-[#7F7F7F]/20 mb-6"></div> */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#161925] text-center sm:text-left mb-8 sm:mb-10 lg:mb-12 2xl:mb-16 font-theinhardt ml-0 sm:ml-4 lg:ml-8 2xl:ml-12">Unsere Leistungen</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-6 2xl:gap-8 justify-items-center">
                {cards.map((card, index) => (
                  <TiltCard 
                    key={index} 
                    card={card}
                    index={index}
                    onClick={() => {
                      setSelectedCard(index);
                      setShowOnePager(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product One-Pager Overlay */}
      {showOnePager && selectedCard !== null && (
        <div className="fixed inset-0 bg-[#E0FBFC] z-[100] overflow-y-auto">
          <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
            {/* Back Button */}
            <button
              onClick={() => {
                setShowOnePager(false);
                setSelectedCard(null);
              }}
              className="fixed top-4 sm:top-6 md:top-8 lg:top-12 xl:top-16 2xl:top-20 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 2xl:left-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#161925] rounded-full flex items-center justify-center z-[101] hover:bg-[#0099CC] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#E0FBFC" className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* One-Pager Content */}
            <div className="max-w-4xl mx-auto pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 2xl:pt-36">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20">
                {/* Left Column - Image and Title */}
                <div>
                  <img 
                    src={cards[selectedCard].image}
                    alt={cards[selectedCard].title}
                    className="w-full aspect-square object-cover rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[32px] xl:rounded-[36px] 2xl:rounded-[40px] mb-6 sm:mb-8"
                  />
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#161925] font-theinhardt mb-3 sm:mb-4">
                    {cards[selectedCard].title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-[#888] font-theinhardt">
                    {cards[selectedCard].subtitle}
                  </p>
                </div>

                {/* Right Column - Description and Details */}
                <div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-[#161925] font-theinhardt mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                    {cards[selectedCard].description}
                  </p>

                  {/* Features */}
                  <div className="mb-8 sm:mb-10 md:mb-12">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-[#161925] font-theinhardt mb-4 sm:mb-6">
                      Features
                    </h3>
                    <ul className="space-y-3 sm:space-y-4">
                      {cards[selectedCard].features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 sm:w-3 sm:h-3 bg-[#0099CC] rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#161925] font-theinhardt">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="bg-[#0099CC] p-6 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[24px] md:rounded-[28px]">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#E0FBFC] font-theinhardt mb-4 sm:mb-6">
                      Ihr Vorteil
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#E0FBFC] font-theinhardt leading-relaxed">
                      {cards[selectedCard].benefits}
                    </p>
                  </div>

                  {/* Contact Button */}
                  <div className="mt-8 sm:mt-10 md:mt-12">
                    <Link 
                      href="https://www.icompetence.de/kontakt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-[#161925] text-[#E0FBFC] hover:bg-[#0099CC] px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-full text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-theinhardt transition-colors"
                    >
                      Jetzt anfragen
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
