// src/ScrollAnimation.js
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import img1 from './img/mobile-2.png';
import img2 from './img/mobile-3.png';

const Image = () => {
  const mesh = useRef();
  const texture1 = useLoader(THREE.TextureLoader, img1);
  const texture2 = useLoader(THREE.TextureLoader, img2);
  const scroll = useScroll();
  const [currentTexture, setCurrentTexture] = useState(texture1);
  
  useFrame(() => {
    const scrollY = scroll.range(0, 1);
    const newY = 1 - scrollY * 3;
    const newX = -scrollY * 2.5;

    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, newY, 0.1);
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, newX, 0.1);

    // Smoothly transition between textures
    if (scrollY > 0.5 && currentTexture !== texture2) {
      setCurrentTexture(texture2);
    } else if (scrollY <= 0.5 && currentTexture !== texture1) {
      setCurrentTexture(texture1);
    }
    
    mesh.current.material.map = currentTexture;
    mesh.current.material.needsUpdate = true;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[3, 5]} />
      <meshBasicMaterial map={currentTexture} transparent={true} />
    </mesh>
  );
};

const ScrollAnimation = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ScrollControls pages={2}>
        <Image />
      </ScrollControls>
    </Canvas>
  );
};

export default ScrollAnimation;
