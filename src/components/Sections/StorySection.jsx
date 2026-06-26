import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mountain, Leaf, Hand, TreePine, Flame, Timer, Thermometer, 
  Grid, Target, Droplet, Coffee, Settings, Heart, ArrowRight 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stories = [
  {
    num: "01",
    title: "The Origin",
    desc: "Cultivated in high-altitude volcanic soil, where the perfect climate and rich minerals give our beans their distinctive character.",
    stats: [
      { label: "ALTITUDE", value: "1800m", icon: Mountain },
      { label: "REGION", value: "Ethiopia", icon: Leaf },
      { label: "PROCESS", value: "Hand Selected", icon: Hand }
    ],
    btnText: "DISCOVER ORIGINS",
    img: "/story/1origin.png"
  },
  {
    num: "02",
    title: "The Harvest",
    desc: "Only the ripest cherries are chosen. Each harvest is completed by hand, ensuring every bean reaches our roasters at its peak expression.",
    stats: [
      { label: "SELECTION RATE", value: "Top 5%", icon: TreePine },
      { label: "HARVEST METHOD", value: "Hand Picked", icon: Hand },
      { label: "QUALITY GRADE", value: "Specialty", icon: Mountain }
    ],
    btnText: "MEET THE FARMERS",
    img: "/story/2harvest.png"
  },
  {
    num: "03",
    title: "The Roast",
    desc: "Masterfully roasted to unlock hidden notes and bring out the soul of every bean.",
    stats: [
      { label: "ROAST LEVEL", value: "Medium Dark", icon: Flame },
      { label: "DURATION", value: "12–16 min", icon: Timer },
      { label: "TEMPERATURE", value: "200–215°C", icon: Thermometer }
    ],
    btnText: "OUR ROASTING APPROACH",
    img: "/story/3roast.png"
  },
  {
    num: "04",
    title: "The Grind",
    desc: "Precision milled for perfect extraction. The right grind size unlocks the full potential of every bean.",
    stats: [
      { label: "GRIND SIZE", value: "Medium Fine", icon: Grid },
      { label: "CONSISTENCY", value: "±0.1 mm", icon: Target },
      { label: "EXTRACTION", value: "Balanced", icon: Droplet }
    ],
    btnText: "OUR GRINDING PHILOSOPHY",
    img: "/story/4grind.png"
  },
  {
    num: "05",
    title: "The Brew",
    desc: "Crafted with immense care by our artisans.",
    stats: [
      { label: "QUALITY", value: "Premium Beans", icon: Coffee },
      { label: "CRAFT", value: "Expert Preparation", icon: Settings },
      { label: "PASSION", value: "Perfectly Served", icon: Heart }
    ],
    btnText: "OUR BREWING PHILOSOPHY",
    img: "/story/5brew.png"
  }
];

const StorySection = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const startOffset = document.querySelector('nav')?.offsetHeight || 60;
      if (containerRef.current) {
        containerRef.current.style.height = `calc(100vh - ${startOffset}px)`;
      }

      gsap.to(scrollRef.current, {
        xPercent: -100 * (stories.length - 1) / stories.length,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (stories.length - 1),
          start: () => `top ${document.querySelector('nav')?.offsetHeight || 60}px`,
          end: () => `+=${window.innerWidth * stories.length}`,
          invalidateOnRefresh: true,
        }
      });
      
      setTimeout(() => ScrollTrigger.refresh(), 1000);
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="story" className="w-full bg-[#050505] overflow-hidden relative scroll-mt-32">
      
      {/* Global Section Header */}
      <div className="absolute top-12 left-16 md:left-32 z-30 pointer-events-none">
        <h2 className="text-xs tracking-[0.4em] uppercase text-[#cfa86e] font-bold">The Journey</h2>
      </div>

      <div ref={scrollRef} className="flex h-full w-[500vw]">
        {stories.map((story, i) => (
          <div key={i} className="h-full w-screen flex-shrink-0 relative overflow-hidden flex items-center">
            
            {/* Background Image on Right Side */}
            <div className="absolute inset-0 z-0 flex justify-end">
              <div className="w-full md:w-2/3 h-full relative">
                <img 
                  src={story.img} 
                  alt={story.title}
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Gradient mask to blend image into the black background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-1/2" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
              </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 flex items-center h-full">
              
              {/* Vertical Progress Bar */}
              <div className="hidden md:flex flex-col items-center gap-6 mr-16 relative">
                {stories.map((_, dotIndex) => (
                  <div key={dotIndex} className="relative flex items-center justify-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${i === dotIndex ? 'bg-[#cfa86e]' : 'bg-[#cfa86e]/30'}`} />
                    {i === dotIndex && (
                      <div className="absolute w-6 h-6 rounded-full border border-[#cfa86e] opacity-60" />
                    )}
                  </div>
                ))}
                {/* Connecting Line */}
                <div className="absolute top-2 bottom-2 w-px bg-gradient-to-b from-[#cfa86e]/10 via-[#cfa86e]/30 to-[#cfa86e]/10 -z-10" />
              </div>

              {/* Text Content */}
              <div className="max-w-xl">
                <div className="flex flex-col mb-4">
                  <span className="text-[#cfa86e] text-sm tracking-[0.2em] mb-2">{story.num}</span>
                  <div className="w-12 h-px bg-[#cfa86e] opacity-60 mb-6" />
                  <h3 className="text-6xl md:text-8xl font-[Cinzel] text-white font-normal mb-8 leading-none">
                    {story.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/80 font-[Inter] font-light leading-relaxed mb-12 max-w-md">
                    {story.desc}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="flex gap-8 md:gap-12 mb-12 border-l border-[#cfa86e]/20 pl-6">
                  {story.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="w-12 h-12 rounded-full border border-[#cfa86e]/30 flex items-center justify-center mb-4">
                        <stat.icon size={20} className="text-[#cfa86e]" />
                      </div>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#cfa86e] mb-2 font-bold">{stat.label}</span>
                      <span className="text-white/90 text-sm md:text-base font-light">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button className="flex items-center gap-4 group">
                  <span className="text-[#cfa86e] text-xs tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors duration-300">
                    {story.btnText}
                  </span>
                  <ArrowRight size={16} className="text-[#cfa86e] group-hover:translate-x-2 transition-transform duration-300" />
                </button>

              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default StorySection;
