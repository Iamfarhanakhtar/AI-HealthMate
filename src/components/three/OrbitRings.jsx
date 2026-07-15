import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function OrbitRings() {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const time = timeRef.current;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = time * 0.18;
      ring1Ref.current.rotation.x = time * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 0.12;
      ring2Ref.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group>
      {/* Primary Orbit Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.015, 8, 64]} />
        <meshBasicMaterial color="#00ffcc" transparent opacity={0.25} />
      </mesh>

      {/* Secondary Crossed Orbit Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.7, 0.01, 8, 64]} />
        <meshBasicMaterial color="#e3d4ff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default OrbitRings;
