import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';
import { Coffee } from 'lucide-react';

const LivingCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const steamContainerRef = useRef(null);
  const { isCursorHovering } = useStore();

  useEffect(() => {
    // Hide default cursor on body
    document.body.classList.add('cursor-hide');

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const onMouseMove = (e) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);

      // Create steam particles
      if (Math.random() > 0.8) {
        createSteamParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.classList.remove('cursor-hide');
    };
  }, []);

  const createSteamParticle = (x, y) => {
    if (!steamContainerRef.current) return;
    
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full bg-white/20 pointer-events-none blur-md';
    const size = Math.random() * 20 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    steamContainerRef.current.appendChild(particle);

    gsap.fromTo(particle, 
      { x: x - size/2, y: y - size/2, opacity: 0.6, scale: 0.5 },
      { 
        y: y - 100 - Math.random() * 50, 
        x: x - size/2 + (Math.random() * 40 - 20),
        opacity: 0, 
        scale: 2, 
        duration: 2 + Math.random(), 
        ease: "power1.out",
        onComplete: () => {
          if (particle.parentNode === steamContainerRef.current) {
            steamContainerRef.current.removeChild(particle);
          }
        }
      }
    );
  };

  useEffect(() => {
    if (isCursorHovering) {
      gsap.to(cursorRef.current, { scale: 1.5, duration: 0.3 });
      gsap.to(followerRef.current, { scale: 2, borderColor: 'rgba(207, 168, 110, 0.8)', backgroundColor: 'rgba(207, 168, 110, 0.1)', duration: 0.3 });
    } else {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
      gsap.to(followerRef.current, { scale: 1, borderColor: 'rgba(255, 255, 255, 0.3)', backgroundColor: 'transparent', duration: 0.3 });
    }
  }, [isCursorHovering]);

  return (
    <>
      <div ref={steamContainerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]" />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-12 h-12 border border-white/30 rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{ transformOrigin: 'center' }}
      />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-brand-gold rounded-full pointer-events-none z-[10000] flex items-center justify-center mix-blend-screen shadow-[0_0_15px_rgba(207,168,110,0.8)]"
      >
        <Coffee size={8} className="text-black/80" strokeWidth={3} />
      </div>
    </>
  );
};

export default LivingCursor;
