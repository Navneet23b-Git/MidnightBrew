import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';
import { Coffee, Calendar, Gift, Star, User, ArrowRight, MapPin, Users } from 'lucide-react';

const benefits = [
  {
    icon: <Coffee size={18} strokeWidth={2} />,
    title: "EXCLUSIVE MEMBER PRICING",
    desc: "Special prices only for members."
  },
  {
    icon: <Calendar size={18} strokeWidth={2} />,
    title: "EARLY ACCESS TO NEW BLENDS",
    desc: "Be the first to try our limited releases."
  },
  {
    icon: <Gift size={18} strokeWidth={2} />,
    title: "BIRTHDAY TREATS & SURPRISES",
    desc: "A little extra, just for you."
  },
  {
    icon: <Star size={18} strokeWidth={2} />,
    title: "EARN POINTS & UNLOCK REWARDS",
    desc: "Every sip brings you closer to more."
  },
  {
    icon: <User size={18} strokeWidth={2} />,
    title: "INVITES TO MEMBERS-ONLY EVENTS",
    desc: "Special moments, shared with our insiders."
  }
];

const stats = [
  { icon: <Coffee size={28} strokeWidth={1.5} />, number: "100+", label: "PREMIUM COFFEES" },
  { icon: <MapPin size={28} strokeWidth={1.5} />, number: "25+", label: "EXCLUSIVE EVENTS" },
  { icon: <Gift size={28} strokeWidth={1.5} />, number: "500+", label: "LOYALTY REWARDS" },
  { icon: <Users size={28} strokeWidth={1.5} />, number: "10K+", label: "HAPPY MEMBERS" }
];

// The Debossed Coffee Bean SVG
const EmbossedBean = () => (
  <svg 
    viewBox="0 0 100 100" 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[65%] z-0"
    style={{ 
      filter: 'drop-shadow(1.5px 1.5px 1.5px rgba(255,255,255,0.1)) drop-shadow(-1.5px -1.5px 2px rgba(0,0,0,0.9))' 
    }}
  >
    <mask id="bean-gap">
      <rect width="100" height="100" fill="white" />
      <path d="M 50 0 C 70 30, 65 50, 50 50 C 35 50, 30 70, 50 100" fill="none" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
    </mask>
    <ellipse cx="50" cy="50" rx="28" ry="45" fill="none" stroke="#151515" strokeWidth="3.5" mask="url(#bean-gap)" />
  </svg>
);

const MembershipClub = () => {
  const containerRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const rotateX = useSpring(10, springConfig);
  const rotateY = useSpring(-15, springConfig);
  
  const glareX = useSpring(50, springConfig);
  const glareY = useSpring(50, springConfig);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    
    const maxTilt = 15;
    rotateX.set(-y * maxTilt);
    
    if (isFlipped) {
      rotateY.set(180 + (-x * maxTilt));
    } else {
      rotateY.set(x * maxTilt);
    }

    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseLeaveContainer = () => {
    rotateX.set(10);
    rotateY.set(isFlipped ? 180 - 15 : -15);
    glareX.set(50);
    glareY.set(50);
  };

  const toggleFlip = () => setIsFlipped(!isFlipped);

  React.useEffect(() => {
    if (isFlipped) {
      rotateY.set(180);
    } else {
      rotateY.set(0);
    }
  }, [isFlipped, rotateY]);

  return (
    <section id="club" className="w-full relative overflow-hidden flex flex-col items-center justify-center pt-12 pb-32 px-4 md:px-16"
      style={{
        background: 'radial-gradient(circle at 75% 40%, #1a1510 0%, #0a0806 50%, #0a0a0a 100%)'
      }}
    >
      {/* Background Ambience Layers */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
      
      {/* Floor Illusion */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] z-0 pointer-events-none">
         <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-scales.png")' }} />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-16">
        
        {/* Left Side: Typography & Benefits */}
        <div className="w-full lg:w-5/12 z-20 flex flex-col">
          <h2 className="text-[10px] tracking-[0.4em] uppercase text-[#cfa86e] font-semibold mb-6">Membership Club</h2>
          <h3 className="text-6xl md:text-7xl lg:text-[80px] font-serif text-white mb-8 leading-[1.1]">Midnight <span className="text-[#cfa86e]">Black</span></h3>
          
          <p className="text-[#a0a0a0] text-[15px] leading-relaxed mb-12 max-w-[420px]">
            An exclusive coffee experience crafted for true connoisseurs. Enjoy premium benefits, early access, and rewards curated for your passion.
          </p>

          <div className="flex flex-col mb-12 w-full max-w-[450px]">
            {benefits.map((item, i) => (
              <div key={i} className="flex items-center gap-6 py-5 border-b border-white/5 last:border-b-0">
                <div className="w-12 h-12 shrink-0 rounded-full border border-[#cfa86e]/40 flex items-center justify-center text-[#cfa86e]">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white text-[12px] tracking-[0.1em] uppercase font-bold">{item.title}</span>
                  <span className="text-[#888888] text-[13px]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button className="px-8 py-3.5 rounded-full border border-[#cfa86e] text-[#cfa86e] tracking-[0.2em] uppercase text-[10px] font-bold hover:bg-[#cfa86e] hover:text-black transition-all duration-300 flex items-center gap-4">
              JOIN THE CLUB <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Side: Pure CSS 3D Card */}
        <div className="w-full lg:w-7/12 flex justify-center relative perspective-[2000px] py-10">
          
          {/* Intense Radiant Glow exactly behind the card matching the reference image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#cfa86e]/20 blur-[150px] rounded-full z-0 pointer-events-none" />

          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onClick={toggleFlip}
            onMouseLeave={handleMouseLeaveContainer}
            className="w-full max-w-[550px] aspect-[1.586/1] relative cursor-pointer group z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="w-full h-full relative"
            >
              
              {/* FRONT FACE */}
              <div 
                className="absolute inset-0 rounded-[18px] md:rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden border border-[#cfa86e]/30"
                style={{
                  backfaceVisibility: 'hidden',
                  backgroundColor: '#111111',
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
                  backgroundBlendMode: 'overlay',
                }}
              >
                {/* Internal Card Layout */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                  
                  {/* Top Row */}
                  <div className="flex justify-between items-start">
                    {/* Logo Area */}
                    <div className="flex flex-col items-center">
                       <div className="w-5 h-5 rounded-full bg-[#cfa86e] flex items-center justify-center mb-2">
                         <div className="w-full h-[1.5px] bg-[#111111] rotate-45"></div>
                       </div>
                       <div className="font-serif text-[#cfa86e] text-[10px] tracking-[0.2em] leading-tight text-center">MIDNIGHT<br/>BREW</div>
                    </div>
                    {/* Black Card Label */}
                    <div className="text-[9px] text-[#777] font-bold tracking-[0.3em] uppercase mt-2">Black Card</div>
                  </div>
                  
                  {/* Embossed Logo Graphic */}
                  <EmbossedBean />

                  {/* Bottom Row */}
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      {/* Sub text */}
                      <div className="text-[#cfa86e] font-sans text-[8px] tracking-[0.25em] uppercase mb-2">
                        Exclusive Member Since
                      </div>
                      {/* Name */}
                      <div className="text-white uppercase tracking-[0.15em] text-[15px] font-sans">
                        Alexander Pierce
                      </div>
                    </div>
                    
                    {/* The Chip */}
                    <div className="w-12 h-9 rounded-md border border-[#665438] relative overflow-hidden mb-1 flex items-center justify-center shadow-inner"
                         style={{ background: 'linear-gradient(135deg, #bca88a 0%, #76634a 50%, #bca88a 100%)' }}>
                       {/* Chip lines */}
                       <div className="absolute w-full h-[1px] bg-[#4a3d2c] top-1/3"></div>
                       <div className="absolute w-full h-[1px] bg-[#4a3d2c] bottom-1/3"></div>
                       <div className="absolute w-[40%] h-full bg-transparent border-x border-[#4a3d2c] rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Front Glare Overlay */}
                <motion.div 
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-100 z-50"
                  style={{ background: glareBackground }}
                />
              </div>

              {/* BACK FACE */}
              <div 
                className="absolute inset-0 rounded-[18px] md:rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden border border-[#cfa86e]/30"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backgroundColor: '#111111',
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")',
                  backgroundBlendMode: 'overlay',
                }}
              >
                 {/* Internal Back Layout */}
                 <div className="w-full h-full flex flex-col relative z-10">
                   {/* Mag Stripe */}
                   <div className="w-full h-14 bg-black mt-8 shadow-inner"></div>
                   
                   {/* Signature Block */}
                   <div className="px-8 mt-6">
                     <div className="w-full h-10 bg-[#e0e0e0] flex items-center justify-between px-4">
                       <span className="text-[8px] text-black/50 font-bold tracking-widest uppercase">Authorized Signature</span>
                       <span className="text-black italic font-serif text-lg transform -translate-y-1">888</span>
                     </div>
                   </div>

                   {/* Digits & Info */}
                   <div className="px-8 mt-8 text-[#555] font-mono text-xl tracking-[0.2em]">
                     1234 5678 9012 8888
                   </div>

                   {/* Footer */}
                   <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                     {/* Logo */}
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-[#cfa86e] flex items-center justify-center">
                         <div className="w-full h-[2px] bg-[#111111] rotate-45"></div>
                       </div>
                       <div className="text-[#cfa86e] font-serif text-[10px] tracking-[0.2em] leading-tight">
                         MIDNIGHT<br/>BREW
                       </div>
                     </div>
                     {/* Member Since */}
                     <div className="text-right">
                       <div className="text-[8px] text-[#cfa86e] tracking-[0.2em] font-bold uppercase mb-1">Member Since</div>
                       <div className="text-[#cfa86e] font-mono text-sm tracking-widest">05/24</div>
                     </div>
                   </div>
                 </div>

                 {/* Back Glare Overlay */}
                 <motion.div 
                   className="absolute inset-0 pointer-events-none mix-blend-screen opacity-100 z-50"
                   style={{ background: glareBackground }}
                 />
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Statistics Bar */}
      <div className="w-full max-w-[1400px] mx-auto z-10 px-4 mt-8">
        <div className="w-full bg-gradient-to-r from-[#16120e] to-[#0a0806] border border-[#cfa86e]/20 rounded-3xl py-8 px-8 md:px-12 flex flex-col md:flex-row flex-wrap justify-between items-center gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-5">
              <div className="w-16 h-16 shrink-0 rounded-full border border-[#cfa86e]/40 flex items-center justify-center text-[#cfa86e] bg-[#cfa86e]/5">
                {stat.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-white text-4xl md:text-5xl font-serif mb-1">{stat.number}</span>
                <span className="text-[#cfa86e] text-[10px] tracking-[0.2em] font-bold uppercase">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default MembershipClub;
