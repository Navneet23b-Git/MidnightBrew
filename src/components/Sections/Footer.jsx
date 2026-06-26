import React from 'react';

const Footer = () => {
  return (
    <footer className="relative w-full min-h-[80vh] flex items-end justify-center py-16 px-8 md:px-16 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" 
          alt="Midnight Brew Lounge" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-[#000]/80 to-transparent" />
      </div>

      {/* Steam Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none flex justify-center items-end opacity-20">
        <div className="w-[800px] h-[500px] bg-white rounded-full blur-[150px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-20 w-full max-w-[1600px] mx-auto text-white">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl md:text-7xl font-serif metal-text mb-6">Midnight Brew</h2>
            <p className="text-white/60 max-w-sm font-light leading-relaxed mb-8">
              A sanctuary for the senses. Where time slows down, and craftsmanship takes center stage.
            </p>
            <form className="flex border-b border-white/20 pb-2 max-w-sm">
              <input 
                type="email" 
                placeholder="Join the Inner Circle" 
                className="bg-transparent border-none outline-none w-full text-white placeholder-white/30 text-sm tracking-widest"
              />
              <button className="text-brand-gold uppercase text-xs tracking-widest hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-6 font-bold">Sanctuary</h4>
            <ul className="space-y-4 text-white/70 text-sm font-light">
              <li>1800 Reserve Avenue</li>
              <li>New York, NY 10012</li>
              <li className="pt-4"><a href="#" className="hover:text-brand-gold transition-colors">Get Directions</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-brand-gold text-xs tracking-[0.3em] uppercase mb-6 font-bold">Hours</h4>
            <ul className="space-y-4 text-white/70 text-sm font-light">
              <li className="flex justify-between"><span>Mon - Thu</span> <span>7AM - 10PM</span></li>
              <li className="flex justify-between"><span>Fri - Sat</span> <span>7AM - 12AM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>8AM - 8PM</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest text-white/40 uppercase">
          <p>&copy; {new Date().getFullYear()} Midnight Brew. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
