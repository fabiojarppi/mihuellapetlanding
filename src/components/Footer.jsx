import React from 'react';

export default function Footer() {
  return (
    <footer 
      style={{
        backgroundColor: '#050302',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '2.5rem 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem'
      }}
    >
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.6)',
          fontWeight: 400
        }}>
          © La madriguera tech
        </span>
        
        <a 
          href="#" 
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 400,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
        >
          Términos del Servicio
        </a>

        <a 
          href="#" 
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: 400,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#FFFFFF'}
          onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
        >
          Política de privacidad
        </a>
      </div>

      {/* Redes Sociales */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <a 
          href="https://instagram.com/mihuellapetcol" 
          target="_blank" 
          rel="noreferrer"
          style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
          <span style={{ fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>@mihuellapetcol</span>
        </a>

        <a 
          href="https://tiktok.com/@mihuellapetcol" 
          target="_blank" 
          rel="noreferrer"
          style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
            <path d="M15 8a4 4 0 1 0 0-8c0 4.5 4 8 8 8v4a12 12 0 0 1-8-4v9a8 8 0 1 1-8-8c2.5 0 4 1 5 3"/>
          </svg>
          <span style={{ fontSize: '0.85rem', fontFamily: "'Inter', sans-serif" }}>@mihuellapetcol</span>
        </a>
      </div>
    </footer>
  );
}
