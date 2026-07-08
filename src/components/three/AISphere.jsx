import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function AISphere() {
  const innerRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.25;
      // Core pulsing amplitude
      const scale = 1.0 + Math.sin(time * 2.2) * 0.05;
      innerRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Outer Shell: Translucent glass sphere */}
      <mesh>
        <sphereGeometry args={[2.0, 48, 48]} />
        <meshPhongMaterial
          color="#00f2ff"
          transparent
          opacity={0.15}
          shininess={100}
          specular="#ffffff"
        />
      </mesh>

      {/* Inner Core: Glowing emissive wireframe sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshStandardMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={1.8}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default AISphere;
