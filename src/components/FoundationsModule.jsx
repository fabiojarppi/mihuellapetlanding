import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';
import imagen2 from '../assets/imagen-2.jpeg';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
attribute vec3 customColor;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = customColor;
  
  vec3 pos = position;
  
  // Rotación y expansión de vórtice
  float angle = uTime * 0.2 + (pos.y * 0.1);
  float s = sin(angle);
  float c = cos(angle);
  
  vec3 rotatedPos = pos;
  rotatedPos.x = pos.x * c - pos.z * s;
  rotatedPos.z = pos.x * s + pos.z * c;
  
  // Turbulencia sutil
  rotatedPos.y += sin(uTime * 0.5 + rotatedPos.x) * 0.5;
  rotatedPos.x += cos(uTime * 0.3 + rotatedPos.y) * 0.5;

  // Efecto líquido brutal con el mouse (Efecto 'Conoce a mi Huella Pet')
  vec2 mouseWorld = (uMouse * 2.0 - 1.0) * 12.0; 
  float distToMouse = distance(rotatedPos.xy, mouseWorld);
  
  if (distToMouse < 8.0) {
    float force = pow((8.0 - distToMouse) / 8.0, 2.0) * 5.0; 
    vec2 dir = normalize(rotatedPos.xy - mouseWorld);
    
    // Remolino líquido
    float sMouse = sin(force * 0.8);
    float cMouse = cos(force * 0.8);
    vec2 vortex = vec2(dir.x * cMouse - dir.y * sMouse, dir.x * sMouse + dir.y * cMouse);
    
    rotatedPos.x += vortex.x * force;
    rotatedPos.y += vortex.y * force;
    rotatedPos.z += force * 1.5; 
  }

  vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
  
  // Tamaño de las partículas basado en la distancia a la cámara (ahora mucho más grandes)
  gl_PointSize = (120.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  // Difuminar partículas lejanas o centrales
  float distToCenter = length(pos);
  vAlpha = smoothstep(20.0, 0.0, distToCenter);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Forma de círculo suave (glow)
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  float glow = smoothstep(0.5, 0.0, dist);
  gl_FragColor = vec4(vColor, glow * vAlpha * 0.8);
}
`;

const CameraRig = ({ mousePos }) => {
  useFrame((state) => {
    const targetX = (mousePos.x - 0.5) * 5;
    const targetY = (mousePos.y - 0.5) * 2 + 1.5;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0); 
  });
  return null;
};

const GalaxyVortex = ({ mousePos }) => {
  const pointsRef = useRef();
  
  const particleCount = 80000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    // Tonos verdes claros para las partículas
    const colorA = new THREE.Color('#A8E6CF'); // Verde menta brillante
    const colorB = new THREE.Color('#8CCFB2'); // Verde claro un poco más saturado
    const colorC = new THREE.Color('#D4F0DF'); // Verde pálido / blanco verdoso
    
    for (let i = 0; i < particleCount; i++) {
      // Distribución en volumen de vórtice/explosión
      const r = Math.pow(Math.random(), 2.0) * 15; // Más densidad en el centro
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 20;
      
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      // Mezcla de colores según la posición
      const mixedColor = new THREE.Color();
      const mixRatio = Math.random();
      
      if (mixRatio < 0.33) {
        mixedColor.lerpColors(colorA, colorB, Math.random());
      } else if (mixRatio < 0.66) {
        mixedColor.lerpColors(colorB, colorC, Math.random());
      } else {
        mixedColor.lerpColors(colorA, colorC, Math.random());
      }
      
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      color1: { value: new THREE.Color('#D4AF37') }, // Dorado
      color2: { value: new THREE.Color('#40E0D0') }  // Turquesa Menta
    }),
    []
  );

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      pointsRef.current.material.uniforms.uMouse.value.lerp(mousePos, 0.15);
      
      // Rotación lenta de todo el conjunto
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particleCount} 
          array={positions} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-customColor" 
          count={particleCount} 
          array={colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};



export default function FoundationsModule() {
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));

  const handlePointerMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = 1.0 - (e.clientY / window.innerHeight);
    setMousePos(new THREE.Vector2(x, y));
  };

  return (
    <section 
      id="fundaciones"
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0A0A0A' }}
      onPointerMove={handlePointerMove}
    >
      
      {/* Capa 3D de fondo */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          {/* Niebla volumétrica para dar profundidad a las partículas */}
          <fog attach="fog" args={['#0A0A0A', 5, 25]} />
          <CameraRig mousePos={mousePos} />
          <GalaxyVortex mousePos={mousePos} />
        </Canvas>
      </div>

      {/* Capa HTML UI */}
      <div className="container responsive-flex-col" style={{ 
        position: 'relative', 
        zIndex: 10, 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        pointerEvents: 'none' 
      }}>
        {/* Izquierda: Textos */}
        <div>
          <h2 className="responsive-title" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '7vw',
            color: '#FFFFFF',
            fontWeight: 400,
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            lineHeight: '1.1'
          }}>
            Conoce a<br />Mi Huella Pet
          </h2>
        </div>

        {/* Derecha: Imagen */}
        <div className="responsive-hero-img" style={{ maxWidth: '22%' }}>
          <img 
            src={imagen2} 
            alt="Mi Huella Pet Hero" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '24px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)', 
              border: '1px solid rgba(255, 255, 255, 0.05)' 
            }} 
          />
        </div>
      </div>

      {/* Flecha indicadora de scroll (igual que el diseño anterior) */}
      <style>
        {`
          @keyframes bounceScroll {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-7px); }
          }
          .scroll-arrow {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            color: #FFFFFF;
            z-index: 10;
            animation: bounceScroll 2s infinite;
            cursor: pointer;
            opacity: 1;
            transition: opacity 0.3s;
          }
          .scroll-arrow:hover {
            opacity: 1;
          }
        `}
      </style>
      <div className="scroll-arrow" onClick={() => {
        const el = document.getElementById('details-section');
        if(el) el.scrollIntoView({ behavior: 'smooth' });
      }}>
        <ChevronDown size={40} strokeWidth={1.5} />
      </div>
      
    </section>
  );
}
