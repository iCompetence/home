'use client'

import { useRef, useState, useEffect, useMemo } from 'react';
import React from 'react';

interface ScrollRevealTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ children, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0); // 0 to 1
  const [isLocked, setIsLocked] = useState(false);
  const scrollAccumulator = useRef(0);
  const lockedScrollPosition = useRef(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      setIsMobile(mobile);
      // On mobile, instantly reveal all text
      if (mobile) {
        setRevealProgress(1);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset progress when children change (e.g., language switch)
  useEffect(() => {
    setRevealProgress(0);
    setIsLocked(false);
    scrollAccumulator.current = 0;
    lockedScrollPosition.current = 0;
  }, [children]);

  // Split children into processable elements
  const processedChildren = useMemo(() => {
    const elements: React.ReactNode[] = [];
    let wordIndex = 0;

    const processNode = (node: React.ReactNode, key: number): number => {
      if (typeof node === 'string') {
        // Split text into words
        const words = node.split(/(\s+)/);
        words.forEach((word, idx) => {
          if (word.match(/^\s+$/)) {
            elements.push(<React.Fragment key={`${key}-${idx}`}>{word}</React.Fragment>);
          } else {
            elements.push(
              <span key={`${key}-${idx}`} className="reveal-word">
                {word}
              </span>
            );
            wordIndex++;
          }
        });
        return key + words.length;
      } else if (React.isValidElement(node)) {
        // Preserve JSX elements like <br />, <span>, etc.
        elements.push(React.cloneElement(node as React.ReactElement, { key: `element-${key}` }));
        return key + 1;
      } else if (Array.isArray(node)) {
        let currentKey = key;
        node.forEach(child => {
          currentKey = processNode(child, currentKey);
        });
        return currentKey;
      }
      return key;
    };

    processNode(children, 0);
    return elements;
  }, [children]);

  useEffect(() => {
    // Skip scroll lock on mobile
    if (isMobile) return;

    const container = containerRef.current;
    const textElement = textRef.current;
    if (!container || !textElement) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      // Wider detection zone: from 100px before top to 100px after
      const isNearTop = rect.top <= 100 && rect.top >= -100;
      const shouldLock = rect.top <= 50 && revealProgress < 1;

      if (shouldLock) {
        e.preventDefault();
        e.stopPropagation();

        if (!isLocked) {
          setIsLocked(true);
          // Snap to the exact position where the section should be locked
          const containerTop = container.offsetTop;
          lockedScrollPosition.current = containerTop;
          window.scrollTo(0, containerTop);
        }

        // Accumulate scroll delta
        scrollAccumulator.current += e.deltaY;

        // Calculate progress (adjust divisor to control speed)
        const newProgress = Math.min(1, Math.max(0, scrollAccumulator.current / 2000));
        setRevealProgress(newProgress);

        // Lock the scroll position
        window.scrollTo(0, lockedScrollPosition.current);
      } else if (revealProgress >= 1 && isLocked) {
        setIsLocked(false);
      }
    };

    const handleScroll = () => {
      if (isLocked) {
        // Force scroll back to locked position
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
  }, [revealProgress, isLocked, isMobile]);

  // Update word colors based on reveal progress
  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll('.reveal-word');
    const totalWords = words.length;

    words.forEach((word, index) => {
      // Adjust so first word starts dim too: (index + 1) / totalWords
      const wordProgress = (index + 1) / totalWords;

      if (revealProgress >= wordProgress) {
        (word as HTMLElement).style.color = 'var(--gray-white)';
      } else {
        (word as HTMLElement).style.color = 'rgba(255, 255, 255, 0.3)';
      }
    });

    // Hide/show elements marked for reveal-on-complete
    const revealOnComplete = textRef.current.querySelectorAll('.reveal-on-complete');
    revealOnComplete.forEach((element) => {
      if (revealProgress >= 1) {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.visibility = 'visible';
      } else {
        (element as HTMLElement).style.opacity = '0';
        (element as HTMLElement).style.visibility = 'hidden';
      }
    });
  }, [revealProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20vh 0',
        position: 'relative',
        zIndex: 10
      }}
      className="px-4 sm:px-6 lg:px-8"
    >
      {/* Gradient Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #E19B74 0%, #D476CD 100%)',
          opacity: 1,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div
            ref={textRef}
            style={{
              ...style
            }}
            className="mobile-reveal-text scroll-reveal-container"
          >
            {processedChildren}
          </div>
        </div>
      </div>

      <style>{`
        .scroll-reveal-container {
          --reveal-progress: 0;
        }

        .reveal-word {
          color: rgba(255, 255, 255, 0.3);
          transition: color 0.2s ease;
          display: inline-block;
        }

        .reveal-on-complete {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        @media (max-width: 768px) {
          .mobile-reveal-text {
            font-size: 24px !important;
            color: var(--gray-white) !important;
          }
          .mobile-reveal-text .reveal-word {
            color: var(--gray-white) !important;
          }
        }
      `}</style>
    </div>
  );
};
