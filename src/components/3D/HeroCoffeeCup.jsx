import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows, Text, Center } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroCoffeeCup(props) {
  const cupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cupRef.current) {
      // Subtle hovering effect
      cupRef.current.position.y = Math.sin(t / 2) / 10;
      // Very slow luxury rotation
      cupRef.current.rotation.y = Math.sin(t / 4) * 0.05; 
      cupRef.current.rotation.z = Math.sin(t / 6) * 0.02;
    }
  });

  return (
    <PresentationControls 
      global 
      config={{ mass: 2, tension: 500 }} 
      snap={{ mass: 4, tension: 1500 }} 
      // Restrict rotation to 5-8 degrees to keep it premium and stop it disappearing
      rotation={[0.1, -0.2, 0]} 
      polar={[-0.1, 0.1]} 
      azimuth={[-0.15, 0.15]}
    >
      <Float speed={1.5} rotationIntensity={0} floatIntensity={1}>
        <group ref={cupRef} {...props} dispose={null} scale={1.3}>
          
          {/* Main Cup Body - Luxury Black Chrome, Tapered without handle */}
          <mesh castShadow receiveShadow position={[0, 0, 0]}>
            {/* Tapered cylinder: radiusTop=1.4, radiusBottom=1.0 */}
            <cylinderGeometry args={[1.4, 1.0, 2.5, 64]} />
            <meshPhysicalMaterial 
              color="#050505" 
              metalness={0.9} 
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={2}
            />
          </mesh>

          {/* Gold Rim Highlight */}
          <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
            <torusGeometry args={[1.4, 0.03, 16, 64]} />
            <meshStandardMaterial 
              color="#cfa86e" 
              metalness={1} 
              roughness={0.1} 
            />
          </mesh>

          {/* Liquid inside */}
          <mesh receiveShadow position={[0, 1.15, 0]}>
            <cylinderGeometry args={[1.35, 1.35, 0.05, 64]} />
            <meshPhysicalMaterial 
              color="#1a0b02" 
              metalness={0.1} 
              roughness={0.2}
              transmission={0.2} 
              ior={1.5}
            />
          </mesh>

          {/* Logo element on the cup */}
          <group position={[0, 0, 1.15]} rotation={[0, 0, 0]}>
            {/* Simple Coffee Bean Representation */}
            <mesh position={[0, 0.3, 0]} scale={[0.15, 0.25, 0.05]}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#cfa86e" metalness={1} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.3, 0.03]} scale={[0.02, 0.24, 0.05]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
            </mesh>
            
            {/* Text logo */}
            <Text
              position={[0, -0.15, 0]}
              fontSize={0.15}
              letterSpacing={0.2}
              font="https://fonts.gstatic.com/s/cinzel/v19/8vIJ7ww63mVu7gtR-zHDsA.woff"
              color="#cfa86e"
              anchorX="center"
              anchorY="middle"
            >
              MIDNIGHT
            </Text>
            <Text
              position={[0, -0.35, 0]}
              fontSize={0.08}
              letterSpacing={0.4}
              color="#cfa86e"
              anchorX="center"
              anchorY="middle"
            >
              BREW
            </Text>
          </group>

        </group>
      </Float>
      
      {/* Dynamic contact shadow that moves slightly with the cup */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.8} scale={15} blur={3} far={5} color="#cfa86e" />
      
      {/* HDRI Environment for realistic reflections */}
      <Environment preset="city" environmentIntensity={0.8} />
      
      {/* Additional Volumetric-like lights */}
      <spotLight position={[5, 10, 5]} intensity={2.5} angle={0.4} penumbra={1} color="#cfa86e" castShadow />
      <spotLight position={[-5, 5, -5]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />
      <pointLight position={[0, -2, 2]} intensity={1} color="#cfa86e" distance={10} />
    </PresentationControls>
  );
}
