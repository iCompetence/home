'use client'

import type { ReactNode } from 'react';
import { AnimatedSection } from './ScrollAnimations';

interface ComparisonRow {
  /** Feature/criteria name */
  feature: ReactNode;
  /** Value for the primary option (Intelligentic Search) */
  primary: ReactNode;
  /** Value for the secondary option (Traditional Search) */
  secondary: ReactNode;
}

interface ComparisonTableProps {
  /** Section ID for scrolling */
  id?: string;
  /** Optional title above the table */
  title?: string;
  /** Optional header for the first column (empty by default) */
  featureHeader?: ReactNode;
  /** Header for primary column */
  primaryHeader: string;
  /** Header for secondary column */
  secondaryHeader: string;
  /** Comparison rows */
  rows: ComparisonRow[];
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
}

export const ComparisonTable = ({
  id = "comparison-section",
  title,
  featureHeader,
  primaryHeader,
  secondaryHeader,
  rows,
  className = "",
  animationType = "fadeInUp"
}: ComparisonTableProps) => {
  return (
    <AnimatedSection
      id={id}
      className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          {title && (
            <h2
              className="mobile-h2-title"
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '3rem',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%'
              }}
            >
              {title}
            </h2>
          )}

          {/* Table */}
          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            {/* Header Row */}
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {/* First column: empty unless featureHeader is set */}
                <th style={{ width: '40%', padding: '0 0 24px 0', textAlign: 'left' }}>
                  {featureHeader && (
                    <span
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}
                    >
                      {featureHeader}
                    </span>
                  )}
                </th>

                {/* Primary header (Intelligentic Search) */}
                <th style={{ width: '30%', padding: '0 0 24px 0', textAlign: 'center' }}>
                  <span
                    style={{
                      color: 'var(--gray-white)',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                  >
                    {primaryHeader}
                  </span>
                </th>

                {/* Secondary header (Traditional Search) */}
                <th style={{ width: '30%', padding: '0 0 24px 0', textAlign: 'center' }}>
                  <span
                    style={{
                      color: 'var(--gray-light)',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                  >
                    {secondaryHeader}
                  </span>
                </th>
              </tr>
            </thead>

            {/* Data Rows */}
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/[0.02] transition-colors duration-200"
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Feature name */}
                  <td style={{ padding: '24px 16px 24px 0', verticalAlign: 'middle' }}>
                    <span
                      className="mobile-feature-name"
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '18px',
                        fontWeight: '500',
                        lineHeight: '140%'
                      }}
                    >
                      {row.feature}
                    </span>
                  </td>

                  {/* Primary value (Intelligentic Search) */}
                  <td style={{ padding: '24px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <span
                      className="mobile-comparison-value"
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '18px',
                        fontWeight: '400',
                        lineHeight: '140%'
                      }}
                    >
                      {row.primary}
                    </span>
                  </td>

                  {/* Secondary value (Traditional Search) */}
                  <td style={{ padding: '24px 0 24px 16px', textAlign: 'center', verticalAlign: 'middle' }}>
                    <span
                      className="mobile-comparison-value"
                      style={{
                        color: 'var(--gray-light)',
                        fontSize: '18px',
                        fontWeight: '400',
                        lineHeight: '140%'
                      }}
                    >
                      {row.secondary}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-feature-name {
            font-size: 14px !important;
          }
          .mobile-comparison-value {
            font-size: 14px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
