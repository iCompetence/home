'use client'

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from './ScrollAnimations';

interface CarouselItem {
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  color?: string;
  bgColor?: string;
  link?: string;
  linkText?: string;
}

interface CarouselProps {
  /** Section title */
  title: string;
  /** Optional subline text */
  subline?: string;
  /** Array of carousel items */
  items: CarouselItem[];
  /** Section ID for scrolling */
  id?: string;
  /** Number of slides to show on desktop */
  slidesToShowDesktop?: number;
  /** Number of slides to show on mobile */
  slidesToShowMobile?: number;
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  /** Custom item height */
  itemHeight?: string;
}

export const Carousel = ({
  title,
  subline,
  items,
  id = "carousel-section",
  slidesToShowDesktop = 2,
  slidesToShowMobile = 1,
  className = "",
  animationType = "fadeInUp",
  itemHeight = "29.5rem"
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(slidesToShowMobile);
  const [isMobile, setIsMobile] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>('auto');
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  // Add peek amount to show partial next slide
  const peekAmount = 0.2; // Show 20% of next card

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSlidesToShow(mobile ? slidesToShowMobile : slidesToShowDesktop);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShowDesktop, slidesToShowMobile]);

  // Calculate max height for consistent card heights
  useEffect(() => {
    const calculateMaxHeight = () => {
      // First pass - let cards render with auto height
      cardRefs.current.forEach(ref => {
        if (ref) {
          ref.style.height = 'auto';
          ref.style.minHeight = 'auto';
        }
      });

      // Wait for DOM to update and measure
      setTimeout(() => {
        const heights = cardRefs.current
          .filter(ref => ref !== null)
          .map(ref => ref!.offsetHeight);

        if (heights.length > 0) {
          const max = Math.max(...heights);
          // Apply the max height
          setMaxHeight(`${max}px`);
          cardRefs.current.forEach(ref => {
            if (ref) {
              ref.style.height = `${max}px`;
              ref.style.minHeight = `${max}px`;
            }
          });
        }
      }, 50);
    };

    // Run after initial render
    const timer = setTimeout(calculateMaxHeight, 100);
    window.addEventListener('resize', calculateMaxHeight, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, [items]);

  const totalSlides = items.length;
  const slidesToShowWithPeek = slidesToShow + peekAmount;
  const maxSlide = Math.max(0, totalSlides - slidesToShow);

  const nextSlide = () => {
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Touch/mouse drag handlers for all devices
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX);
    setPrevTranslate(currentSlide);
    trackRef.current.style.transition = 'none';
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const x = e.pageX;
    const walk = (startX - x) / containerRef.current.offsetWidth;
    const newTranslate = Math.max(0, Math.min(maxSlide, prevTranslate + walk));
    setCurrentTranslate(newTranslate);
  };

  const handlePointerUp = () => {
    if (!isDragging || !trackRef.current) return;

    setIsDragging(false);

    // Snap to nearest slide with threshold
    const moveThreshold = 0.3;
    const diff = currentTranslate - prevTranslate;

    let newSlide;
    if (Math.abs(diff) < moveThreshold) {
      // If didn't drag far enough, snap back to original position
      newSlide = prevTranslate;
    } else if (diff > 0) {
      // Dragged right (next slide)
      newSlide = Math.ceil(currentTranslate);
    } else {
      // Dragged left (previous slide)
      newSlide = Math.floor(currentTranslate);
    }

    // Ensure within bounds
    newSlide = Math.max(0, Math.min(maxSlide, newSlide));

    setCurrentSlide(newSlide);
    setCurrentTranslate(newSlide);
    trackRef.current.style.transition = 'transform 0.3s ease-out';
  };

  const handlePointerLeave = () => {
    if (isDragging) {
      handlePointerUp();
    }
  };

  // Sync currentTranslate with currentSlide when not dragging
  useEffect(() => {
    if (!isDragging) {
      setCurrentTranslate(currentSlide);
    }
  }, [currentSlide, isDragging]);

  return (
    <AnimatedSection 
      id={id}
      className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto py-24">
        <div className="max-w-6xl mx-auto" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="mobile-carousel-h2" style={{
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: subline ? '1.5rem' : '0'
            }}>
              {title}
            </h2>
            {subline && (
              <p className="mobile-carousel-subline" style={{
                color: 'var(--gray-light)',
                fontSize: '18px',
                lineHeight: '160%',
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                {subline}
              </p>
            )}
          </div>
          
          {/* Carousel Container */}
          <div 
            className="custom-carousel" 
            style={{ overflow: 'visible' }}
            ref={containerRef}
          >
            {/* Carousel Content */}
            <div className="carousel-container" style={{ overflow: 'visible' }}>
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(calc(-${currentTranslate} * ((100% - ${(slidesToShow - 1) * 16}px) / ${slidesToShow} + 16px)))`,
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  gap: '16px',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none'
                }}
                ref={trackRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
              >
                {items.map((item, index) => (
                  <div 
                    key={index}
                    style={{ 
                      flex: `0 0 calc((100% - ${(slidesToShow - 1) * 16}px) / ${slidesToShow})`,
                      minWidth: 0
                    }}
                  >
                    <div
                      className="carousel-card border border-white/10 rounded-none px-6 sm:px-8 pt-6 sm:pt-8 pb-10 sm:pb-14 hover:bg-white/[0.02] transition-colors duration-200"
                      style={{
                        height: maxHeight,
                        minHeight: maxHeight
                      }}
                      ref={el => { cardRefs.current[index] = el; }}
                    >
                      <div className="flex items-start gap-4 sm:gap-8" style={{ height: '100%' }}>
                        <span
                          className="mobile-carousel-number"
                          style={{
                            color: 'var(--gray-light)',
                            fontSize: '14px',
                            fontWeight: '500',
                            minWidth: '40px',
                            paddingTop: '2px'
                          }}
                        >
                          ({String(index + 1).padStart(2, '0')})
                        </span>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                          {/* Icon removed */}
                          <h3
                            className="mobile-carousel-title"
                            style={{
                              color: 'var(--gray-white)',
                              fontSize: '24px',
                              lineHeight: '110%',
                              marginBottom: '1rem'
                            }}
                          >
                            {item.title}
                          </h3>
                          <p
                            className="mobile-carousel-desc"
                            style={{
                              color: 'var(--gray-light)',
                              fontSize: '18px',
                              lineHeight: '160%',
                              maxWidth: '400px'
                            }}
                          >
                            {item.description}
                          </p>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-2.5 rounded-full hover:opacity-90 transition-all duration-300"
                              style={{
                                display: 'inline-block',
                                marginTop: 'auto',
                                paddingTop: '24px',
                                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                                color: 'var(--gray-black)',
                                fontSize: '14px',
                                fontWeight: '500',
                                textDecoration: 'none',
                                alignSelf: 'flex-start'
                              }}
                            >
                              {item.linkText || 'Learn more'}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="relative">
              <button
                className="carousel-arrow-bottom-left cursor-pointer"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                style={{
                  position: 'absolute',
                  bottom: '-44px',
                  left: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  zIndex: 2,
                  transition: 'all 0.3s ease',
                  cursor: currentSlide === 0 ? 'default' : 'pointer',
                  background: 'none',
                  border: 'none',
                  opacity: currentSlide === 0 ? 0.3 : 1
                }}
              >
                <ChevronLeft size={20} style={{ color: 'var(--gray-white)' }} />
                <span style={{ color: 'var(--gray-white)', fontSize: '14px', fontWeight: '500' }}>Previous</span>
              </button>
            </div>

            <div className="relative">
              <button
                className="carousel-arrow-bottom-right cursor-pointer"
                onClick={nextSlide}
                disabled={currentSlide >= maxSlide}
                style={{
                  position: 'absolute',
                  bottom: '-44px',
                  right: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  zIndex: 2,
                  transition: 'all 0.3s ease',
                  cursor: currentSlide >= maxSlide ? 'default' : 'pointer',
                  background: 'none',
                  border: 'none',
                  opacity: currentSlide >= maxSlide ? 0.3 : 1
                }}
              >
                <span style={{ color: 'var(--gray-white)', fontSize: '14px', fontWeight: '500' }}>Next</span>
                <ChevronRight size={20} style={{ color: 'var(--gray-white)' }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-carousel {
          position: relative;
        }

        .carousel-container {
          position: relative;
          overflow: hidden;
          margin: 0;
          height: ${maxHeight};
        }

        .carousel-track {
          display: flex;
          transition: transform 0.3s ease;
        }

        .carousel-arrow-bottom-left:hover,
        .carousel-arrow-bottom-right:hover {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .carousel-container {
            margin: 0;
            height: auto;
          }
          .carousel-card {
            height: auto !important;
            min-height: auto !important;
          }
          .mobile-carousel-h2 {
            font-size: 28px !important;
          }
          .mobile-carousel-number {
            min-width: 40px !important;
            font-size: 12px !important;
          }
          .mobile-carousel-title {
            font-size: 20px !important;
          }
          .mobile-carousel-desc {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};