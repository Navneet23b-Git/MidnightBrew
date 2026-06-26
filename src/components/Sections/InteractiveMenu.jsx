import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Droplets, Flame, Bean, Star, Wind, Heart, ChevronRight, Leaf, Waves, LeafyGreen, ChevronDown, ChevronUp } from 'lucide-react';

// Flavor Note Icons mapping
const flavorIcons = {
  Chocolate: Bean,
  Caramel: Flame,
  Nutty: Coffee,
  Floral: Star,
  Citrus: Droplets,
  Vanilla: Wind,
  Earth: Leaf
};

const menuData = {
  "Espresso": [
    {
      id: "e1",
      name: "Ristretto",
      desc: "A shorter, more concentrated pull of espresso.",
      price: "$4",
      tag: "INTENSE & SWEET",
      img: "/menu/ristretto.png",
      heroImg: "/menu/hero_bg.png",
      origin: "Brazil Santos",
      process: "Natural",
      roastLevel: 4,
      brewTime: "20 Seconds",
      bestServed: "Hot",
      flavorNotes: ["Chocolate", "Caramel"]
    },
    {
      id: "e2",
      name: "Classic Espresso",
      desc: "Perfectly balanced double shot with rich crema.",
      price: "$4",
      tag: "BALANCED",
      img: "/menu/espresso.png",
      heroImg: "/signature/bg.png",
      origin: "Colombia Supremo",
      process: "Washed",
      roastLevel: 3,
      brewTime: "25 Seconds",
      bestServed: "Hot",
      flavorNotes: ["Chocolate", "Nutty"]
    },
    {
      id: "e3",
      name: "Americano",
      desc: "Espresso smoothed out with filtered hot water.",
      price: "$5",
      tag: "SMOOTH & RICH",
      img: "/menu/americano.png",
      heroImg: "/signature/1.png",
      origin: "House Blend",
      process: "Mixed",
      roastLevel: 3,
      brewTime: "1 Minute",
      bestServed: "Hot or Iced",
      flavorNotes: ["Earth", "Nutty"]
    },
    {
      id: "e4",
      name: "Macchiato",
      desc: "Espresso marked with a dollop of milk foam.",
      price: "$5",
      tag: "BOLD & CREAMY",
      img: "/signature/3.png",
      heroImg: "/signature/3.png",
      origin: "Ethiopia Yirgacheffe",
      process: "Washed",
      roastLevel: 3,
      brewTime: "25 Seconds",
      bestServed: "Hot",
      flavorNotes: ["Floral", "Citrus"]
    },
    {
      id: "e5",
      name: "Cortado",
      desc: "Equal parts espresso and warm milk.",
      price: "$5",
      tag: "SILKY",
      img: "/signature/4.png",
      heroImg: "/signature/4.png",
      origin: "House Blend",
      process: "Mixed",
      roastLevel: 4,
      brewTime: "30 Seconds",
      bestServed: "Hot",
      flavorNotes: ["Chocolate", "Caramel"]
    },
    {
      id: "e6",
      name: "Flat White",
      desc: "Espresso with micro-foamed milk.",
      price: "$6",
      tag: "VELVETY",
      img: "/signature/5.png",
      heroImg: "/signature/5.png",
      origin: "House Blend",
      process: "Mixed",
      roastLevel: 3,
      brewTime: "1 Minute",
      bestServed: "Hot",
      flavorNotes: ["Caramel", "Vanilla"]
    }
  ],
  "Specialty Coffee": [
    {
      id: "s1",
      name: "Velvet Mocha",
      desc: "Espresso, dark chocolate, and steamed silk milk.",
      price: "$7",
      tag: "RICH & DECADENT",
      img: "/signature/4.png",
      heroImg: "/hero/choco.png",
      origin: "Brazil & Ghana",
      process: "Washed",
      roastLevel: 4,
      brewTime: "2 Minutes",
      bestServed: "Hot",
      flavorNotes: ["Chocolate", "Vanilla"]
    },
    {
      id: "s2",
      name: "Golden Honey Latte",
      desc: "Espresso and milk infused with raw organic honey.",
      price: "$7",
      tag: "SWEET & FLORAL",
      img: "/signature/1.png",
      heroImg: "/hero/caramel.png",
      origin: "Ethiopia",
      process: "Natural",
      roastLevel: 2,
      brewTime: "2 Minutes",
      bestServed: "Hot or Iced",
      flavorNotes: ["Floral", "Caramel"]
    },
    {
      id: "s3",
      name: "Lavender Bloom",
      desc: "Latte infused with delicate lavender syrup.",
      price: "$8",
      tag: "AROMATIC",
      img: "/signature/2.png",
      heroImg: "/menu/botanical.png",
      origin: "Colombia",
      process: "Washed",
      roastLevel: 2,
      brewTime: "2 Minutes",
      bestServed: "Hot",
      flavorNotes: ["Floral", "Vanilla"]
    },
    {
      id: "s4",
      name: "Cardamom Spiced",
      desc: "Middle Eastern inspired spiced coffee.",
      price: "$8",
      tag: "WARM & SPICY",
      img: "/signature/3.png",
      heroImg: "/menu/hero_bg.png",
      origin: "Yemen",
      process: "Natural",
      roastLevel: 3,
      brewTime: "3 Minutes",
      bestServed: "Hot",
      flavorNotes: ["Earth", "Nutty"]
    },
    {
      id: "s5",
      name: "Midnight Affogato",
      desc: "Vanilla bean gelato drowned in signature espresso.",
      price: "$9",
      tag: "DESSERT",
      img: "/signature/6.png",
      heroImg: "/signature/bg.png",
      origin: "House Blend",
      process: "Mixed",
      roastLevel: 4,
      brewTime: "2 Minutes",
      bestServed: "Cold",
      flavorNotes: ["Vanilla", "Chocolate"]
    }
  ],
  "Cold Brew": [
    {
      id: "c1",
      name: "Kyoto Drip",
      desc: "12-hour slow ice drip for a smooth, clean finish.",
      price: "$10",
      tag: "MEDIUM BOLD",
      img: "/signature/5.png",
      heroImg: "/signature/5.png",
      origin: "Ethiopia Guji",
      process: "Washed",
      roastLevel: 3,
      brewTime: "12 Hours",
      bestServed: "Cold",
      flavorNotes: ["Chocolate", "Caramel", "Nutty"]
    },
    {
      id: "c2",
      name: "Nitro Reserve",
      desc: "Nitrogen-infused cold brew with a velvety texture.",
      price: "$8",
      tag: "SMOOTH & CREAMY",
      img: "/signature/1.png",
      heroImg: "/signature/1.png",
      origin: "Colombia Supremo",
      process: "Washed",
      roastLevel: 4,
      brewTime: "16 Hours",
      bestServed: "Cold",
      flavorNotes: ["Chocolate", "Earth"]
    },
    {
      id: "c3",
      name: "Vanilla Cold Brew",
      desc: "Smooth cold brew infused with natural vanilla notes.",
      price: "$9",
      tag: "SWEET & SMOOTH",
      img: "/signature/2.png",
      heroImg: "/signature/2.png",
      origin: "Brazil Santos",
      process: "Natural",
      roastLevel: 2,
      brewTime: "12 Hours",
      bestServed: "Cold",
      flavorNotes: ["Vanilla", "Caramel"]
    },
    {
      id: "c4",
      name: "Citrus Refresh",
      desc: "Cold brew with a hint of citrus for a refreshing twist.",
      price: "$9",
      tag: "LIGHT & REFRESHING",
      img: "/signature/3.png",
      heroImg: "/signature/3.png",
      origin: "Ethiopia Yirgacheffe",
      process: "Washed",
      roastLevel: 2,
      brewTime: "12 Hours",
      bestServed: "Cold",
      flavorNotes: ["Citrus", "Floral"]
    }
  ],
  "Pour Over": [
    {
      id: "p1",
      name: "V60 Hand Pour",
      desc: "Clean, bright, and nuanced extraction.",
      price: "$6",
      tag: "BRIGHT & CRISP",
      img: "/signature/3.png",
      heroImg: "/signature/1.png",
      origin: "Kenya AA",
      process: "Washed",
      roastLevel: 2,
      brewTime: "3 Minutes",
      bestServed: "Hot",
      flavorNotes: ["Citrus", "Floral"]
    },
    {
      id: "p2",
      name: "Chemex Classic",
      desc: "Pure, sweet, and perfectly balanced.",
      price: "$7",
      tag: "CLEAN",
      img: "/signature/5.png",
      heroImg: "/signature/2.png",
      origin: "Costa Rica Tarrazu",
      process: "Honey Process",
      roastLevel: 2,
      brewTime: "4 Minutes",
      bestServed: "Hot",
      flavorNotes: ["Caramel", "Nutty"]
    },
    {
      id: "p3",
      name: "Kalita Wave",
      desc: "Even extraction with a rich, full body.",
      price: "$7",
      tag: "FULL BODY",
      img: "/signature/1.png",
      heroImg: "/signature/5.png",
      origin: "Colombia",
      process: "Washed",
      roastLevel: 3,
      brewTime: "3 Minutes",
      bestServed: "Hot",
      flavorNotes: ["Chocolate", "Earth"]
    }
  ],
  "Matcha & Teas": [
    {
      id: "t1",
      name: "Ceremonial Matcha",
      desc: "Premium grade Uji matcha whisked to perfection.",
      price: "$8",
      tag: "EARTHY & UMAMI",
      img: "/signature/6.png",
      heroImg: "/hero/matcha.png",
      origin: "Kyoto, Japan",
      process: "Stone Milled",
      roastLevel: 1,
      brewTime: "2 Minutes",
      bestServed: "Hot or Iced",
      flavorNotes: ["Earth", "Vanilla"]
    },
    {
      id: "t2",
      name: "Hojicha Roasted Tea",
      desc: "Roasted green tea latte with a nutty, smoky profile.",
      price: "$7",
      tag: "SMOKY & SWEET",
      img: "/signature/2.png",
      heroImg: "/hero/caramel.png",
      origin: "Shizuoka, Japan",
      process: "Roasted",
      roastLevel: 4,
      brewTime: "3 Minutes",
      bestServed: "Hot",
      flavorNotes: ["Nutty", "Caramel"]
    },
    {
      id: "t3",
      name: "Earl Grey Crema",
      desc: "Bergamot-infused black tea topped with vanilla sweet cream.",
      price: "$6",
      tag: "FLORAL & CREAMY",
      img: "/signature/3.png",
      heroImg: "/hero/strawberry.png",
      origin: "Sri Lanka",
      process: "Oxidized",
      roastLevel: 3,
      brewTime: "4 Minutes",
      bestServed: "Hot or Iced",
      flavorNotes: ["Citrus", "Floral"]
    }
  ]
};

const categoryIcons = {
  "Espresso": Coffee,
  "Specialty Coffee": Star,
  "Cold Brew": Droplets,
  "Pour Over": Waves,
  "Matcha & Teas": LeafyGreen
};

const InteractiveMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Cold Brew");
  const [selectedItem, setSelectedItem] = useState(menuData["Cold Brew"][0]);
  
  const categoriesScrollRef = useRef(null);
  const varietiesScrollRef = useRef(null);

  const scrollDown = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ top: 150, behavior: 'smooth' });
    }
  };

  const scrollUp = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ top: -150, behavior: 'smooth' });
    }
  };

  const categories = Object.keys(menuData);

  return (
    <section id="menu" className="w-full h-[85vh] min-h-[700px] max-h-[900px] scroll-mt-24 bg-[#050505] text-white flex flex-col md:flex-row overflow-hidden relative">
      
      {/* 1. LEFT COLUMN: NAVIGATION */}
      <div className="w-full md:w-[300px] lg:w-[350px] h-full border-r border-[#cfa86e]/20 flex flex-col shrink-0 bg-[#0A0A0A] relative">
        <div className="p-10 pb-0 shrink-0">
          <h3 className="text-[#cfa86e] text-xs tracking-[0.3em] uppercase font-bold mb-8 flex items-center gap-4">
            <div className="w-6 h-px bg-[#cfa86e]" />
            The Menu
          </h3>
        </div>

        {/* Scrollable Categories Area */}
        <div ref={categoriesScrollRef} className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-32 relative scroll-smooth">
          
          {/* Floating Scroll UP Indicator */}
          <div className="sticky top-0 left-0 w-full flex justify-center pointer-events-none pb-6 pt-2 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-transparent z-20">
            <button 
              onClick={() => scrollUp(categoriesScrollRef)}
              className="text-[#cfa86e]/60 bg-[#0A0A0A] rounded-full p-2 border border-[#cfa86e]/20 hover:text-[#cfa86e] hover:border-[#cfa86e]/60 hover:bg-[#cfa86e]/10 transition-all pointer-events-auto cursor-pointer animate-pulse shadow-[0_0_15px_rgba(207,168,110,0.1)]"
            >
              <ChevronUp size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat];
              const isActive = selectedCategory === cat;
              const varietiesCount = menuData[cat].length;

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedItem(menuData[cat][0]);
                  }}
                  className={`relative flex items-center justify-between p-6 rounded-lg transition-all duration-300 group ${
                    isActive 
                    ? 'border border-[#cfa86e] bg-gradient-to-r from-[#cfa86e]/10 to-transparent' 
                    : 'border border-transparent hover:bg-[#cfa86e]/5 hover:border-[#cfa86e]/30'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <Icon size={24} className={isActive ? 'text-[#cfa86e]' : 'text-white/40 group-hover:text-[#cfa86e]/70'} strokeWidth={1.5} />
                    <div className="text-left">
                      <div className={`font-[Cinzel] uppercase tracking-wide text-sm mb-1 transition-colors ${isActive ? 'text-[#cfa86e]' : 'text-white/80 group-hover:text-white'}`}>
                        {cat}
                      </div>
                      <div className="text-[10px] tracking-widest text-white/40 uppercase group-hover:text-white/60 transition-colors">
                        {varietiesCount} Varieties
                      </div>
                    </div>
                  </div>
                  {isActive && <ChevronRight size={16} className="text-[#cfa86e]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Scroll Indicator for Sidebar */}
        <div className="absolute bottom-48 left-0 w-full flex justify-center pointer-events-none pb-4 bg-gradient-to-t from-[#0A0A0A] to-transparent pt-8">
          <button 
            onClick={() => scrollDown(categoriesScrollRef)}
            className="text-[#cfa86e]/60 bg-[#0A0A0A] rounded-full p-2 border border-[#cfa86e]/20 hover:text-[#cfa86e] hover:border-[#cfa86e]/60 hover:bg-[#cfa86e]/10 transition-all pointer-events-auto cursor-pointer animate-bounce"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Our Promise */}
        <div className="p-6 mt-auto border-t border-white/5 bg-[#0A0A0A] shrink-0 flex flex-col items-center">
          <div className="w-full border border-white/10 p-4 rounded-lg bg-[#050505]/80 backdrop-blur-sm text-center">
            <h4 className="text-[#cfa86e] text-[9px] tracking-[0.2em] uppercase font-bold mb-2">Our Promise</h4>
            <p className="text-white/60 text-[10px] leading-relaxed font-light mb-2">
              Crafted with precision & passion.
            </p>
            <div className="font-[Cinzel] italic text-white/40 text-xs">Signature</div>
          </div>
        </div>
      </div>


      {/* 2. MIDDLE COLUMN: MENU LIST */}
      <div className="flex-1 max-w-[600px] h-full flex flex-col border-r border-[#cfa86e]/20 bg-[#0A0A0A] relative z-20 shadow-2xl">
        
        {/* Header */}
        <div className="p-10 pb-6 text-center border-b border-white/5 shrink-0 bg-[#0A0A0A] relative z-20">
          <span className="text-[#cfa86e] text-[10px] tracking-[0.2em] uppercase font-bold">
            Crafted to perfection.
          </span>
          <h2 className="text-3xl md:text-4xl font-[Cinzel] text-white mt-2 mb-1 uppercase tracking-widest leading-none">
            Explore Our<br/>
            <span className="text-[#cfa86e]">Signature Menu</span>
          </h2>
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="w-12 h-px bg-[#cfa86e]/30" />
            <Bean size={12} className="text-[#cfa86e]" />
            <div className="w-12 h-px bg-[#cfa86e]/30" />
          </div>
          <p className="text-[#a0a0a0] text-xs font-[Inter] font-light leading-relaxed max-w-[280px] mx-auto">
            Handpicked beans. Thoughtful preparation. Unforgettable experience.
          </p>
        </div>

        {/* Scrollable List */}
        <div ref={varietiesScrollRef} className="flex-1 overflow-y-auto hide-scrollbar relative scroll-smooth">
          
          {/* Floating Scroll UP Indicator */}
          <div className="sticky top-0 left-0 w-full flex justify-center pointer-events-none pb-6 pt-2 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-transparent z-20">
            <button 
              onClick={() => scrollUp(varietiesScrollRef)}
              className="text-[#cfa86e]/60 bg-[#0A0A0A] rounded-full p-2 border border-[#cfa86e]/20 hover:text-[#cfa86e] hover:border-[#cfa86e]/60 hover:bg-[#cfa86e]/10 transition-all pointer-events-auto cursor-pointer animate-pulse shadow-[0_0_15px_rgba(207,168,110,0.1)]"
            >
              <ChevronUp size={20} />
            </button>
          </div>

          <div className="p-6 pt-2 flex flex-col gap-4 pb-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-4"
              >
                {menuData[selectedCategory].map((item) => {
                  const isActive = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`w-full flex items-center p-4 rounded-xl transition-all duration-300 text-left group ${
                        isActive 
                        ? 'border border-[#cfa86e] bg-gradient-to-r from-[#cfa86e]/5 to-transparent' 
                        : 'border border-transparent hover:bg-[#cfa86e]/5 hover:border-[#cfa86e]/30'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-black border border-[#cfa86e]/20 mr-5">
                        <img src={item.img} alt={item.name} className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-[Cinzel] text-base uppercase tracking-wide transition-colors ${isActive ? 'text-white' : 'text-[#e0e0e0] group-hover:text-[#cfa86e]'}`}>
                            {item.name}
                          </h4>
                          <span className="text-[#cfa86e] font-[Cinzel]">{item.price}</span>
                        </div>
                        <p className="text-[#a0a0a0] text-xs font-light mb-3 line-clamp-2 leading-relaxed pr-4 group-hover:text-white/80 transition-colors">
                          {item.desc}
                        </p>
                        <div className="flex items-center gap-2">
                          <Bean size={10} className="text-[#cfa86e]" />
                          <span className="text-[#cfa86e] text-[9px] font-bold tracking-[0.2em] uppercase">
                            {item.tag}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Scroll Indicator for Middle Column */}
        <div className="absolute bottom-[88px] left-0 w-full flex justify-center pointer-events-none pb-4 bg-gradient-to-t from-[#0A0A0A] to-transparent pt-12 z-20">
          <button 
            onClick={() => scrollDown(varietiesScrollRef)}
            className="text-[#cfa86e]/60 bg-[#0A0A0A] rounded-full p-2 border border-[#cfa86e]/20 hover:text-[#cfa86e] hover:border-[#cfa86e]/60 hover:bg-[#cfa86e]/10 transition-all pointer-events-auto cursor-pointer animate-bounce"
          >
            <ChevronDown size={20} />
          </button>
        </div>

        {/* Bottom Button */}
        <div className="p-6 border-t border-white/5 bg-[#0A0A0A] shrink-0 relative z-30 flex justify-center">
          <button className="flex items-center gap-3 px-8 py-4 border border-[#cfa86e]/30 text-[#cfa86e] text-[10px] font-bold tracking-[0.2em] uppercase rounded hover:bg-[#cfa86e]/10 transition-colors w-full justify-center">
            <Coffee size={14} />
            View Full Menu
          </button>
        </div>
      </div>


      {/* 3. RIGHT COLUMN: DETAILS & HERO */}
      <div className="flex-1 h-full relative flex flex-col bg-[#050505] overflow-y-auto hide-scrollbar">
        
        {/* Massive Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedItem.heroImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img src={selectedItem.heroImg} alt="Hero" className="w-full h-full object-cover" />
            {/* Gradients to fade image into the background so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
          </motion.div>
        </AnimatePresence>

        {/* Content Details */}
        <div className="relative z-10 w-full max-w-[400px] p-12 lg:p-16 flex flex-col justify-center min-h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[#cfa86e] text-[10px] tracking-[0.2em] uppercase font-bold mb-0 block">
                {selectedCategory}
              </span>
              <h2 className="text-lg md:text-xl font-[Cinzel] text-white uppercase tracking-widest mb-1 leading-tight pt-2 pb-1">
                {selectedItem.name}
              </h2>
              <p className="text-[#a0a0a0] text-sm leading-relaxed font-light mb-6">
                {selectedItem.desc}
              </p>

              {/* Flavor Notes */}
              <div className="mb-10">
                <h4 className="text-[#cfa86e] text-[10px] tracking-[0.2em] uppercase font-bold mb-4">Flavor Notes</h4>
                <div className="flex gap-6">
                  {selectedItem.flavorNotes.map((note, i) => {
                    const Icon = flavorIcons[note] || Star;
                    return (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                          <Icon size={16} className="text-white/80" />
                        </div>
                        <span className="text-[#a0a0a0] text-[10px] tracking-wider">{note}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 gap-6 mb-12">
                <div>
                  <h4 className="text-[#cfa86e] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">Origin</h4>
                  <p className="text-[#e0e0e0] text-xs font-light tracking-wide">{selectedItem.origin}</p>
                </div>
                <div>
                  <h4 className="text-[#cfa86e] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">Process</h4>
                  <p className="text-[#e0e0e0] text-xs font-light tracking-wide">{selectedItem.process}</p>
                </div>
                <div>
                  <h4 className="text-[#cfa86e] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">Roast Level</h4>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(level => (
                      <Bean 
                        key={level} 
                        size={12} 
                        className={level <= selectedItem.roastLevel ? "text-[#e0e0e0] fill-[#e0e0e0]" : "text-white/20"} 
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[#cfa86e] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">Brew Time</h4>
                  <p className="text-[#e0e0e0] text-xs font-light tracking-wide">{selectedItem.brewTime}</p>
                </div>
                <div>
                  <h4 className="text-[#cfa86e] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">Best Served</h4>
                  <p className="text-[#e0e0e0] text-xs font-light tracking-wide">{selectedItem.bestServed}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-6">
                <button className="flex items-center justify-between px-8 py-4 border border-[#cfa86e] bg-[#cfa86e]/10 backdrop-blur-sm text-[#cfa86e] text-xs font-bold tracking-[0.2em] uppercase rounded hover:bg-[#cfa86e] hover:text-[#050505] transition-colors w-max">
                  <span>Add To Order</span>
                  <span className="ml-8">{selectedItem.price}</span>
                </button>
                <button className="flex items-center gap-3 text-[#a0a0a0] text-[10px] tracking-[0.2em] uppercase hover:text-white transition-colors w-max">
                  <Heart size={14} />
                  Add To Favorites
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default InteractiveMenu;
