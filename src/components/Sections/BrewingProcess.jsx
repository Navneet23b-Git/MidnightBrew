import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { title: "Bean Selection", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1974&auto=format&fit=crop" },
  { title: "Artisan Roasting", img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1974&auto=format&fit=crop" },
  { title: "Precision Grinding", img: "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?q=80&w=1974&auto=format&fit=crop" },
  { title: "Perfect Extraction", img: "https://images.unsplash.com/photo-1514432324607-a125290ca2ca?q=80&w=2070&auto=format&fit=crop" },
  { title: "The Presentation", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop" }
];

const BrewingProcess = () => {
  const containerRef = useRef(null);
  const smokeContainerRef = useRef(null);

  useEffect(() => {
    // Stage Animations
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.process-item');
      
      items.forEach((item, i) => {
        const img = item.querySelector('.process-img');
        const text = item.querySelector('.process-text');
        
        gsap.fromTo(img, 
          { scale: 1.2, opacity: 0, filter: 'blur(10px)' },
          { 
            scale: 1, opacity: 1, filter: 'blur(0px)',
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 30%",
              scrub: 1
            }
          }
        );

        gsap.fromTo(text,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 70%",
              end: "top 40%",
              scrub: 1
            }
          }
        );
      });

      // Scroll-Based Aroma Engine (Smoke reacting to velocity)
      let smokeParticles = [];
      for(let i=0; i<30; i++) {
        const el = document.createElement('div');
        el.className = 'absolute w-32 h-32 bg-white/5 rounded-full blur-[40px] pointer-events-none mix-blend-screen';
        smokeContainerRef.current.appendChild(el);
        smokeParticles.push({ el, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight });
        
        gsap.set(el, { x: smokeParticles[i].x, y: smokeParticles[i].y });
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = self.getVelocity() / 100; // Normalize
          smokeParticles.forEach(p => {
            gsap.to(p.el, {
              y: `-=${velocity * 2 + 5}`, // Move up faster when scrolling fast
              x: `+=${Math.sin(p.y/100) * 5}`,
              duration: 0.5,
              ease: "power1.out",
              onComplete: () => {
                // Reset if goes off screen
                const rect = p.el.getBoundingClientRect();
                if (rect.bottom < 0) {
                  gsap.set(p.el, { y: window.innerHeight + 100, x: Math.random() * window.innerWidth });
                }
              }
            });
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#111] py-2 overflow-hidden">
      {/* Smoke Container */}
      <div ref={smokeContainerRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-16 relative z-10">
        <div className="text-center mb-32">
          <h2 className="text-sm tracking-[0.4em] uppercase text-brand-gold font-bold mb-4">The Methodology</h2>
          <h3 className="text-5xl md:text-7xl font-serif metal-text">Brewing Process</h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent transform md:-translate-x-1/2" />

          {stages.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`process-item relative flex flex-col md:flex-row items-center justify-between mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-brand-gold transform -translate-x-1/2 shadow-[0_0_15px_rgba(207,168,110,0.8)] z-20" />

                <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${isEven ? 'md:text-left md:pr-12' : 'md:text-right md:pl-12'}`}>
                  <div className="process-text">
                    <span className="text-brand-gold/50 font-serif text-2xl mb-2 block">0{idx + 1}</span>
                    <h4 className="text-3xl md:text-4xl font-serif text-white mb-4">{stage.title}</h4>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Every step is calibrated to perfection. We believe that true luxury lies in the obsessive attention to detail at every phase of the journey.
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-5/12 mt-8 md:mt-0 pl-12 md:pl-0">
                  <div className="process-img relative overflow-hidden rounded-sm aspect-[4/3]">
                    <img src={stage.img} alt={stage.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-brand-dark/20" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrewingProcess;
