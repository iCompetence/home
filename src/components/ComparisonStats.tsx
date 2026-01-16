'use client'

import { AnimatedSection } from './ScrollAnimations';
import { Card, CardContent } from './ui/card';

interface ComparisonStatsProps {
  /** Section ID for scrolling */
  id?: string;
  /** Left side label (e.g., "Vorher") */
  leftLabel?: string;
  /** Left side value (e.g., "10-30") */
  leftValue: string;
  /** Left side unit (e.g., "Minuten") */
  leftUnit: string;
  /** Right side label (e.g., "Nachher") */
  rightLabel?: string;
  /** Right side value (e.g., "<1") */
  rightValue: string;
  /** Right side unit (e.g., "Sekunde") */
  rightUnit: string;
  /** Optional description text below */
  description?: string | string[];
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
  /** Custom className */
  className?: string;
}

export const ComparisonStats = ({
  id,
  leftLabel = "Vorher",
  leftValue,
  leftUnit,
  rightLabel = "Mit Intelligentic Search",
  rightValue,
  rightUnit,
  description,
  animationType = 'fadeInUp',
  className = ''
}: ComparisonStatsProps) => {
  const descriptionArray = description
    ? (Array.isArray(description) ? description : [description])
    : [];

  return (
    <AnimatedSection
      id={id}
      className={`relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Before Card */}
            <Card className="bg-white/[0.03] border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <span className="text-sm font-medium text-white/40 uppercase tracking-wider">
                  {leftLabel}
                </span>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-6xl sm:text-7xl font-bold text-white/30 tracking-tight">
                    {leftValue}
                  </span>
                  <span className="text-xl sm:text-2xl font-medium text-white/30">
                    {leftUnit}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* After Card */}
            <Card className="bg-gradient-to-br from-[#E19B74]/10 to-[#D476CD]/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <span
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{
                    background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {rightLabel}
                </span>
                <div className="mt-4 flex items-baseline gap-3">
                  <span
                    className="text-6xl sm:text-7xl font-bold tracking-tight"
                    style={{
                      background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {rightValue}
                  </span>
                  <span className="text-xl sm:text-2xl font-medium text-white/70">
                    {rightUnit}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          {descriptionArray.length > 0 && (
            <div className="max-w-3xl">
              {descriptionArray.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    color: 'var(--gray-white)',
                    fontSize: '18px',
                    lineHeight: '170%',
                    marginBottom: index < descriptionArray.length - 1 ? '1.5rem' : '0'
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};
