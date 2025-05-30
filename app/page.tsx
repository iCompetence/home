"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [animationState, setAnimationState] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const contentFrameRef = useRef<HTMLDivElement>(null)
  const [frameMargin, setFrameMargin] = useState(160)

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState(1), 1000)
    const timer2 = setTimeout(() => setAnimationState(2), 3000)
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
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white">
      {/* Full homepage - appears in third state */}
      <div
        className={`transition-all duration-1000 ease-in-out ${
          animationState >= 2 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="fixed inset-0 w-full h-full z-0 bg-gradient-to-br from-[#0099cc] to-[#004d66] text-white">
          {/* Title */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <h1 className="text-4xl md:text-3xl font-bold font-theinhardt">iCompetence</h1>
          </div>
          {/* Navigation */}
          <nav className="flex justify-between items-center p-6">
            <div className="flex space-x-2">
              <Link href="https://www.icompetence.de/" target="_blank" rel="noopener noreferrer" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
                Über uns
              </Link>
              <Link href="https://www.icompetence.de/" target="_blank" rel="noopener noreferrer" className="border border-[#E0FBFC] text-[#E0FBFC] hover:bg-[#E0FBFC] hover:text-[#0099cc] px-4 py-2 rounded-full text-base font-theinhardt">
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
          <div className="h-full overflow-y-auto px-8">
            <div className="w-[1040px] mx-auto">
              <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
                {/* Card 1 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Personalization Injection" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">Personalization Injection</h3>
                  <p className="text-lg text-[#888] font-semibold">Lucky Bike, pepXpress</p>
                </div>
                {/* Card 2 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Data Visualization" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">Data Visualization</h3>
                  <p className="text-lg text-[#888] font-semibold">DataCorp, InsightX</p>
                </div>
                {/* Card 3 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="AI Automation" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">AI Automation</h3>
                  <p className="text-lg text-[#888] font-semibold">AutoAI, NextGen</p>
                </div>
                {/* Card 4 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Cloud Integration" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">Cloud Integration</h3>
                  <p className="text-lg text-[#888] font-semibold">Cloudify, SkyNet</p>
                </div>
                {/* Card 5 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="E-Commerce Boost" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">E-Commerce Boost</h3>
                  <p className="text-lg text-[#888] font-semibold">ShopMaster, QuickCart</p>
                </div>
                {/* Card 6 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Customer Insights" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">Customer Insights</h3>
                  <p className="text-lg text-[#888] font-semibold">InsightPro, UserSense</p>
                </div>
                {/* Card 7 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Marketing Analytics" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">Marketing Analytics</h3>
                  <p className="text-lg text-[#888] font-semibold">MarketGenius, AdScope</p>
                </div>
                {/* Card 8 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Workflow Automation" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">Workflow Automation</h3>
                  <p className="text-lg text-[#888] font-semibold">FlowPro, TaskPilot</p>
                </div>
                {/* Card 9 */}
                <div className="bg-[#E0FBFC] rounded-[40px] flex flex-col w-[336px] mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80" 
                    alt="Realtime Reporting" 
                    className="w-full h-[336px] object-cover rounded-[32px]" style={{ marginBottom: 16 }}
                  />
                  <h3 className="text-xl font-bold text-black m-0">Realtime Reporting</h3>
                  <p className="text-lg text-[#888] font-semibold">LiveStats, DashNow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
