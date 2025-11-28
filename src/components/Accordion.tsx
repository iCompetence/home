'use client'

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AnimatedSection } from './ScrollAnimations';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  /** Section title */
  title: string;
  /** Array of accordion items */
  items: AccordionItem[];
  /** Section ID for scrolling */
  id?: string;
  /** Allow multiple items to be open at once */
  allowMultiple?: boolean;
  /** Default open item index */
  defaultOpen?: number;
  /** Custom container classes */
  className?: string;
  /** Animation type */
  animationType?: 'fadeInUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight';
}

export const Accordion = ({
  title,
  items,
  id = "accordion-section",
  allowMultiple = false,
  defaultOpen,
  className = "",
  animationType = "fadeInUp"
}: AccordionProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>(
    defaultOpen !== undefined ? [defaultOpen] : []
  );

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setSelectedItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setSelectedItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  const isItemSelected = (index: number) => selectedItems.includes(index);

  return (
    <AnimatedSection 
      id={id}
      className={`relative z-10 py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      animationType={animationType}
      duration={0}
    >
      <div className="container mx-auto pt-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="mobile-accordion-h2" style={{ 
              background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem', 
              fontSize: '32px', 
              fontWeight: '700', 
              lineHeight: '110%' 
            }}>
              {title}
            </h2>
          </div>
          
          {/* Accordion Items */}
          <div className="space-y-0">
            {items.map((item, index) => (
              <div
                key={index}
                className="border-b border-white/10 last:border-b-0"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 sm:py-8 px-0 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
                  style={{
                    color: 'var(--gray-light)',
                    fontSize: '14px',
                    fontWeight: '500',
                    minWidth: '60px'
                  }}
                >
                  <div className="flex items-center gap-4 sm:gap-8 flex-1">
                    <span 
                      className="mobile-accordion-number"
                      style={{ 
                        color: 'var(--gray-light)',
                        fontSize: '14px',
                        fontWeight: '500',
                        minWidth: '40px'
                      }}
                    >
                      ({String(index + 1).padStart(2, '0')})
                    </span>
                    <h3 
                      className="mobile-accordion-title"
                      style={{ 
                        color: 'var(--gray-white)',
                        fontSize: '24px',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="ml-4">
                    {isItemSelected(index) ? (
                      <Minus size={20} style={{ color: 'var(--gray-light)' }} />
                    ) : (
                      <Plus size={20} style={{ color: 'var(--gray-light)' }} />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isItemSelected(index)
                      ? 'max-h-96 opacity-100 pb-8' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-12 sm:pl-20">
                    {isItemSelected(index) && (
                      <div 
                        className="mobile-accordion-content"
                        style={{ 
                          color: 'var(--gray-light)',
                          fontSize: '18px',
                          lineHeight: '160%',
                          maxWidth: '600px'
                        }}
                      >
                        {item.content.split('\n\n').map((paragraph, idx) => {
                          // Check if this paragraph contains list items
                          if (paragraph.includes('\n-')) {
                            const parts = paragraph.split('\n-');
                            const textBefore = parts[0];
                            const listItems = parts.slice(1);
                            
                            return (
                              <div key={idx} style={{ marginBottom: idx < item.content.split('\n\n').length - 1 ? '1rem' : '0' }}>
                                {textBefore && <p style={{ marginBottom: '0.5rem' }}>{textBefore}</p>}
                                <ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
                                  {listItems.map((item, itemIdx) => (
                                    <li key={itemIdx} style={{ marginBottom: '0.25rem' }}>
                                      • {item.trim()}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                          
                          return (
                            <p key={idx} style={{ marginBottom: idx < item.content.split('\n\n').length - 1 ? '1rem' : '0' }}>
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .mobile-accordion-h2 {
            font-size: 28px !important;
          }
          .mobile-accordion-number {
            min-width: 40px !important;
            font-size: 12px !important;
          }
          .mobile-accordion-title {
            font-size: 20px !important;
          }
          .mobile-accordion-content {
            font-size: 16px !important;
          }
        }
      `}</style>
    </AnimatedSection>
  );
};