import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// We will update this dynamically based on the python extraction result
const TOTAL_FRAMES = 192; 

const MidnightScrollSequence = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState(0);
  const imagesRef = useRef([]);
  const playhead = useRef({ frame: 0 });

  // 1. Preload all images
  useEffect(() => {
    let loaded = 0;
    const images = [];
    
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/midnight-frames/${String(i).padStart(4, '0')}.webp`;
      
      img.onload = () => {
        loaded++;
        setLoadedImages(loaded);
        if (loaded === 1 && canvasRef.current) {
          // Draw first frame as soon as it's ready
          renderFrame(0);
        }
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, []);

  // 2. Setup ScrollTrigger
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || loadedImages < TOTAL_FRAMES * 0.5) return;

    const ctx = canvasRef.current.getContext('2d');
    
    // Create the scrub animation
    const scrollAnimation = gsap.to(playhead.current, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: () => "top " + (document.querySelector('nav')?.offsetHeight || 60) + "px",
        end: "+=4000", // 4000px of scrolling for the whole sequence
        scrub: 0.5,     // 0.5s smoothing on scrub
        pin: true,      // Pin the section while scrolling
        onUpdate: () => renderFrame(playhead.current.frame)
      }
    });

    // Cleanup
    return () => {
      if (scrollAnimation.scrollTrigger) {
        scrollAnimation.scrollTrigger.kill();
      }
      scrollAnimation.kill();
    };
  }, [loadedImages]);

  // 3. Render function for drawing image to canvas with object-cover behavior
  const renderFrame = (index) => {
    if (!canvasRef.current || !imagesRef.current[index]) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[index];

    // Handle canvas resizing
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Calculate aspect ratio to emulate "object-fit: cover" with an extra zoom to hide encoded black borders
    const ZOOM_FACTOR = 1.35; // 35% extra zoom
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width * ZOOM_FACTOR;
    let drawHeight = canvas.height * ZOOM_FACTOR;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = drawWidth / imgRatio;
    } else {
      // Canvas is taller than image
      drawWidth = drawHeight * imgRatio;
    }
    
    let offsetX = (canvas.width - drawWidth) / 2;
    let offsetY = (canvas.height - drawHeight) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* Loading Overlay */}
      {loadedImages < TOTAL_FRAMES && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-[#cfa86e] font-serif text-2xl tracking-widest animate-pulse">
            BREWING... {Math.round((loadedImages / TOTAL_FRAMES) * 100)}%
          </div>
        </div>
      )}

      <div className="absolute inset-0 origin-center">
        {/* Canvas Layer */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full block"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* We can use standard GSAP ScrollTrigger to fade these in/out, or CSS sticking */}
          <div className="w-full h-[4000px] absolute top-0 left-0">
           {/* Section 1 */}
           <div className="absolute top-[500px] left-10 md:left-32 w-full max-w-md">
             <h2 className="text-5xl md:text-7xl font-serif text-white drop-shadow-2xl">The Midnight Brew</h2>
             <p className="text-white/80 mt-4 text-lg">A meticulous extraction process captured in perfect clarity.</p>
           </div>
           
           {/* Section 2 */}
           <div className="absolute top-[2000px] right-10 md:right-32 w-full max-w-md text-right">
             <h2 className="text-5xl md:text-7xl font-serif text-[#cfa86e] drop-shadow-2xl">Perfect Landing</h2>
             <p className="text-white/80 mt-4 text-lg">Every drop falls flawlessly, creating an oasis of pure flavor.</p>
           </div>

           {/* Section 3 */}
           <div className="absolute top-[3500px] left-1/2 -translate-x-1/2 w-full text-center">
             <h2 className="text-6xl md:text-8xl font-serif text-white drop-shadow-2xl mb-8">Savor The Moment</h2>
             <button className="pointer-events-auto px-8 py-4 border-2 border-[#cfa86e] text-[#cfa86e] font-bold tracking-[0.2em] uppercase hover:bg-[#cfa86e] hover:text-black transition-colors rounded-full">
               Reserve Your Experience
             </button>
           </div>
        </div>
      </div>
      </div>

    </section>
  );
};

export default MidnightScrollSequence;
