import React from 'react';
import { Coffee } from 'lucide-react';

const testimonials = [
  {
    name: "Alexander Pierce",
    title: "Design Director",
    quote: "An unparalleled sensory experience. Midnight Brew redefines what coffee can be, elevating it to an art form.",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Isabella Sterling",
    title: "Culinary Critic",
    quote: "The Vanilla Silk Latte is a revelation. The atmosphere is as meticulously crafted as the beverages themselves.",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Julian Thorne",
    title: "Architect",
    quote: "I come for the Kyoto Cold Brew and stay for the breathtaking interior design. A true sanctuary in the city.",
    img: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    name: "Megan Vale",
    title: "Lifestyle Blogger",
    quote: "Every sip tells a story. The attention to detail—from flavor to presentation—is absolutely exceptional.",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    name: "Ethan Harris",
    title: "Creative Director",
    quote: "Midnight Brew has become my creative fuel. The ambiance inspires ideas and the coffee perfects them.",
    img: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    name: "Olivia Grant",
    title: "Travel Writer",
    quote: "The Caramel Macchiato here is the best I've ever had. Rich, balanced, and made with so much love.",
    img: "https://randomuser.me/api/portraits/women/91.jpg"
  },
  {
    name: "Nathan Brooks",
    title: "Photographer",
    quote: "A hidden gem that never feels hidden for long. Worth every moment and every mile.",
    img: "https://randomuser.me/api/portraits/men/60.jpg"
  },
  {
    name: "Sofia Lin",
    title: "Hotelier",
    quote: "From the warm welcome to the last sip, everything feels thoughtful, personal, and beautifully crafted.",
    img: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  {
    name: "Daniel Reyes",
    title: "Food Stylist",
    quote: "The textures, the aromas, the flavors—pure magic. You can taste the passion in every single cup.",
    img: "https://randomuser.me/api/portraits/men/82.jpg"
  },
  {
    name: "Lily Monroe",
    title: "Entrepreneur",
    quote: "My go-to place for slow mornings and deep conversations. Midnight Brew feels like home.",
    img: "https://randomuser.me/api/portraits/women/17.jpg"
  },
  {
    name: "Marcus Vance",
    title: "Sommelier",
    quote: "The tasting notes are incredibly distinct. Their single-origin pour-over is a masterclass in extraction.",
    img: "https://randomuser.me/api/portraits/men/91.jpg"
  },
  {
    name: "Elena Rostova",
    title: "Art Curator",
    quote: "A perfectly choreographed experience. The aesthetics of the space perfectly mirror the elegance of the menu.",
    img: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    name: "James Chen",
    title: "Composer",
    quote: "There is a rhythm to this café. The gentle hum of the espresso machine and the rich aromas are my perfect symphony.",
    img: "https://randomuser.me/api/portraits/men/29.jpg"
  },
  {
    name: "Sarah Jenkins",
    title: "Novelist",
    quote: "I've written chapters in the corner booth. The dark, moody lighting and exceptional espresso are my muses.",
    img: "https://randomuser.me/api/portraits/women/33.jpg"
  },
  {
    name: "William Thorne",
    title: "Executive Chef",
    quote: "They treat coffee beans with the same reverence a chef treats truffles. Absolute dedication to the craft.",
    img: "https://randomuser.me/api/portraits/men/71.jpg"
  }
];

// Split the testimonials into two distinct rows
const topRow = testimonials.slice(0, 7);
const bottomRow = testimonials.slice(7, 15);

// Component for an individual Testimonial Card
const TestimonialCard = ({ item }) => (
  <div className="min-w-[234px] w-[234px] shrink-0 bg-gradient-to-b from-[#181410] to-[#0a0a0a] rounded-xl border border-[#cfa86e]/20 p-6 flex flex-col items-center relative group hover:border-[#cfa86e]/60 transition-colors duration-500 cursor-pointer">
    {/* Avatar */}
    <div className="w-14 h-14 rounded-full overflow-hidden mb-5 border-2 border-[#cfa86e]/30 p-[2px]">
      <img 
        src={item.img} 
        alt={item.name}
        className="w-full h-full rounded-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
      />
    </div>
    
    {/* Content Container to align quotes */}
    <div className="w-full flex flex-col items-center relative flex-1">
      {/* Golden Quote Mark aligned to the left of the text block */}
      <div className="w-full text-left mb-[-12px]">
        <span className="text-[#cfa86e] text-4xl font-serif">“</span>
      </div>
      
      {/* Quote Text */}
      <p className="text-[#cccccc] italic font-serif text-center text-[15px] leading-snug mb-8 z-10 px-2 min-h-[100px] flex items-center justify-center">
        "{item.quote}"
      </p>
      
      {/* Separator: Diamond shape as seen in upscale designs */}
      <div className="w-full flex items-center justify-center gap-3 mb-6 opacity-70">
        <div className="w-10 h-[1px] bg-[#cfa86e]/40"></div>
        <div className="w-1.5 h-1.5 bg-[#cfa86e] rotate-45"></div>
        <div className="w-10 h-[1px] bg-[#cfa86e]/40"></div>
      </div>
      
      {/* Author Info */}
      <h3 className="text-white text-[13px] tracking-[0.15em] uppercase font-bold mb-2 text-center font-sans">{item.name}</h3>
      <h4 className="text-[#cfa86e] text-[11px] tracking-[0.2em] uppercase text-center font-sans">{item.title}</h4>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className="w-full bg-[#0a0a0a] py-32 relative overflow-hidden">
      
      {/* Injecting Marquee Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 70s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 70s linear infinite;
        }
        /* Pause the entire track when any part of it is hovered */
        .marquee-track:hover > div {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-[1800px] mx-auto relative z-10 px-4 mb-20">
        {/* Header exactly matching the reference */}
        <div className="flex flex-col items-center justify-center">
          
          <div className="flex flex-col items-center mb-6 w-full max-w-[500px]">
            <div className="flex items-center justify-center w-full gap-4 mb-2">
              <div className="h-[1px] flex-1 bg-[#cfa86e]/30"></div>
              <span className="text-[#cfa86e] text-[11px] tracking-[0.4em] font-bold uppercase">WHISPERS</span>
              <div className="h-[1px] flex-1 bg-[#cfa86e]/30"></div>
            </div>
            {/* Small icon directly under the text crossing the line area */}
            <div className="text-[#cfa86e]/70">
              <div className="w-2 h-2 rounded-full border border-[#cfa86e]"></div>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-4 text-center">Words from our Guests</h2>
          <p className="text-[#cfa86e] font-serif text-xl md:text-2xl text-center tracking-wide">Real experiences. Real people. Real moments at Midnight Brew.</p>
        </div>
      </div>

      {/* Infinite Marquee Containers */}
      <div className="w-full flex flex-col gap-8 marquee-track">
        
        {/* Top Row: Scrolls Left */}
        <div className="flex w-max animate-marquee-left gap-8 px-4">
          {[...topRow, ...topRow].map((item, idx) => (
            <TestimonialCard key={`top-${idx}`} item={item} />
          ))}
        </div>

        {/* Bottom Row: Scrolls Right */}
        <div className="flex w-max animate-marquee-right gap-8 px-4">
          {[...bottomRow, ...bottomRow].map((item, idx) => (
            <TestimonialCard key={`bot-${idx}`} item={item} />
          ))}
        </div>

      </div>
      
    </section>
  );
};

export default Testimonials;
