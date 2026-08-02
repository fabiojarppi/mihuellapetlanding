import React from 'react';

const services = [
  {
    title: "Toda su información en un solo lugar",
    desc: "Lleva siempre contigo su historia. Registra su información, carnet de vacunación, historial médico, fotografías y datos importantes en un perfil digital seguro."
  },
  {
    title: "Alertas de pérdida para toda la comunidad",
    desc: "Nunca estarás solo si tu peludo se pierde. Crea una alerta y permite que miles de personas de la comunidad te ayuden a encontrarlo."
  },
  {
    title: "Placa QR inteligente",
    desc: "Protección que siempre lo acompaña. Si alguien escanea la placa QR de tu mascota, podrá ver tus datos de contacto y, si está reportada como perdida, recibirás una alerta con la ubicación del escaneo."
  },
  {
    title: "Mapa pet-friendly",
    desc: "Todo lo que tu peludo necesita, cerca de ti. Explora un mapa interactivo con veterinarias, clínicas, parques, fundaciones, refugios, hoteles, guarderías y otros lugares de interés para tu mascota."
  },
  {
    title: "Adopta con confianza",
    desc: "Encuentra a tu próximo compañero de vida. Descubre peludos en adopción publicados por fundaciones verificadas y procesos responsables."
  },
  {
    title: "Apoya a las fundaciones",
    desc: "Cada pequeño aporte hace una gran diferencia. Conoce fundaciones, dona, participa en campañas y contribuye a mejorar la vida de miles de animales."
  },
  {
    title: "Ayuda a encontrar peludos perdidos",
    desc: "Tu ayuda puede reunir una familia. Consulta las alertas activas de mascotas desaparecidas y colabora compartiendo información o reportando avistamientos."
  },
  {
    title: "Marketplace para mascotas",
    desc: "Todo para tu mejor amigo en un solo lugar. Descubre productos, accesorios y servicios de aliados confiables dentro del Marketplace de Mi Huella Pet."
  },
  {
    title: "Beneficios exclusivos",
    desc: "Disfruta de descuentos y promociones. Accede a ofertas especiales con veterinarias, tiendas, peluquerías, guarderías y otros establecimientos aliados."
  },
  {
    title: "Gratis para todos",
    desc: "Porque proteger a tu peludo debería ser sencillo. Descarga la app y disfruta de todas sus funciones principales sin costo."
  }
];

export default function UsersServices() {
  return (
    <section 
      id="servicios"
      style={{ 
        width: '100vw', 
        backgroundColor: '#050302', 
        padding: '6rem 5% 8rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Título de la sección */}
      <div style={{
        marginBottom: '1rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.5)',
          margin: 0,
          fontWeight: 400,
          letterSpacing: '0.01em'
        }}>
          Servicios
        </h2>
      </div>

      <div 
        className="services-grid" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          columnGap: '4rem',
          rowGap: '0'
        }}
      >
        {services.map((service, index) => (
          <div 
            key={index} 
            style={{
              padding: '2.5rem 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#F4F4F4',
              margin: 0,
              fontWeight: 500,
              letterSpacing: '-0.01em',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              textDecorationColor: 'rgba(255, 255, 255, 0.3)'
            }}>
              {service.title}
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.45)',
              margin: 0,
              fontWeight: 400
            }}>
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
