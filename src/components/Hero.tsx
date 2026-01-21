'use client'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 
            style={{ 
              color: 'var(--gray-white)',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
            className="relative z-10"
          >
            We create digital products in the agentic AI era.
          </h2>
        </div>
      </div>
    </section>
  );
}