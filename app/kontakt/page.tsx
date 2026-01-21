'use client'

import { useEffect } from 'react'

export default function KontaktRedirect() {
  useEffect(() => {
    window.location.href = '/kontakt.html'
  }, [])

  return (
    <div style={{
      backgroundColor: '#012332',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <p style={{ color: 'white' }}>Redirecting...</p>
    </div>
  )
}
