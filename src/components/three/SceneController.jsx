import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function SceneController() {
  const { camera, gl } = useThree();
  const [isVisible, setIsVisible] = useState(true);
  const targetX = useRef(0);
  const targetY = useRef(0);

  // 1. Mouse coordinates listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize coordinate grid to [-0.5, 0.5]
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      // Target camera offsets
      targetX.current = nx * 1.5;
      targetY.current = -ny * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. Viewport visibility observer (IntersectionObserver)
  useEffect(() => {
    const canvasEl = gl.domElement;
    if (!canvasEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(canvasEl);
    return () => observer.disconnect();
  }, [gl]);

  const timeRef = useRef(0);

  // 3. Render frame loop (Mouse lerp and camera depth movements)
  useFrame((state, delta) => {
    // Performance: Early exit if out of view or tab is hidden
    if (!isVisible || document.hidden) return;

    timeRef.current += delta;
    const time = timeRef.current;

    // Slow idle camera orbit movement
    const idleX = Math.sin(time * 0.15) * 0.3;
    const idleY = Math.cos(time * 0.15) * 0.3;

    // Smooth linear interpolation (lerp) towards target coords + idle offset
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX.current + idleX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current + idleY, 0.05);
    
    // Always keep camera pointed at scene origin
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default SceneController;
