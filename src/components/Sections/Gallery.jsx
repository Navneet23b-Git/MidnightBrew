import React from 'react';

const galleryImages = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501339817309-1d3781515ce4?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600093665355-09bd23192070?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?q=80&w=2084&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507133750076-ba8a0db83e1c?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514432324607-a125290ca2ca?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495474472205-51f7570af79b?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515823662415-e0fac0aa27f5?q=80&w=2070&auto=format&fit=crop"
];

const Gallery = () => {
  return (
    <section className="w-full bg-[#0a0a0a] py-2 px-4 md:px-8">
      <div className="max-w-[1800px] mx-auto">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-16 text-center">Life at Midnight</h2>
        
        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((src, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden group rounded-sm break-inside-avoid"
            >
              <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
              {/* Glass reflection effect */}
              <div className="absolute inset-0 z-20 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%]" />
              
              <img 
                src={src} 
                alt={`Gallery ${index}`} 
                className="w-full h-auto object-cover transform transition-transform duration-[1.5s] group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
