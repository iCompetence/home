'use client'

import { useLanguage } from '../../contexts/LanguageContext';
import { AnimatedSection } from '../ScrollAnimations';

export const CTProblemSolution = () => {
  const { t } = useLanguage();

  // Comparison rows: feature, problem (without), solution (with tool)
  const comparisonRows = [
    {
      feature: t('ct.why.problem.item1'),
      problem: t('ct.why.problem.item1'),
      solution: t('ct.why.solution.item1')
    },
    {
      feature: t('ct.why.problem.item2'),
      problem: t('ct.why.problem.item2'),
      solution: t('ct.why.solution.item2')
    },
    {
      feature: t('ct.why.problem.item3'),
      problem: t('ct.why.problem.item3'),
      solution: t('ct.why.solution.item3')
    },
    {
      feature: t('ct.why.problem.item4'),
      problem: t('ct.why.problem.item4'),
      solution: t('ct.why.solution.item4')
    }
  ];

  return (
    <AnimatedSection
      id="why-section"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8"
      animationType="fadeInUp"
      duration={0}
    >
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2
              className="ct-why-h2"
              style={{
                background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '32px',
                fontWeight: '700',
                lineHeight: '110%',
                marginBottom: '2rem'
              }}
            >
              {t('ct.why.title')}
            </h2>
            <p
              className="ct-why-desc"
              style={{
                color: 'var(--gray-white)',
                fontSize: '18px',
                lineHeight: '170%',
                maxWidth: '700px'
              }}
            >
              {t('ct.why.description')}
            </p>
          </div>

          {/* Comparison Table */}
          <table className="w-full ct-why-table" style={{ borderCollapse: 'collapse' }}>
            {/* Header Row */}
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {/* Empty first column */}
                <th style={{ width: '40%', padding: '0 0 24px 0' }}></th>

                {/* Solution header */}
                <th style={{ width: '30%', padding: '0 0 24px 0', textAlign: 'center' }}>
                  <span
                    style={{
                      color: 'var(--gray-white)',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                  >
                    {t('ct.why.solution.title')}
                  </span>
                </th>

                {/* Problem header */}
                <th style={{ width: '30%', padding: '0 0 24px 0', textAlign: 'center' }}>
                  <span
                    style={{
                      color: 'var(--gray-light)',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                  >
                    {t('ct.why.problem.title')}
                  </span>
                </th>
              </tr>
            </thead>

            {/* Data Rows */}
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/[0.02] transition-colors duration-200"
                  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Row number */}
                  <td style={{ padding: '24px 16px 24px 0', verticalAlign: 'middle' }}>
                    <div className="flex items-start gap-4 sm:gap-8">
                      <span
                        className="ct-why-number"
                        style={{
                          color: 'var(--gray-light)',
                          fontSize: '14px',
                          fontWeight: '500',
                          minWidth: '40px'
                        }}
                      >
                        ({String(index + 1).padStart(2, '0')})
                      </span>
                    </div>
                  </td>

                  {/* Solution value */}
                  <td style={{ padding: '24px 16px', textAlign: 'left', verticalAlign: 'middle' }}>
                    <span
                      className="ct-why-value"
                      style={{
                        color: 'var(--gray-white)',
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '150%'
                      }}
                    >
                      {row.solution}
                    </span>
                  </td>

                  {/* Problem value */}
                  <td style={{ padding: '24px 0 24px 16px', textAlign: 'left', verticalAlign: 'middle' }}>
                    <span
                      className="ct-why-value"
                      style={{
                        color: 'var(--gray-light)',
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '150%'
                      }}
                    >
                      {row.problem}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ct-why-table th,
          .ct-why-table td {
            padding: 16px 8px !important;
          }
        }
        @media (max-width: 768px) {
          .ct-why-h2 {
            font-size: 28px !important;
          }
          .ct-why-desc {
            font-size: 16px !important;
          }
          .ct-why-number {
            display: none !important;
          }
          .ct-why-value {
            font-size: 13px !important;
          }
          .ct-why-table th,
          .ct-why-table td {
            padding: 12px 6px !important;
          }
          .ct-why-table th span {
            font-size: 14px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};
