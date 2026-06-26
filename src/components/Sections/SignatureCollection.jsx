import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Coffee, ArrowRight, ArrowLeft, LayoutGrid } from 'lucide-react';

const drinks = [
  {
    id: 1,
    num: "01",
    name: "Midnight Espresso",
    desc: "Our signature dark roast, intense and velvety.",
    img: "/signature/1.png"
  },
  {
    id: 2,
    num: "02",
    name: "Vanilla Silk Latte",
    desc: "Infused with smooth vanilla for a delicate, silky finish.",
    img: "/signature/2.png"
  },
  {
    id: 3,
    num: "03",
    name: "Golden Pour Over",
    desc: "Single-origin Ethiopian poured over 24k gold filter.",
    img: "/signature/3.png"
  },
  {
    id: 4,
    num: "04",
    name: "Smoked Caramel Macchiato",
    desc: "Hickory smoked caramel over layered espresso.",
    img: "/signature/4.png"
  },
  {
    id: 5,
    num: "05",
    name: "Kyoto Cold Brew",
    desc: "12-hour slow drip over crystal clear ice.",
    img: "/signature/5.png"
  },
  {
    id: 6,
    num: "06",
    name: "Matcha Velvet",
    desc: "Ceremonial grade matcha blended with sweet cream.",
    img: "/signature/6.png"
  }
];

const SignatureCard = ({ drink }) => {
  return (
    <div className="group relative flex-shrink-0 w-[240px] md:w-[280px] h-[400px] md:h-[460px] snap-center cursor-pointer perspective-1000">
      <div className="w-full h-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10 group-hover:border-[#cfa86e] transition-colors duration-500 flex flex-col relative group-hover:shadow-[0_0_30px_rgba(207,168,110,0.15)] group-hover:-translate-y-2 transform preserve-3d ease-out">
        
        {/* Number */}
        <div className="absolute top-6 left-6 z-20">
          <span className="text-[#cfa86e] text-2xl font-[Cinzel]">{drink.num}</span>
          <div className="w-6 h-px bg-[#cfa86e] mt-1" />
        </div>

        {/* Image Container */}
        <div className="relative h-[55%] w-full overflow-hidden flex items-center justify-center pt-8">
          {/* Subtle gradient to mask the top/bottom of image slightly */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 opacity-60 pointer-events-none" />
          
          <img 
            src={drink.img} 
            alt={drink.name}
            className="w-[85%] h-[85%] object-cover object-center rounded-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 relative z-0 mix-blend-lighten"
          />

          {/* Hover Circle Arrow (like reference "Vanilla Silk Latte") */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-10 h-10 rounded-full border border-[#cfa86e] bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center text-[#cfa86e]">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-20">
          <div>
            <h3 className="text-xl md:text-2xl font-[Cinzel] text-[#e0e0e0] mb-3 uppercase tracking-wide group-hover:text-white transition-colors">
              {drink.name}
            </h3>
            <p className="text-[#a0a0a0] text-xs md:text-sm font-[Inter] font-light leading-relaxed">
              {drink.desc}
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <span className="text-[#cfa86e] text-xs tracking-[0.2em] uppercase font-bold">Discover</span>
            <ArrowRight size={12} className="text-[#cfa86e] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};

const SignatureCollection = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -304, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 304, behavior: 'smooth' });
    }
  };

  return (
    <section id="collection" className="w-full relative py-2 flex flex-col justify-center overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/signature/bg.png" 
          alt="Atmosphere" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 sm:px-8 flex flex-col h-full">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 pt-10">
          <span className="text-[#cfa86e] text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold mb-6">
            The Signature Collection
          </span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-[Cinzel] text-white uppercase tracking-widest max-w-4xl leading-[1.2] mb-8">
            Crafted To Defy<br/><span className="text-[#cfa86e]">Expectations.</span>
          </h2>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 sm:w-24 h-px bg-[#cfa86e]/30" />
            <div className="w-8 h-8 rounded-full border border-[#cfa86e]/30 flex items-center justify-center bg-[#050505]/50 backdrop-blur">
              <Coffee size={14} className="text-[#cfa86e]" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-[#cfa86e]/30" />
          </div>

          <p className="text-[#a0a0a0] text-sm md:text-base font-[Inter] font-light max-w-lg">
            Six exceptional creations. Each with a story,<br className="hidden sm:block"/> designed to elevate your moment.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative w-full flex items-center justify-center px-4 sm:px-12">
          
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="hidden xl:flex absolute left-0 z-30 w-12 h-12 rounded-full border border-[#cfa86e]/50 text-[#cfa86e] items-center justify-center hover:bg-[#cfa86e] hover:text-[#050505] transition-all bg-[#050505]/80 backdrop-blur"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Scroll Container */}
          <div 
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto w-full snap-x snap-mandatory hide-scrollbar pb-10 pt-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {drinks.map(drink => (
              <SignatureCard key={drink.id} drink={drink} />
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="hidden xl:flex absolute right-0 z-30 w-12 h-12 rounded-full border border-[#cfa86e]/50 text-[#cfa86e] items-center justify-center hover:bg-[#cfa86e] hover:text-[#050505] transition-all bg-[#050505]/80 backdrop-blur"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-12 mb-8 flex justify-center">
          <a href="#menu" className="flex items-center gap-3 px-8 py-3 border border-[#cfa86e]/30 text-[#cfa86e] text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-[#cfa86e]/10 transition-colors bg-[#050505]/50 backdrop-blur">
            <LayoutGrid size={14} />
            View Full Menu
          </a>
        </div>

      </div>

      {/* Global Style to hide scrollbar in Webkit browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default SignatureCollection;
