import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fleetConfig } from '@/config';
import { Wind, Music, Navigation, Shield, Users, Fuel } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const featureIcons: Record<string, React.ElementType> = {
  'AC': Wind,
  'Bluetooth': Music,
  'GPS': Navigation,
  'Airbags': Shield,
  'Sunroof': Wind,
  'Spacious': Users,
  'Luxury': Shield,
  'Premium': Shield,
  '4x4': Fuel,
};

export default function Fleet() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const filteredCars = activeFilter === 'ALL' 
    ? fleetConfig.cars 
    : fleetConfig.cars.filter(car => car.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.car-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards when filter changes
  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.car-card');
    if (cards) {
      gsap.fromTo(cards,
        { opacity: 0, scale: 0.9, rotateY: -20 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [activeFilter]);

  return (
    <section 
      ref={sectionRef}
      id="fleet" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#141419] to-[#0A0A0F] opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {fleetConfig.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {fleetConfig.titleRegular}{' '}
            <span className="italic font-normal text-[#C0C0C0]">{fleetConfig.titleItalic}</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            {fleetConfig.description}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {fleetConfig.filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-6 py-3 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
                activeFilter === tab
                  ? 'bg-[#FF5C00] text-white shadow-lg shadow-[#FF5C00]/30'
                  : 'bg-[#141419] text-[#A0A0A0] border border-white/10 hover:border-[#FF5C00]/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Car Cards Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="car-card group relative bg-[#141419] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-[#FF5C00]/30 hover:shadow-2xl hover:shadow-[#FF5C00]/10"
              style={{ 
                transformStyle: 'preserve-3d',
                transform: 'rotateY(-3deg) rotateX(2deg)',
              }}
            >
              {/* Card shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 pointer-events-none" />
              
              {/* Car Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-b from-[#1a1a20] to-[#141419]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#FF5C00]/90 text-white text-xs font-medium rounded-full">
                  {car.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{car.name}</h3>
                
                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature) => {
                    const Icon = featureIcons[feature] || Shield;
                    return (
                      <span 
                        key={feature}
                        className="flex items-center gap-1 text-xs text-[#A0A0A0] bg-white/5 px-2 py-1 rounded"
                      >
                        <Icon className="w-3 h-3" />
                        {feature}
                      </span>
                    );
                  })}
                </div>

                {/* Specs */}
                <div className="flex items-center gap-4 mb-4 text-sm text-[#A0A0A0]">
                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    {car.fuelType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {car.seats} Seats
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div>
                    <span className="text-2xl font-bold text-[#FF5C00]">₹{car.price}</span>
                    <span className="text-[#A0A0A0] text-sm">/day</span>
                  </div>
                  <button className="px-5 py-2.5 bg-[#FF5C00] text-white text-sm font-medium rounded-lg transition-all duration-300 hover:bg-[#E65100] hover:scale-105 hover:shadow-lg hover:shadow-[#FF5C00]/30">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
