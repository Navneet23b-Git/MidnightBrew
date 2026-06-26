import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  "Awwwards Site of the Day",
  "World Coffee Roasters Cup 2024",
  "Michelin Guide Recommended",
  "Vogue Living 'Best Interiors'"
];

const PressSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.award-item',
        { opacity: 0, x: -50 },
        { 
          opacity: 1, x: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0a] py-24 px-4 md:px-16 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {awards.map((award, idx) => (
          <div key={idx} className="award-item border-l border-brand-gold/30 pl-6 relative overflow-hidden group">
            {/* Metallic wipe effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <h4 className="text-white/80 font-serif text-lg tracking-wide group-hover:text-brand-gold transition-colors">{award}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PressSection;
