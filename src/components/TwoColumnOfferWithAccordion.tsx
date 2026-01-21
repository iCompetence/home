'use client'

import { useState } from 'react';
import { AnimatedSection } from './ScrollAnimations';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface OfferColumn {
  /** Sub-headline for the column */
  subHeadline: string;
  /** No effective AI... intro text */
  introText: string;
  /** Main copy text */
  copyText: string;
  /** Outcome text */
  outcome: string;
  /** Accordion title */
  accordionTitle: string;
  /** List of services in accordion */
  services: string[];
}

interface TwoColumnOfferProps {
  /** Section ID for scrolling */
  id?: string;
  /** Small label above title */
  label?: string;
  /** Main headline */
  title: string;
  /** Subline/intro paragraph */
  subline: string;
  /** Left column content */
  leftColumn: OfferColumn;
  /** Right column content */
  rightColumn: OfferColumn;
}

export const TwoColumnOfferWithAccordion = ({
  id = "offer-section",
  label,
  title,
  subline,
  leftColumn,
  rightColumn
}: TwoColumnOfferProps) => {
  const { t } = useLanguage();
  const [openAccordions, setOpenAccordions] = useState<{ left: boolean; right: boolean }>({
    left: false,
    right: false
  });

  const toggleAccordion = (side: 'left' | 'right') => {
    setOpenAccordions(prev => ({
      ...prev,
      [side]: !prev[side]
    }));
  };

  const renderColumn = (column: OfferColumn, side: 'left' | 'right') => {
    const isOpen = openAccordions[side];

    return (
      <div className="flex-1">
        {/* Sub-headline */}
        <h3 
          className="mobile-h3-title"
          style={{ 
            color: 'var(--gray-white)', 
            fontSize: '24px', 
            fontWeight: '600',
            lineHeight: '110%',
            marginBottom: '1.5rem'
          }}
        >
          {column.subHeadline}
        </h3>

        {/* Intro Text */}
        <p 
          className="mobile-intro-text"
          style={{ 
            color: 'var(--gray-white)', 
            fontSize: '16px',
            lineHeight: '160%',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}
        >
          {column.introText}
        </p>

        {/* Copy Text */}
        <p 
          className="mobile-copy-text"
          style={{ 
            color: 'var(--gray-light)', 
            fontSize: '16px',
            lineHeight: '160%',
            marginBottom: '1.5rem'
          }}
        >
          {column.copyText}
        </p>

        {/* Outcome */}
        <p 
          style={{ 
            color: 'var(--gray-light)', 
            fontSize: '16px',
            lineHeight: '160%',
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}
        >
          {t('offer.outcomeLabel') && (
            <span style={{ color: 'var(--gray-white)', fontWeight: '500' }}>{t('offer.outcomeLabel')}</span>
          )}
          {column.outcome}
        </p>

        {/* Accordion */}
        <div className="border-t border-white/10">
          <button
            onClick={() => toggleAccordion(side)}
            className="w-full py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
            style={{
              color: 'var(--gray-white)',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            {column.accordionTitle}
            {isOpen ? (
              <Minus size={20} style={{ color: 'var(--gray-light)' }} />
            ) : (
              <Plus size={20} style={{ color: 'var(--gray-light)' }} />
            )}
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-[600px] opacity-100 pb-6' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="space-y-3 pl-0">
              {column.services.map((service, index) => (
                <li 
                  key={index}
                  style={{ 
                    color: 'var(--gray-light)',
                    fontSize: '15px',
                    lineHeight: '160%',
                    paddingLeft: '1.5rem',
                    position: 'relative'
                  }}
                >
                  <span 
                    style={{ 
                      position: 'absolute',
                      left: '0',
                      color: 'var(--brand-primary-light)'
                    }}
                  >
                    •
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AnimatedSection 
      id={id}
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Label */}
          {label && (
            <></>
          )}
          
          {/* Title */}
          <h2 
            className="mobile-h2-title"
            style={{ 
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem', 
              fontSize: '32px', 
              fontWeight: '700', 
              lineHeight: '110%',
              textAlign: 'left'
            }}
          >
            {title}
          </h2>

          {/* Subline */}
          <p 
            className="mobile-subline"
            style={{ 
              color: 'var(--gray-light)', 
              fontSize: '18px',
              lineHeight: '160%',
              marginBottom: '4rem',
              maxWidth: '900px'
            }}
          >
            {subline}
          </p>

          {/* Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="border-r-0 lg:border-r border-white/10 pr-0 lg:pr-12">
              {renderColumn(leftColumn, 'left')}
            </div>

            {/* Right Column */}
            <div>
              {renderColumn(rightColumn, 'right')}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};