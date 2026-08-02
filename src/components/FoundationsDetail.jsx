import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imagen1 from '../assets/imagen1.jpeg';

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    title: "Toda su historia, siempre a salvo",
    desc: "Cada peludo tiene una historia que merece ser cuidada. Centraliza su información médica, estado, fotografías y datos importantes para que nunca se pierdan."
  },
  {
    title: "Una herramienta creada para quienes más los aman",
    desc: "Gestiona tu fundación de forma simple y organizada. Actualiza la información de cada mascota, registra cambios y mantén todo al día desde una sola plataforma."
  },
  {
    title: "Más oportunidades para encontrar un hogar",
    desc: "Cada publicación puede cambiar una vida. Dale visibilidad a tus peludos dentro de Mi Huella Pet para que más personas los conozcan y puedan adoptar."
  },
  {
    title: "Siempre identificados, siempre protegidos",
    desc: "Todos los peludos reciben una placa QR de identificación. Si alguno se pierde, cualquier persona podrá acceder a su información y ayudar a que regrese a salvo."
  },
  {
    title: "Porque ayudar no debería tener un costo",
    desc: "Todas estas herramientas son completamente gratuitas para las fundaciones. Nuestro propósito es apoyar a quienes dedican su vida a proteger y encontrar hogares para los animales que más lo necesitan."
  }
];

export default function FoundationsDetail() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar cabecera (título y descripción)
      gsap.fromTo('.anim-header', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }}
      );

      // Animar imagen (entra desde la izquierda)
      gsap.fromTo('.anim-image',
        { scale: 0.9, opacity: 0, x: -50 },
        { scale: 1, opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: {
          trigger: '.anim-image',
          start: 'top 80%'
        }}
      );

      // Animar items de la lista (entran en cascada desde la derecha)
      gsap.fromTo('.anim-item',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: {
          trigger: '.anim-list',
          start: 'top 80%'
        }}
      );
    }, sectionRef);

    return () => ctx.revert(); // Limpieza al desmontar
  }, []);

  return (
    <section 
      id="details-section"
      ref={sectionRef}
      style={{
      backgroundColor: '#0A0A0A',
      color: '#FFFFFF',
      padding: '8rem 0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        
        {/* Cabecera: Layout 2 columnas estilo Shopify Editions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          marginBottom: '6rem',
          alignItems: 'start'
        }}>
          {/* Columna Izquierda: Título monumental */}
          <div className="anim-header">
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              lineHeight: '1.1',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              ¿Por qué unirte a <br/>Mi Huella Pet?
            </h2>
          </div>

          {/* Columna Derecha: Descripción y CTA */}
          <div className="anim-header" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '500px'
          }}>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 300,
              margin: 0
            }}>
              Sabemos que detrás de cada rescate hay horas de esfuerzo, amor y dedicación. Por eso creamos herramientas gratuitas que les permiten enfocarse en lo más importante: cambiar la vida de más peludos.
            </p>
            
            <div>
              <a href="https://wa.me/573133196387?text=Quiero%20ser%20parte%20de%20mi%20huella%20pet" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{
                display: 'inline-block',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                padding: '0.8rem 1.8rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                transition: 'transform 0.2s',
                marginBottom: '1rem'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Unir mi fundación
              </a>
              <br/>
              <a href="#conocer-mas" style={{
                color: 'rgba(255, 255, 255, 0.8)',
                textDecoration: 'underline',
                fontSize: '0.9rem',
                textUnderlineOffset: '4px',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
              >
                Explorar todas las herramientas gratuitas
              </a>
            </div>
          </div>
        </div>

        {/* Presentación Visual: Layout 2 Columnas (Imagen + Lista) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: window.innerWidth <= 768 ? '2rem' : '4rem',
          alignItems: 'start'
        }}>
          {/* Imagen Placeholder */}
          <div className="anim-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={imagen1} 
              alt="Herramientas de Mi Huella Pet" 
              style={{
                width: window.innerWidth <= 768 ? '90%' : '60%',
                maxWidth: '400px',
                height: 'auto',
                borderRadius: '24px',
                objectFit: 'cover',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }} 
            />
          </div>

          {/* Lista de Items alineada a la derecha */}
          <div className="anim-list" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: window.innerWidth <= 768 ? '1.5rem' : '2.5rem'
          }}>
            {items.map((item, idx) => (
              <div key={idx} className="anim-item" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
                paddingLeft: window.innerWidth <= 768 ? '1rem' : '1.5rem',
                transition: 'border-color 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              >
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: '1.3'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
