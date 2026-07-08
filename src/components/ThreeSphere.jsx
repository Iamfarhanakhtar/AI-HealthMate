import React from 'react';
import { Canvas } from '@react-three/fiber';

// Modular R3F components
import AmbientLights from './three/AmbientLights';
import AISphere from './three/AISphere';
import OrbitRings from './three/OrbitRings';
import ParticleField from './three/ParticleField';
import SceneController from './three/SceneController';

function ThreeSphere() {
  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] relative flex justify-center items-center z-10">
      {/* Soft background ambient radial lighting circle */}
      <div className="absolute w-[280px] h-[280px] rounded-full bg-primary/5 filter blur-3xl pointer-events-none"></div>

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 70 }}
        dpr={[1, 2]} // Clamp dpr to optimize performance on mobile
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      >
        <AmbientLights />
        <AISphere />
        <OrbitRings />
        <ParticleField />
        <SceneController />
      </Canvas>
    </div>
  );
}

export default ThreeSphere;
