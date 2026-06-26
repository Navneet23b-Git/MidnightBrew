import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, Html, ContactShadows, Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

function FloatingBean({ onClick, isClicked }) {
  const beanRef = useRef();

  useFrame((state) => {
    if (!isClicked && beanRef.current) {
      beanRef.current.rotation.y += 0.005;
      beanRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} floatIntensity={1.5} rotationIntensity={0.5}>
      <group 
        ref={beanRef} 
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
        scale={isClicked ? 1.5 : 1}
      >
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.5, 64, 64]} />
          {/* Deform sphere slightly to look more like a bean */}
          <meshStandardMaterial 
            color="#3d2314" 
            roughness={0.4} 
            metalness={0.1}
            bumpScale={0.02}
          />
        </mesh>
        {/* Bean Crevice */}
        <mesh position={[0, 0, 1.4]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.1, 2.5, 0.2]} />
          <meshStandardMaterial color="#1a0f08" />
        </mesh>
      </group>
    </Float>
  );
}

const CoffeeOriginExperience = () => {
  const [activeRegion, setActiveRegion] = useState(false);

  return (
    <section className="relative w-full h-screen bg-[#111] overflow-hidden flex items-center justify-center">
      <div className="absolute top-16 left-8 md:left-16 z-20 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-serif metal-text">The Origin</h2>
        <p className="text-white/50 tracking-widest uppercase text-xs mt-2">Interact to discover</p>
      </div>

      <div className="w-full h-full absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <PresentationControls 
            global 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }} 
            rotation={[0, 0, 0]} 
            polar={[-Math.PI / 4, Math.PI / 4]} 
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            <FloatingBean onClick={() => setActiveRegion(!activeRegion)} isClicked={activeRegion} />
          </PresentationControls>
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={15} blur={2} far={4} />
          <Environment preset="studio" />
        </Canvas>
      </div>

      <AnimatePresence>
        {activeRegion && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 w-80 glass-panel p-8 z-20 rounded-xl pointer-events-auto border-l-2 border-brand-gold"
          >
            <h3 className="text-2xl font-serif text-brand-gold mb-2">Ethiopia Yirgacheffe</h3>
            <div className="space-y-4 text-sm text-white/80">
              <div>
                <span className="block text-white/50 uppercase tracking-wider text-xs mb-1">Roast Level</span>
                <span className="font-semibold text-white">Light - Medium</span>
              </div>
              <div>
                <span className="block text-white/50 uppercase tracking-wider text-xs mb-1">Elevation</span>
                <span className="font-semibold text-white">1,700 - 2,200m</span>
              </div>
              <div>
                <span className="block text-white/50 uppercase tracking-wider text-xs mb-1">Tasting Notes</span>
                <span className="font-semibold text-white">Jasmine, Bergamot, Blueberry, Honey</span>
              </div>
              <p className="pt-4 border-t border-white/10 text-xs leading-relaxed text-white/60">
                Known for its bright, floral, and tea-like characteristics, this single-origin bean represents the pinnacle of African coffee craftsmanship.
              </p>
            </div>
            
            <button 
              className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-brand-gold uppercase tracking-widest text-xs transition-colors"
              onClick={() => setActiveRegion(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CoffeeOriginExperience;
