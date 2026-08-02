import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import videoLanding from '../assets/video-landing.mp4';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
attribute vec3 customColor;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = customColor;
  vec3 pos = position;
  
  float angle = uTime * 0.15 + (pos.y * 0.1);
  float s = sin(angle);
  float c = cos(angle);
  
  vec3 rotatedPos = pos;
  rotatedPos.x = pos.x * c - pos.z * s;
  rotatedPos.z = pos.x * s + pos.z * c;
  
  rotatedPos.y += sin(uTime * 0.4 + rotatedPos.x) * 0.5;
  rotatedPos.x += cos(uTime * 0.2 + rotatedPos.y) * 0.5;

  vec2 mouseWorld = (uMouse * 2.0 - 1.0) * 12.0; 
  float distToMouse = distance(rotatedPos.xy, mouseWorld);
  
  if (distToMouse < 8.0) {
    float force = pow((8.0 - distToMouse) / 8.0, 2.0) * 5.0; 
    vec2 dir = normalize(rotatedPos.xy - mouseWorld);
    float sMouse = sin(force * 0.8);
    float cMouse = cos(force * 0.8);
    vec2 vortex = vec2(dir.x * cMouse - dir.y * sMouse, dir.x * sMouse + dir.y * cMouse);
    rotatedPos.x += vortex.x * force;
    rotatedPos.y += vortex.y * force;
    rotatedPos.z += force * 1.5; 
  }

  vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
  gl_PointSize = (100.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  float distToCenter = length(pos);
  vAlpha = smoothstep(20.0, 0.0, distToCenter);
}
`;

const fragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  float glow = smoothstep(0.5, 0.0, dist);
  gl_FragColor = vec4(vColor, glow * vAlpha * 0.8);
}
`;

const WarmGalaxyVortex = ({ mousePos }) => {
  const pointsRef = useRef();
  const particleCount = 60000;
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    // Tonos cálidos (Melocotón, Naranja Suave, Arena/Dorado)
    const colorA = new THREE.Color('#D2A68D'); // Melocotón/Arena
    const colorB = new THREE.Color('#C67858'); // Naranja cálido
    const colorC = new THREE.Color('#E5C09F'); // Dorado pálido
    
    for (let i = 0; i < particleCount; i++) {
      const r = Math.pow(Math.random(), 2.0) * 15; 
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 20;
      
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      const mixedColor = new THREE.Color();
      const mixRatio = Math.random();
      
      if (mixRatio < 0.33) {
        mixedColor.lerpColors(colorA, colorB, mixRatio * 3.0);
      } else if (mixRatio < 0.66) {
        mixedColor.lerpColors(colorB, colorC, (mixRatio - 0.33) * 3.0);
      } else {
        mixedColor.lerpColors(colorC, colorA, (mixRatio - 0.66) * 3.0);
      }
      
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, []);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) }
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      pointsRef.current.material.uniforms.uMouse.value.lerp(mousePos, 0.15);
      pointsRef.current.rotation.y = state.clock.elapsedTime * -0.03;
      pointsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-customColor" count={particleCount} array={colors} itemSize={3} />
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

export default function UsersModule() {
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));

  const handlePointerMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = 1.0 - (e.clientY / window.innerHeight);
    setMousePos(new THREE.Vector2(x, y));
  };

  return (
    <section 
      id="usuarios"
      style={{ position: 'relative', width: '100vw', minHeight: '100vh', backgroundColor: '#050302' }}
      onPointerMove={handlePointerMove}
    >
      
      {/* Capa 3D de fondo */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <fog attach="fog" args={['#050302', 5, 25]} />
          <CameraRig mousePos={mousePos} />
          <WarmGalaxyVortex mousePos={mousePos} />
        </Canvas>
      </div>

      {/* Capa HTML UI */}
      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 10, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '8% 5% 2%',
        pointerEvents: 'none' // Para que los eventos del ratón pasen al Canvas en áreas vacías
      }}>
        
        {/* Top Text Grid */}
        <div className="responsive-flex-col" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          width: '100%',
          marginBottom: '6rem'
        }}>
          {/* Título */}
          <div style={{ flex: '1' }}>
            <h2 className="responsive-title" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '4.5vw',
              color: '#FFFFFF',
              fontWeight: 400,
              margin: 0,
              letterSpacing: '-0.02em',
              textShadow: '0 10px 30px rgba(0,0,0,0.5)',
              lineHeight: '1.1'
            }}>
              Usuarios
            </h2>
          </div>
          
          {/* Descripción */}
          <div style={{ flex: '1', maxWidth: '500px', display: 'flex', justifyContent: 'flex-end' }}>
            <p className="responsive-desc" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.1rem',
              lineHeight: '1.6',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              textAlign: 'left'
            }}>
              Tu peludo es parte de tu familia y merece estar siempre protegido. En Mi Huella Pet reunimos todo lo que necesitas para cuidar de él, mantener su información segura y contar con una comunidad que te acompaña cuando más la necesitas.
            </p>
          </div>
        </div>

        {/* Video con efecto 3D */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          pointerEvents: 'auto' // Reactiva eventos en el video
        }}>
          <div style={{ 
            transform: `perspective(1400px) rotateY(${(mousePos.x - 0.5) * 15}deg) rotateX(${(mousePos.y - 0.5) * -10}deg) translateX(${(mousePos.x - 0.5) * -30}px)`, 
            transformStyle: 'preserve-3d', 
            boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(210, 166, 141, 0.2)', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'transform 0.2s ease-out'
          }}>
            <video 
              className="responsive-video"
              src={videoLanding} 
              autoPlay 
              loop 
              muted 
              playsInline
              style={{ 
                width: '28vw', 
                maxWidth: '500px', 
                height: 'auto', 
                display: 'block' 
              }} 
            />
          </div>
        </div>

      </div>
    </section>
  );
}
