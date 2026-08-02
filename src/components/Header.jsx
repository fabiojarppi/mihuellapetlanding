import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="header-minimal">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Logo minimalista */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--crema-hueso)', fontWeight: 300, fontSize: '1.2rem', letterSpacing: '0.05em' }}>
            Mi Huella Pet
          </div>
          
          {/* Navegación editorial (Desktop) */}
          <nav className="desktop-nav desktop-only" style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
            <a href="#fundaciones" className="nav-link">Fundaciones</a>
            <a href="#usuarios" className="nav-link">Usuarios</a>
            <a href="#servicios" className="nav-link">Servicios</a>
          </nav>

          {/* Botones Derecha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* CTA Minimalista (Oculto en móvil ultra pequeño si se desea, por ahora visible) */}
            <div className="desktop-only">
               <a href="#descargar" className="btn-outline">Descargar App</a>
            </div>

            {/* Hamburger Button (Mobile) */}
            <button 
              className="mobile-only" 
              onClick={toggleMenu}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.5rem' }}
            >
              <Menu size={24} />
            </button>
          </div>
          
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <button 
          onClick={closeMenu}
          style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
        >
          <X size={32} />
        </button>
        <a href="#fundaciones" className="mobile-nav-link" onClick={closeMenu}>Fundaciones</a>
        <a href="#usuarios" className="mobile-nav-link" onClick={closeMenu}>Usuarios</a>
        <a href="#servicios" className="mobile-nav-link" onClick={closeMenu}>Servicios</a>
        <a href="#descargar" className="mobile-nav-link" style={{ marginTop: '2rem', fontSize: '1.5rem', color: 'var(--doro-antiguo)' }} onClick={closeMenu}>Descargar App</a>
      </div>
    </>
  );
}
