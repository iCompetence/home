'use client'

import { AnimatedSection } from './ScrollAnimations';

interface OfferColumn {
  /** Sub-headline for the column */
  subHeadline: string;
  /** Content paragraphs */
  content: string[];
  /** Outcome text (optional) */
  outcome?: string;
}

interface TwoColumnOfferProps {
  /** Section ID for scrolling */
  id?: string;
  /** Main headline */
  title: string;
  /** Left column content */
  leftColumn: OfferColumn;
  /** Right column content */
  rightColumn: OfferColumn;
}

export const TwoColumnOffer = ({
  id = "offer-section",
  title,
  leftColumn,
  rightColumn
}: TwoColumnOfferProps) => {

  const renderColumn = (column: OfferColumn) => {
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

        {/* Content Paragraphs */}
        {column.content.map((paragraph, index) => (
          <p
            key={index}
            className="mobile-copy-text"
            style={{
              color: 'var(--gray-light)',
              fontSize: '16px',
              lineHeight: '160%',
              marginBottom: '1.5rem'
            }}
          >
            {paragraph}
          </p>
        ))}

        {/* Outcome */}
        {column.outcome && (
          <p
            style={{
              color: 'var(--gray-light)',
              fontSize: '16px',
              lineHeight: '160%',
              marginTop: '2rem'
            }}
          >
            <span style={{ color: 'var(--gray-white)', fontWeight: '500' }}>Outcome: </span>
            {column.outcome}
          </p>
        )}
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
          {/* Title */}
          <h2
            className="mobile-h2-title"
            style={{
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '4rem',
              fontSize: '32px',
              fontWeight: '700',
              lineHeight: '110%',
              textAlign: 'left'
            }}
          >
            {title}
          </h2>

          {/* Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="border-r-0 lg:border-r border-white/10 pr-0 lg:pr-12">
              {renderColumn(leftColumn)}
            </div>

            {/* Right Column */}
            <div>
              {renderColumn(rightColumn)}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
