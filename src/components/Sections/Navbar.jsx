import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isPreloaderFinished } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isPreloaderFinished) return null;

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-[8000] transition-all duration-500 border-b border-transparent px-8 py-4 flex justify-between items-center ${scrolled ? 'glass-panel !border-white/10 py-2' : ''}`}
    >
      <div className="text-3xl tracking-[0.2em] font-[Cinzel] uppercase font-bold flex items-center gap-2">
        MIDNIGHT
      </div>

      <div className="hidden md:flex items-center gap-12 text-base tracking-[0.2em] uppercase font-sans text-white/90">
        <a href="#story" className="hover:text-[#cfa86e] transition-colors">Story</a>
        <a href="#collection" className="hover:text-[#cfa86e] transition-colors">Collection</a>
        <a href="#masters" className="hover:text-[#cfa86e] transition-colors">Masters</a>
        <a href="#club" className="hover:text-[#cfa86e] transition-colors">Club</a>
      </div>

      <div className="flex items-center gap-8">
        <button className="hidden md:block px-8 py-3 border border-[#cfa86e]/50 text-[#cfa86e] text-base tracking-[0.2em] uppercase rounded-full hover:bg-[#cfa86e] hover:text-[#050505] transition-all duration-300">
          Reserve
        </button>
        <button className="text-white/80 hover:text-white">
          <Menu size={24} />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
