import React from 'react';

function AmbientLights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} color="#00f2ff" intensity={1.8} />
      <pointLight position={[-5, -5, -5]} color="#7318ff" intensity={1.2} />
    </>
  );
}

export default AmbientLights;
