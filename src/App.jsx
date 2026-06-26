import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useStore } from './store/useStore';
import CinematicPreloader from './components/Preloader/CinematicPreloader';
import LivingCursor from './components/Cursor/LivingCursor';
import AmbientAudioController from './components/Audio/AmbientAudioController';
import Navbar from './components/Sections/Navbar';
import Hero from './components/Sections/Hero';
import StorySection from './components/Sections/StorySection';
import CoffeeOriginExperience from './components/Sections/CoffeeOriginExperience';
import SignatureCollection from './components/Sections/SignatureCollection';
import InteractiveMenu from './components/Sections/InteractiveMenu';
import Gallery from './components/Sections/Gallery';
import MidnightScrollSequence from './components/Sections/MidnightScrollSequence';
import MeetTheMasters from './components/Sections/MeetTheMasters';
import BrewingProcess from './components/Sections/BrewingProcess';
import Testimonials from './components/Sections/Testimonials';
import MembershipClub from './components/Sections/MembershipClub';
import AIAssistant from './components/Sections/AIAssistant';
import Reservation from './components/Sections/Reservation';
import PressSection from './components/Sections/PressSection';
import Footer from './components/Sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { isPreloaderFinished, theme, setTheme } = useStore();
  const mainRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Dynamic Day/Night Logic
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTheme('morning');
    else if (hour >= 12 && hour < 18) setTheme('afternoon');
    else setTheme('night');

    return () => {
      lenis.destroy();
    };
  }, [setTheme]);

  return (
    <div className={`relative min-h-screen bg-brand-dark transition-colors duration-1000 ${theme === 'morning' ? 'bg-[#2A241F]' : theme === 'afternoon' ? 'bg-[#1C1814]' : 'bg-[#0a0a0a]'}`}>
      <LivingCursor />
      {!isPreloaderFinished && <CinematicPreloader />}
      
      <AmbientAudioController />
      <Navbar />
      <AIAssistant />

      <main ref={mainRef} className="opacity-0 transition-opacity duration-1000" style={{ opacity: isPreloaderFinished ? 1 : 0 }}>
        <Hero />
        <StorySection />
        {/* <CoffeeOriginExperience /> */}
        <SignatureCollection />
        <InteractiveMenu />
        {/* <Gallery /> */}
        <MidnightScrollSequence />
        <MeetTheMasters />
        {/* <BrewingProcess /> */}
        <Testimonials />
        <MembershipClub />
        <Reservation />
        {/* <PressSection /> */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
