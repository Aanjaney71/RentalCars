import { useState, useEffect } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { contactConfig } from '@/config';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi! I would like to book a car. Can you help me?');
    window.open(`https://wa.me/${contactConfig.whatsappNumber}?text=${message}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${contactConfig.phoneNumber.replace(/\s/g, '')}`);
  };

  return (
    <>
      {/* Floating Buttons Container */}
      <div 
        className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-4 duration-300">
            {/* Phone Button */}
            <button
              onClick={handlePhoneClick}
              className="group flex items-center gap-3 bg-[#141419] border border-white/10 rounded-full pl-4 pr-2 py-2 shadow-lg hover:border-[#FF5C00]/50 transition-all duration-300"
            >
              <span className="text-white text-sm font-medium">Call Us</span>
              <div className="w-10 h-10 rounded-full bg-[#FF5C00] flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
            </button>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <div className="flex items-center gap-3">
          {isMenuOpen && (
            <span className="text-white text-sm font-medium bg-[#141419] px-4 py-2 rounded-full border border-white/10 shadow-lg animate-in fade-in duration-300">
              Chat on WhatsApp
            </span>
          )}
          <button
            onClick={isMenuOpen ? handleWhatsAppClick : () => setIsMenuOpen(!isMenuOpen)}
            className="group relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-7 h-7 fill-current" />
            )}
            
            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
          </button>
        </div>
      </div>

      {/* Scroll to top indicator (optional) */}
      <div 
        className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <a 
          href="#home"
          className="w-12 h-12 rounded-full bg-[#141419] border border-white/10 flex items-center justify-center text-[#A0A0A0] hover:text-[#FF5C00] hover:border-[#FF5C00]/50 transition-all duration-300"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </a>
      </div>
    </>
  );
}
