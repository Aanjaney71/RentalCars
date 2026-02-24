import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pricingConfig } from '@/config';
import { Check, ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.pricing-card');
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 80, rotateY: (i) => i === 1 ? 0 : (i === 0 ? -15 : 15) },
          {
            opacity: 1,
            y: 0,
            rotateY: (i) => i === 1 ? 0 : (i === 0 ? -5 : 5),
            duration: 0.9,
            stagger: 0.15,
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

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5C00]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {pricingConfig.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {pricingConfig.titleRegular}{' '}
            <span className="italic font-normal text-[#C0C0C0]">{pricingConfig.titleItalic}</span>
          </h2>
        </div>

        {/* Pricing Cards */}
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 items-center"
          style={{ perspective: '1200px' }}
        >
          {pricingConfig.plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card relative rounded-3xl transition-all duration-500 ${
                plan.popular 
                  ? 'bg-gradient-to-b from-[#FF5C00]/20 to-[#141419] border-2 border-[#FF5C00]/50 scale-105 z-10' 
                  : 'bg-[#141419] border border-white/10'
              } ${hoveredCard === plan.id ? 'scale-110 z-20' : ''}`}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: plan.popular ? 'translateZ(50px)' : `rotateY(${index === 0 ? '-5deg' : '5deg'})`,
              }}
              onMouseEnter={() => setHoveredCard(plan.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1.5 bg-[#FF5C00] rounded-full text-white text-sm font-medium shadow-lg shadow-[#FF5C00]/30">
                    <Star className="w-4 h-4 fill-current" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Glow effect for popular */}
              {plan.popular && (
                <div className="absolute inset-0 rounded-3xl bg-[#FF5C00]/10 blur-xl -z-10" />
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-xl font-bold text-white mb-2 text-center">{plan.name}</h3>
                
                {/* Price */}
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-[#FF5C00]">₹{plan.price}</span>
                  <span className="text-[#A0A0A0]">/{plan.unit}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'bg-[#FF5C00]' : 'bg-[#FF5C00]/20'
                      }`}>
                        <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-[#FF5C00]'}`} />
                      </div>
                      <span className="text-[#A0A0A0] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group ${
                    plan.popular
                      ? 'bg-[#FF5C00] text-white hover:bg-[#E65100] hover:shadow-lg hover:shadow-[#FF5C00]/30'
                      : 'bg-transparent border-2 border-[#FF5C00] text-[#FF5C00] hover:bg-[#FF5C00] hover:text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
