import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const masters = [
  {
    name: "Elena Rossi",
    experience: "15 Years",
    specialty: "Siphon & Pour Over",
    awards: "World Brewers Cup Champion 2023",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "James Chen",
    experience: "12 Years",
    specialty: "Latte Art & Espresso",
    awards: "National Latte Art Champion 2022",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Sophia Martinez",
    experience: "10 Years",
    specialty: "Roasting & Sourcing",
    awards: "Q Grader Certified",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
  }
];

const MasterCard = ({ master }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-[600px] overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Portrait */}
      <img 
        src={master.img} 
        alt={master.name} 
        className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-brand-gold mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

      {/* Floating Particles (Simulated with simple divs) */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, x: Math.random() * 200 - 100, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: -200 - Math.random() * 100,
                  x: Math.random() * 200 - 100,
                  scale: Math.random() * 2 + 1
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity, 
                  delay: Math.random() * 2 
                }}
                className="absolute bottom-0 left-1/2 w-1 h-1 bg-brand-gold rounded-full blur-[1px]"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Content Reveal */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
        <h3 className="text-3xl font-serif text-white mb-1 group-hover:text-brand-gold transition-colors duration-300">{master.name}</h3>
        <p className="text-white/60 text-sm tracking-widest uppercase mb-6">{master.specialty}</p>

        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-brand-gold/30 space-y-3 pb-2">
            <div>
              <span className="block text-[10px] text-white/40 uppercase tracking-widest">Experience</span>
              <span className="text-white text-sm">{master.experience}</span>
            </div>
            <div>
              <span className="block text-[10px] text-white/40 uppercase tracking-widest">Accolades</span>
              <span className="text-white text-sm">{master.awards}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gold Glow Outline */}
      <div className="absolute inset-4 border border-brand-gold/0 group-hover:border-brand-gold/50 transition-colors duration-700 pointer-events-none" />
    </div>
  );
};

const MeetTheMasters = () => {
  return (
    <section id="masters" className="w-full bg-[#050505] py-2 px-4 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm tracking-[0.4em] uppercase text-brand-gold font-bold mb-4">The Artisans</h2>
          <h3 className="text-5xl md:text-7xl font-serif metal-text">Meet the Masters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {masters.map((master, index) => (
            <MasterCard key={index} master={master} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheMasters;
