'use client'

export default function Frame() {
  return (
    <div className="flex items-center justify-center" style={{ width: 'fit-content', height: 'fit-content' }}>
      <p className="font-['Inter:Bold',sans-serif] not-italic whitespace-nowrap mobile-logo-intro" style={{
        fontSize: '64px',
        fontWeight: '700',
        lineHeight: '1.1',
        color: '#fcfcfc'
      }}>
        <span style={{ color: '#0099cc' }}>i</span>Competence
      </p>
      
      <style>{`
        @media (max-width: 768px) {
          .mobile-logo-intro {
            font-size: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}