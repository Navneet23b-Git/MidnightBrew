import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../../store/useStore';

const CinematicPreloader = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const setPreloaderFinished = useStore(state => state.setPreloaderFinished);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // We will listen for when the video ends, or we can set a fixed timeout
    const handleVideoEnd = () => {
      // Fade out the preloader container
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        onComplete: () => {
          setPreloaderFinished(true);
        }
      });
    };

    video.addEventListener('ended', handleVideoEnd);

    // Fallback just in case the video fails to load or play
    const fallbackTimeout = setTimeout(() => {
      if (containerRef.current && containerRef.current.style.opacity !== '0') {
        handleVideoEnd();
      }
    }, 8000); // Max 8 seconds fallback

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      clearTimeout(fallbackTimeout);
    };
  }, [setPreloaderFinished]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-black overflow-hidden"
    >
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/preloader/Midnight_Brew_intro_animation_1080p_202606241220.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default CinematicPreloader;
