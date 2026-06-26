import React, { useState } from 'react';
import { User, Mail, Calendar, Clock, Pen, ShieldCheck, CalendarClock, Diamond, Lock, ArrowRight } from 'lucide-react';

const Reservation = () => {
  const [guests, setGuests] = useState("2");
  const [notes, setNotes] = useState("");

  const guestOptions = ["1", "2", "3", "4", "5+"];

  return (
    <section id="reservations" className="w-full relative overflow-hidden flex flex-col pt-32 pb-0 bg-[#0a0a0a]">
      {/* Intense Radiant Glow behind the entire section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#cfa86e]/10 blur-[150px] rounded-full z-0 pointer-events-none" />

      {/* Main Container - Full Width */}
      <div className="w-full bg-[#0a0a0a] relative z-10 flex flex-col px-4 md:px-12 lg:px-24 pt-20 pb-12">
        
        {/* TOP ROW: Photo on Left, Form on Right */}
        <div className="w-full flex flex-col lg:flex-row relative">
          
          {/* Left Side: Generated Cafe Photo */}
          <div className="hidden lg:block absolute top-[-80px] left-[-96px] bottom-[-20px] w-[45%] z-0 pointer-events-none">
             <div className="absolute inset-0 bg-[url('/bright-cafe.png')] bg-cover bg-center opacity-80" />
             {/* Radiant gradient to blend the photo seamlessly from all sides into the #0a0a0a background */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#0a0a0a_75%)]" />
          </div>

          {/* Right Side: Form Inputs */}
          <div className="w-full lg:w-[55%] ml-auto relative z-10 flex flex-col pb-16">
            
            {/* Header Typography */}
            <div className="flex flex-col mb-12">
              <div className="flex items-center gap-6 text-[#cfa86e] text-[10px] tracking-[0.4em] uppercase font-bold mb-5">
                SECURE YOUR PLACE
                <div className="w-24 h-[1px] bg-[#cfa86e]/30" />
              </div>
              
              <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#cfa86e]/60 mb-6" />
              
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-4">Reserve an<br/>Experience</h2>
              <p className="text-[#cfa86e] font-serif italic text-lg md:text-xl">Thoughtful moments deserve the perfect setting.</p>
            </div>

            {/* Inputs Grid */}
            <div className="flex flex-col gap-8">
              
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="text-white/80 text-[10px] tracking-[0.2em] font-bold uppercase mb-3">Full Name</label>
                  <div className="w-full h-14 rounded-xl bg-transparent border border-[#cfa86e]/30 flex items-center px-4 gap-4 focus-within:border-[#cfa86e] transition-colors">
                    <User size={18} className="text-[#cfa86e]" />
                    <input type="text" placeholder="Enter your full name" className="w-full bg-transparent text-white placeholder-[#666] outline-none text-sm" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-white/80 text-[10px] tracking-[0.2em] font-bold uppercase mb-3">Email Address</label>
                  <div className="w-full h-14 rounded-xl bg-transparent border border-[#cfa86e]/30 flex items-center px-4 gap-4 focus-within:border-[#cfa86e] transition-colors">
                    <Mail size={18} className="text-[#cfa86e]" />
                    <input type="email" placeholder="Enter your email address" className="w-full bg-transparent text-white placeholder-[#666] outline-none text-sm" />
                  </div>
                </div>
              </div>

              {/* Row 2: Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="text-white/80 text-[10px] tracking-[0.2em] font-bold uppercase mb-3">Date</label>
                  <div className="w-full h-14 rounded-xl bg-transparent border border-[#cfa86e]/30 flex items-center px-4 gap-4 focus-within:border-[#cfa86e] transition-colors">
                    <Calendar size={18} className="text-[#cfa86e]" />
                    <input type="text" placeholder="Select date" className="w-full bg-transparent text-white placeholder-[#666] outline-none text-sm cursor-pointer" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}} />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-white/80 text-[10px] tracking-[0.2em] font-bold uppercase mb-3">Time</label>
                  <div className="w-full h-14 rounded-xl bg-transparent border border-[#cfa86e]/30 flex items-center px-4 gap-4 focus-within:border-[#cfa86e] transition-colors">
                    <Clock size={18} className="text-[#cfa86e]" />
                    <select className="w-full bg-transparent text-white outline-none text-sm cursor-pointer appearance-none">
                      <option value="" disabled selected className="text-[#666] bg-black">Select time</option>
                      <option value="18:00" className="bg-black">6:00 PM</option>
                      <option value="19:00" className="bg-black">7:00 PM</option>
                      <option value="20:00" className="bg-black">8:00 PM</option>
                      <option value="21:00" className="bg-black">9:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Segmented Guests Control */}
              <div className="flex flex-col">
                <label className="text-white/80 text-[10px] tracking-[0.2em] font-bold uppercase mb-3">Number of Guests</label>
                <div className="w-full h-14 rounded-xl bg-transparent border border-[#cfa86e]/30 flex overflow-hidden">
                  <div className="w-16 h-full flex items-center justify-center border-r border-[#cfa86e]/30 text-[#cfa86e]">
                    <User size={18} />
                  </div>
                  {guestOptions.map((opt) => (
                    <div 
                      key={opt}
                      onClick={() => setGuests(opt)}
                      className={`flex-1 h-full flex items-center justify-center text-sm cursor-pointer transition-all duration-300 border-r border-[#cfa86e]/30 last:border-r-0
                        ${guests === opt 
                          ? 'bg-[#cfa86e]/10 border border-[#cfa86e] text-[#cfa86e] shadow-[inset_0_0_20px_rgba(207,168,110,0.1)] z-10 relative' 
                          : 'text-[#888] hover:bg-[#cfa86e]/5 hover:text-white'
                        }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 4: Textarea */}
              <div className="flex flex-col">
                <label className="text-white/80 text-[10px] tracking-[0.2em] font-bold uppercase mb-3">Special Requests / Dietary Restrictions <span className="text-[#555] normal-case tracking-normal">(Optional)</span></label>
                <div className="w-full rounded-xl bg-transparent border border-[#cfa86e]/30 p-4 focus-within:border-[#cfa86e] transition-colors relative flex">
                  <Pen size={16} className="text-[#cfa86e] shrink-0 mr-4 mt-1" />
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, 250))}
                    placeholder="Let us know if you have any special requests or dietary needs..." 
                    className="w-full h-24 bg-transparent text-white placeholder-[#555] outline-none text-sm resize-none" 
                  />
                  <div className="absolute bottom-4 right-4 text-[#555] text-[10px] tracking-widest">{notes.length}/250</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Full-Width Bars */}
        <div className="w-full max-w-[1600px] mx-auto relative z-20 flex flex-col pt-12 border-t border-[#cfa86e]/20 mt-8">
          
          {/* Trust Features Block */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#cfa86e]/40 flex items-center justify-center shrink-0 bg-[#cfa86e]/5">
                <ShieldCheck size={20} className="text-[#cfa86e]" />
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[#cfa86e] text-xs font-bold tracking-wider uppercase">Instant Confirmation</span>
                <span className="text-[#777] text-sm leading-relaxed">Receive booking details immediately</span>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#cfa86e]/40 flex items-center justify-center shrink-0 bg-[#cfa86e]/5">
                <CalendarClock size={20} className="text-[#cfa86e]" />
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[#cfa86e] text-xs font-bold tracking-wider uppercase">Flexible Changes</span>
                <span className="text-[#777] text-sm leading-relaxed">Easily modify or reschedule</span>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#cfa86e]/40 flex items-center justify-center shrink-0 bg-[#cfa86e]/5">
                <Diamond size={20} className="text-[#cfa86e]" />
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[#cfa86e] text-xs font-bold tracking-wider uppercase">Premium Experience</span>
                <span className="text-[#777] text-sm leading-relaxed">Curated for your perfect moments</span>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full border border-[#cfa86e]/40 flex items-center justify-center shrink-0 bg-[#cfa86e]/5">
                <Lock size={20} className="text-[#cfa86e]" />
              </div>
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[#cfa86e] text-xs font-bold tracking-wider uppercase">Secure & Private</span>
                <span className="text-[#777] text-sm leading-relaxed">Your information is always protected</span>
              </div>
            </div>

          </div>

          {/* Bottom Confirmation Footer */}
          <div className="w-full bg-transparent border border-[#cfa86e]/30 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Subtle glow inside footer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cfa86e]/5 to-transparent pointer-events-none" />

            <div className="flex items-center gap-3 text-white/80 text-xs tracking-widest uppercase font-bold z-10">
              <ShieldCheck size={18} className="text-[#cfa86e]" />
              Secure Booking
            </div>

            <button 
              type="button" 
              className="w-full md:w-auto px-16 h-16 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-black font-bold tracking-[0.2em] uppercase text-xs rounded-xl hover:scale-105 transition-transform duration-500 shadow-[0_0_30px_rgba(207,168,110,0.3)] flex items-center justify-center gap-4 z-10"
            >
              CONFIRM RESERVATION <ArrowRight size={16} />
            </button>

            <div className="text-[#777] text-xs tracking-wider z-10">
              You won't be charged yet
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Reservation;
