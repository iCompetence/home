'use client'

import { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
const logoVersandhausberater = '/7559fba371c8992178d2cbe5411368d3346659d5.png';
const logoWV = '/2024ae1c1210b44f051c4caad1cb16214c245390.png';
const logoEcommerceMagazin = '/34a4e4e1e9d1abc4f3396a262986bec26bd249b2.png';
const logoBigDataInsider = '/a4eb6ce0bee6ae3a8efbbba4f000aa9b9214ba04.png';
const logoMarconomy = '/fb18dc421d0d5463f2144614ae40f6f173a26ef8.png';
const logoMarke41 = '/cb7fe2a22749eebc446540686d4be1e0cc87ca16.png';
const logoInternetWorldBusiness = '/e321db3ccc36dd9722692b8a56d32a9996052698.png';
const logoSocialMediaMagazin = '/6720a6959d73d8c21f05fc7192fe4d2f6a9fd199.png';
const logoOnlineMarketing = '/f0f77f74b95f16875d54d2a74e8a0c3b148485fe.png';
const logoAdditional = '/06dbf3b6030afc23953bbf52206ed516d9335a87.png';

interface BrandBannerProps {
  id?: string;
  title?: string;
  logos?: string[];
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

export const BrandBanner = ({
  id,
  title,
  logos = []
}: BrandBannerProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use provided logos or default company logos
  const defaultLogos = [
    logoVersandhausberater,
    logoWV,
    logoEcommerceMagazin,
    logoBigDataInsider,
    logoMarconomy,
    logoMarke41,
    logoInternetWorldBusiness,
    logoSocialMediaMagazin,
    logoOnlineMarketing,
    logoAdditional
  ];

  const displayLogos = logos.length > 0 ? logos : defaultLogos;

  // Velocity scroll component for logos
  function VelocityLogos({
    baseVelocity = 50
  }: {
    baseVelocity?: number;
  }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      [0, 1000],
      [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLDivElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div className="relative overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-8 sm:gap-16"
          style={{ x }}
        >
          {[...Array(4)].map((_, setIndex) => (
            <div
              key={setIndex}
              ref={setIndex === 0 ? copyRef : null}
              className="flex flex-shrink-0 items-center gap-8 sm:gap-16"
            >
              {displayLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: '120px',
                  }}
                >
                  <img
                    src={logo}
                    alt={`Brand ${index + 1}`}
                    className="w-full h-auto object-contain"
                    style={{
                      filter: 'grayscale(100%) brightness(0) invert(1)',
                      opacity: 1,
                      maxHeight: '40px'
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: 'transparent'
      }}
    >
      {/* Gradient background rectangle for entire section */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #E19B74 0%, #D476CD 100%)',
          opacity: 0.95,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        {title && (
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="mobile-brand-h2"
              style={{
                color: 'var(--gray-white)',
                marginBottom: '1.5rem',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%'
              }}
            >
              {title}
            </h2>
          </div>
        )}

        <VelocityLogos baseVelocity={50} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-brand-h2 {
            font-size: 24px !important;
          }
        }
      `}</style>
    </section>
  );
};
