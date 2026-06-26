import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

const drinks = [
  {
    id: 0,
    title: "MATCHA\nLATTE",
    subtitle: "Refreshing matcha blended with smooth milk for a perfect balance.",
    bgColors: ["#2A2D24", "#11120D"],
    image: "/hero/matcha.png",
    name: "MATCHA",
    type: "LATTE",
    particleText: "✦ ✧ ✦"
  },
  {
    id: 1,
    title: "STRAWBERRY\nCREAM",
    subtitle: "Sweet strawberry cream with a smooth, fruity and creamy finish.",
    bgColors: ["#3B2529", "#1A0F11"],
    image: "/hero/strawberry.png",
    name: "STRAWBERRY",
    type: "CREAM",
    particleText: "✧ ✦ ✧"
  },
  {
    id: 2,
    title: "CARAMEL\nCRUNCH",
    subtitle: "Rich caramel meets bold espresso for the perfect sweet indulgence.",
    bgColors: ["#3D2C1B", "#1A1108"],
    image: "/hero/caramel.png",
    name: "CARAMEL",
    type: "CRUNCH",
    particleText: "✦ ✧ ✦"
  },
  {
    id: 3,
    title: "CHOCO\nMOCHA",
    subtitle: "Decadent chocolate blended with espresso for a bold delight.",
    bgColors: ["#2B1E16", "#120B07"],
    image: "/hero/choco.png",
    name: "CHOCO",
    type: "MOCHA",
    particleText: "✧ ✦ ✧"
  }
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { isPreloaderFinished } = useStore();
  const timerRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // Autoplay Logic
  useEffect(() => {
    if (!isPreloaderFinished || !isAutoPlaying) return;

    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % drinks.length);
    }, 2000);

    return () => clearInterval(timerRef.current);
  }, [isPreloaderFinished, isAutoPlaying]);

  // Handle Manual Navigation
  const handleNavigate = (newIndex) => {
    if (newIndex === activeIndex) return;
    
    // Determine direction for animation
    setDirection(newIndex > activeIndex ? 1 : -1);
    // Wrap around for arrows
    if (newIndex < 0) newIndex = drinks.length - 1;
    if (newIndex >= drinks.length) newIndex = 0;
    
    setActiveIndex(newIndex);
    pauseAutoplay();
  };

  const pauseAutoplay = () => {
    setIsAutoPlaying(false);
    clearInterval(timerRef.current);
    clearTimeout(pauseTimeoutRef.current);
    
    // Resume after 3 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const activeDrink = drinks[activeIndex];

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 50 : -50,
      scale: 0.95
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -50 : 50,
      scale: 1.05,
      transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }
    })
  };

  const textVariants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 20 : -20 }),
    center: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -20 : 20, transition: { duration: 0.4 } })
  };

  if (!isPreloaderFinished) return <section className="h-screen w-full bg-[#050505]" />;

  return (
    <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-between overflow-hidden bg-[#050505]">
      
      {/* Dynamic Background Colors */}
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at center, ${activeDrink.bgColors[0]} 0%, ${activeDrink.bgColors[1]} 100%)`
          }}
        />
      </AnimatePresence>

      {/* Dynamic Ambient Glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none z-[1]" />
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 z-[1] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen animate-[pulse_4s_ease-in-out_infinite]" />

      {/* Giant Background Text */}
      <div className="absolute inset-0 z-[2] flex justify-center items-start pt-16 md:pt-24 pointer-events-none select-none overflow-hidden scale-[0.87] origin-top">
        <h1 
          className="text-[22vw] md:text-[20vw] font-[Inter] font-black text-white/[0.06] uppercase tracking-tighter whitespace-nowrap leading-none"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
        >
          COFFEE
        </h1>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 flex-1 flex items-stretch py-10 md:py-20 justify-between pointer-events-none scale-[0.87] origin-center">
        
        {/* Left Arrow */}
        <button 
          onClick={() => handleNavigate(activeIndex - 1)}
          className="pointer-events-auto self-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#cfa86e]/30 flex items-center justify-center text-[#cfa86e] hover:bg-[#cfa86e] hover:text-black transition-all duration-300 z-30 shrink-0"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Center Canvas */}
        <div className="flex-1 w-full h-full relative pointer-events-none">
          
          {/* Center Product Image with Glow */}
          <div className="absolute inset-0 flex justify-center items-center md:items-end z-20 pointer-events-none">
            {/* Glow Behind Cup */}
            <AnimatePresence>
              <motion.div 
                key={`glow-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
                className="absolute w-[280px] md:w-[500px] h-[280px] md:h-[500px] rounded-full blur-[60px] md:blur-[100px] translate-y-[60px] md:translate-y-[140px]"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              />
            </AnimatePresence>

            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.img
                key={activeIndex}
                src={activeDrink.image}
                alt={activeDrink.title.replace('\n', ' ')}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="max-h-[360px] md:max-h-[550px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10 translate-y-[60px] md:translate-y-[140px]"
              />
            </AnimatePresence>
            
            {/* Subtle Floating Particles tied to drink */}
            <AnimatePresence>
              <motion.div 
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex justify-center items-center pointer-events-none text-[#cfa86e]/30 text-xl tracking-[1.5em] animate-[spin_30s_linear_infinite]"
              >
                {activeDrink.particleText}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Text Block */}
          <div className="absolute left-2 md:left-24 top-1/2 -translate-y-1/2 flex flex-col justify-center z-30 pointer-events-auto w-[250px] md:w-[350px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-[Cinzel] text-[#cfa86e] leading-tight mb-4 whitespace-pre-line drop-shadow-lg">
                  {activeDrink.title}
                </h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[1px] bg-[#cfa86e]/60" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#cfa86e]" />
                  <div className="w-6 h-[1px] bg-[#cfa86e]/60" />
                </div>
                
                <p className="text-white/80 font-[Inter] font-light text-xs md:text-sm leading-relaxed mb-8 drop-shadow-md">
                  {activeDrink.subtitle}
                </p>

                <button className="group flex items-center justify-center md:justify-start w-fit gap-3 px-6 py-3 border border-[#cfa86e] text-[#cfa86e] font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-[#cfa86e] hover:text-black transition-all duration-500 rounded-full shadow-[0_0_20px_rgba(207,168,110,0.1)] hover:shadow-[0_0_30px_rgba(207,168,110,0.4)]">
                  ORDER NOW
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => handleNavigate(activeIndex + 1)}
          className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#cfa86e]/30 flex items-center justify-center text-[#cfa86e] hover:bg-[#cfa86e] hover:text-black transition-all duration-300 z-30 shrink-0"
        >
          <ChevronRight size={20} />
        </button>

        {/* Right Navigation Controls (Dots) */}
        <div className="hidden md:flex flex-col items-center gap-4 absolute right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
          {drinks.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigate(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${idx === activeIndex ? 'bg-[#cfa86e] scale-125 shadow-[0_0_10px_rgba(207,168,110,0.8)]' : 'bg-white/20 hover:bg-white/40'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Curved Bottom Section with Drink Selector */}
      <div className="relative w-full h-[200px] md:h-[260px] mt-auto z-40 shrink-0 pointer-events-none">
        
        {/* The Exact Golden Curve Shape via SVG */}
        <div className="absolute inset-0 w-full h-full drop-shadow-[0_-20px_40px_rgba(0,0,0,0.9)]">
          <svg 
            viewBox="0 0 1440 300" 
            className="w-full h-full" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,300 L1440,300 L1440,220 Q720,-50 0,220 Z" 
              fill="url(#curve-grad)" 
              stroke="rgba(207, 168, 110, 0.5)" 
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="curve-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1C140C" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Drink Selector Items */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex justify-center items-end gap-6 md:gap-16 px-4 pointer-events-auto">
          {drinks.map((drink, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button 
                key={drink.id}
                onClick={() => handleNavigate(idx)}
                className="flex items-center gap-3 group"
              >
                <div className={`relative flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-100'}`}>
                  
                  {/* Glowing Ring for Active Item */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeRing"
                      className="absolute inset-0 rounded-full border border-[#cfa86e] shadow-[0_0_15px_rgba(207,168,110,0.6)] z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Thumbnail Image */}
                  <img 
                    src={drink.image} 
                    alt={drink.name} 
                    className="w-full h-full object-contain scale-[1.3] drop-shadow-xl z-10" 
                  />
                </div>

                {/* Text Labels */}
                <div className={`hidden sm:flex flex-col text-left transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'}`}>
                  <span className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold ${isActive ? 'text-[#cfa86e]' : 'text-white'}`}>
                    {drink.name}
                  </span>
                  <span className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase ${isActive ? 'text-white/80' : 'text-white/40'}`}>
                    {drink.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
