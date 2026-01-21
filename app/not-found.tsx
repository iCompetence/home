'use client'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#012332',
        padding: '2rem'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1
          style={{
            fontSize: '120px',
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: '1.5rem',
            background: 'linear-gradient(90deg, #E19B74 0%, #D476CD 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          404
        </h1>
        <h2
          style={{
            color: '#fcfcfc',
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '1rem',
            lineHeight: '110%'
          }}
        >
          Page not found
        </h2>
        <p
          style={{
            color: '#bebebe',
            fontSize: '18px',
            lineHeight: '160%',
            marginBottom: '2rem'
          }}
        >
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            backgroundColor: '#0b99cc',
            color: '#fcfcfc',
            fontSize: '16px',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0a88b8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0b99cc'}
        >
          Back to home
        </a>
      </div>
    </div>
  )
}
