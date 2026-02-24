import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyChooseUsConfig } from '@/config';
import { Wallet, MapPin, Wrench, Truck, RotateCcw, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Wallet': Wallet,
  'MapPin': MapPin,
  'Wrench': Wrench,
  'Truck': Truck,
  'RotateCcw': RotateCcw,
  'Headphones': Headphones,
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * eased));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={counterRef}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      const stats = statsRef.current?.querySelectorAll('.stat-item');
      if (stats) {
        gsap.fromTo(stats,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Features animation
      const features = featuresRef.current?.querySelectorAll('.feature-card');
      if (features) {
        gsap.fromTo(features,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="why-choose-us" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#141419] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#141419] to-[#0A0A0F]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {whyChooseUsConfig.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {whyChooseUsConfig.titleRegular}{' '}
            <span className="italic font-normal text-[#C0C0C0]">{whyChooseUsConfig.titleItalic}</span>
          </h2>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {whyChooseUsConfig.stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-item relative bg-[#0A0A0F] rounded-2xl p-8 border border-white/5 text-center group hover:border-[#FF5C00]/30 transition-all duration-500"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#FF5C00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <p className="text-4xl sm:text-5xl font-bold text-[#FF5C00] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[#A0A0A0] text-sm tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div 
          ref={featuresRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyChooseUsConfig.features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Wallet;
            return (
              <div
                key={index}
                className="feature-card group relative bg-[#0A0A0F] rounded-2xl p-8 border border-white/5 transition-all duration-500 hover:border-[#FF5C00]/30 hover:shadow-xl hover:shadow-[#FF5C00]/5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#FF5C00]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF5C00]/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#FF5C00]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#FF5C00] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#FF5C00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
