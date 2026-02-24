import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { heroConfig } from '@/config';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-2xl font-bold text-white tracking-wider"
            >
              {heroConfig.brandName}
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {heroConfig.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-[#A0A0A0] hover:text-white transition-colors duration-300 tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="hidden lg:block px-6 py-3 bg-[#FF5C00] text-white text-sm font-bold rounded-lg hover:bg-[#E65100] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF5C00]/30"
            >
              BOOK NOW
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-[#0A0A0F] border-l border-white/10 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-8 pt-24">
            <div className="flex flex-col gap-6">
              {heroConfig.navLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl text-white hover:text-[#FF5C00] transition-colors duration-300"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slideInRight 0.5s ease forwards' : 'none'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="#booking"
              onClick={(e) => handleNavClick(e, '#booking')}
              className="mt-8 block w-full py-4 bg-[#FF5C00] text-white text-center font-bold rounded-lg hover:bg-[#E65100] transition-all duration-300"
            >
              BOOK NOW
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
