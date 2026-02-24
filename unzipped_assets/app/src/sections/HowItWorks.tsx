import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howItWorksConfig } from '@/config';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Path draw animation
      if (pathRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        });
      }

      // Steps animation
      const steps = stepsRef.current?.querySelectorAll('.step-card');
      if (steps) {
        gsap.fromTo(steps,
          { opacity: 0, y: 60, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      // Arrows animation
      const arrows = stepsRef.current?.querySelectorAll('.arrow-icon');
      if (arrows) {
        gsap.fromTo(arrows,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 60%',
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
      id="how-it-works" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#141419] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#141419] to-[#0A0A0F]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {howItWorksConfig.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {howItWorksConfig.titleRegular}{' '}
            <span className="italic font-normal text-[#C0C0C0]">{howItWorksConfig.titleItalic}</span>
          </h2>
        </div>

        {/* Steps */}
        <div 
          ref={stepsRef}
          className="relative"
        >
          {/* SVG Path - Desktop only */}
          <svg 
            className="absolute top-1/2 left-0 w-full h-4 -translate-y-1/2 hidden lg:block"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF5C00" />
                <stop offset="100%" stopColor="#C0C0C0" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 100 8 L 400 8 L 700 8 L 1000 8"
              stroke="url(#pathGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className="opacity-30"
            />
          </svg>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksConfig.steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div 
                  className="step-card relative bg-[#0A0A0F] rounded-3xl p-8 border border-white/5 transition-all duration-500 hover:border-[#FF5C00]/30 hover:shadow-xl hover:shadow-[#FF5C00]/5 group"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 rounded-full bg-[#FF5C00] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#FF5C00]/30 group-hover:scale-110 transition-transform duration-300">
                      {step.id}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mb-6 mt-4 h-40 flex items-center justify-center">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 text-center group-hover:text-[#FF5C00] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#A0A0A0] text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow - Desktop only, not on last item */}
                {index < howItWorksConfig.steps.length - 1 && (
                  <div className="arrow-icon hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-[#FF5C00]/20 flex items-center justify-center">
                      <ChevronRight className="w-6 h-6 text-[#FF5C00]" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
