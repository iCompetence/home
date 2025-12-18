'use client'

import { useEffect } from 'react'

export default function ImpressumRedirect() {
  useEffect(() => {
    window.location.href = 'https://icompetence.de/impressum'
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#012332',
      color: '#fff'
    }}>
      <p>Redirecting to impressum...</p>
    </div>
  )
}
