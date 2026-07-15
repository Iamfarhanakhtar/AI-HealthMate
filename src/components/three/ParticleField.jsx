import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';

function ParticleField() {
  const pointsRef = useRef();
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // Detect reduced motion or small screens
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    setReduced(query.matches || isMobile);
  }, []);

  const particleCount = reduced ? 30 : 80;

  // Generate random positions
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a spherical region
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.2 + Math.random() * 2.0;

      arr[i] = r * Math.sin(phi) * Math.cos(theta);
      arr[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [particleCount]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.elapsedTime;
      // Slow rotation of the point cloud
      pointsRef.current.rotation.y = time * (reduced ? 0.01 : 0.03);
      pointsRef.current.rotation.x = time * (reduced ? 0.005 : 0.015);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00f2ff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.35}
      />
    </points>
  );
}

export default ParticleField;
