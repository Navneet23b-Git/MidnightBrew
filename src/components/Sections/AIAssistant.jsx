import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles, Send } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to Midnight Brew. How may I assist you with your selection today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "An excellent choice. Given your preference, I highly recommend our Smoked Caramel Macchiato. It pairs beautifully with our Dark Chocolate Truffle.", 
        isBot: true 
      }]);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[9000] w-14 h-14 rounded-full glass-panel flex items-center justify-center text-brand-gold hover:bg-white/10 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100 hover:scale-110 shadow-[0_0_20px_rgba(207,168,110,0.3)]'}`}
      >
        <Sparkles size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-8 z-[9001] w-[350px] h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-brand-gold" />
                <span className="font-serif text-white text-lg tracking-wide">Midnight Concierge</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-brand-dark/60">
              {messages.map((msg, idx) => (
                <div key={idx} className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${msg.isBot ? 'self-start bg-white/5 text-white/90 rounded-tl-none border border-white/5' : 'self-end bg-brand-gold/20 text-brand-gold rounded-tr-none border border-brand-gold/20'}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40 relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pairings, roasts..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
              />
              <button 
                type="submit"
                className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-gold hover:text-white transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
