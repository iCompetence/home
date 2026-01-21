'use client'

import React, { useRef, useState, useEffect } from 'react';

interface StaticTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
  enableScrollStop?: boolean;
  onScrollStopComplete?: () => void;
  onProgressChange?: (progress: number) => void;
}

export const StaticText: React.FC<StaticTextProps> = ({ children, style, id, enableScrollStop = false, onScrollStopComplete, onProgressChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const lockedScrollPosition = useRef(0);
  const scrollAccumulator = useRef(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      setIsMobile(mobile);
      // On mobile, instantly reveal all text
      if (mobile) {
        setRevealProgress(1);
        if (onProgressChange) {
          onProgressChange(1);
        }
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [onProgressChange]);

  useEffect(() => {
    if (!enableScrollStop || isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const shouldLock = rect.top <= 50 && revealProgress < 1;

      if (shouldLock) {
        e.preventDefault();
        e.stopPropagation();

        if (!isLocked) {
          setIsLocked(true);
          const containerTop = container.offsetTop;
          lockedScrollPosition.current = containerTop;
          window.scrollTo(0, containerTop);
        }

        // Accumulate scroll delta
        scrollAccumulator.current += e.deltaY;

        // Calculate progress (adjust divisor to control speed)
        const newProgress = Math.min(1, Math.max(0, scrollAccumulator.current / 800));
        setRevealProgress(newProgress);

        // Notify parent of progress change
        if (onProgressChange) {
          onProgressChange(newProgress);
        }

        // Trigger callback when progress reaches certain threshold
        if (newProgress >= 1 && onScrollStopComplete) {
          onScrollStopComplete();
        }

        // Lock the scroll position
        window.scrollTo(0, lockedScrollPosition.current);
      } else if (revealProgress >= 1 && isLocked) {
        setIsLocked(false);
      }
    };

    const handleScroll = () => {
      if (isLocked && revealProgress < 1) {
        requestAnimationFrame(() => {
          window.scrollTo(0, lockedScrollPosition.current);
        });
      } else if (revealProgress < 1) {
        // Check if we should engage the lock
        const rect = container.getBoundingClientRect();
        if (rect.top <= 10 && rect.top >= -10) {
          setIsLocked(true);
          const containerTop = container.offsetTop;
          lockedScrollPosition.current = containerTop;
          window.scrollTo(0, containerTop);
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLocked) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, isMobile, enableScrollStop, onScrollStopComplete, onProgressChange, revealProgress]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20vh 0',
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#012332'
      }}
      className="px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              ...style,
              color: 'var(--gray-white)'
            }}
            className="static-text-content"
          >
            {children}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .static-text-content {
            font-size: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};
