'use client'

// Simplified wrapper component without scroll animations
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animationType?: 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  duration?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
}) => {
  return (
    <section
      id={id}
      className={className}
    >
      {children}
    </section>
  );
};
