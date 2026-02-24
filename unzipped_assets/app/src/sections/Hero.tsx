import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { heroConfig } from '@/config';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background text animation
      gsap.fromTo(bgTextRef.current,
        { opacity: 0, x: -100 },
        { opacity: 0.03, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Content animation
      const elements = contentRef.current?.querySelectorAll('.animate-item');
      if (elements) {
        gsap.fromTo(elements,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: 'power3.out',
            delay: 0.5 
          }
        );
      }

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.8 }
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Scroll indicator pulse
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToFleet = () => {
    document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#141419] to-[#0A0A0F]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF5C00]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#FF5C00]/5 to-transparent" />
      </div>

      {/* Particle effect (CSS-based) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FF5C00]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Large background text */}
      <div 
        ref={bgTextRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[20vw] font-bold text-white opacity-[0.03] tracking-wider">
          {heroConfig.backgroundText}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div ref={contentRef} className="text-center lg:text-left">
            <div className="animate-item">
              <span className="inline-block px-4 py-2 bg-[#FF5C00]/10 border border-[#FF5C00]/30 rounded-full text-[#FF5C00] text-sm font-medium tracking-wider mb-6">
                {heroConfig.overlayText}
              </span>
            </div>
            
            <h1 className="animate-item text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6">
              DRIVE YOUR
              <span className="block text-[#FF5C00]">WAY</span>
            </h1>
            
            <p className="animate-item text-xl text-[#A0A0A0] mb-8 max-w-lg mx-auto lg:mx-0">
              Premium self-drive cars in Indore. Experience freedom on every journey with our GPS-enabled, well-maintained fleet.
            </p>
            
            <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToBooking}
                className="group px-8 py-4 bg-[#FF5C00] text-white font-bold rounded-xl transition-all duration-300 hover:bg-[#E65100] hover:shadow-lg hover:shadow-[#FF5C00]/30 flex items-center justify-center gap-2"
              >
                BOOK NOW
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button 
                onClick={scrollToFleet}
                className="group px-8 py-4 border-2 border-[#C0C0C0] text-white font-bold rounded-xl transition-all duration-300 hover:border-[#FF5C00] hover:text-[#FF5C00] flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                VIEW CARS
              </button>
            </div>

            {/* Stats */}
            <div className="animate-item flex gap-8 mt-12 justify-center lg:justify-start">
              <div>
                <p className="text-3xl font-bold text-[#FF5C00]">500+</p>
                <p className="text-sm text-[#A0A0A0]">Happy Customers</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-[#FF5C00]">10+</p>
                <p className="text-sm text-[#A0A0A0]">Premium Cars</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-[#FF5C00]">24/7</p>
                <p className="text-sm text-[#A0A0A0]">Support</p>
              </div>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div 
            ref={imageRef}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#FF5C00]/20 blur-3xl rounded-full scale-75" />
              
              {/* Car image */}
              <img
                src="/car-safari.png"
                alt="Premium SUV"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
              />
              
              {/* Floating badges */}
              <div className="absolute top-10 right-0 bg-[#141419]/90 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10 animate-pulse">
                <p className="text-[#FF5C00] font-bold">GPS Enabled</p>
              </div>
              
              <div className="absolute bottom-20 left-0 bg-[#141419]/90 backdrop-blur-xl rounded-xl px-4 py-3 border border-white/10">
                <p className="text-white font-bold">₹1,499/day</p>
                <p className="text-[#A0A0A0] text-sm">Starting price</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#A0A0A0]">
        <span className="text-xs tracking-wider">SCROLL</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
      `}</style>
    </section>
  );
}
