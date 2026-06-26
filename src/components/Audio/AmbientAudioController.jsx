import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store/useStore';
import { Volume2, VolumeX, Music, Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AmbientAudioController = () => {
  const { isAudioPlaying, toggleAudio } = useStore();
  const audioRef = useRef(null);
  const [showControls, setShowControls] = useState(false);

  // Using a royalty-free ambient sound (placeholder)
  const AUDIO_URL = "https://cdn.pixabay.com/download/audio/2022/01/18/audio_0cbaf15cf1.mp3?filename=cafe-ambience-8062.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed", e));
        audioRef.current.volume = 0.4;
      } else {
        audioRef.current.pause();
      }
    }
  }, [isAudioPlaying]);

  return (
    <div 
      className="fixed bottom-8 left-8 z-[9000] flex items-center gap-4"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <audio ref={audioRef} src={AUDIO_URL} loop />
      
      <button 
        onClick={toggleAudio}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-brand-gold hover:bg-white/10 transition-colors relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-brand-gold/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <span className="relative z-10">
          {isAudioPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </span>
      </button>

      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-panel px-4 py-2 rounded-full flex items-center gap-3 text-sm text-white/80"
          >
            <div className={`flex items-center gap-2 ${isAudioPlaying ? 'text-brand-gold' : ''}`}>
              <Coffee size={14} />
              <span>Café Ambience</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  animate={{ height: isAudioPlaying ? [4, 12, 4] : 4 }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-1 bg-brand-gold rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AmbientAudioController;
