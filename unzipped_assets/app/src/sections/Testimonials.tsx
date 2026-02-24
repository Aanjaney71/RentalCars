import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonialsConfig } from '@/config';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsConfig.testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsConfig.testimonials.length) % testimonialsConfig.testimonials.length);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(carouselRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5C00]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {testimonialsConfig.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {testimonialsConfig.titleRegular}{' '}
            <span className="italic font-normal text-[#C0C0C0]">{testimonialsConfig.titleItalic}</span>
          </h2>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Main testimonial card */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-[#141419] rounded-3xl p-8 sm:p-12 border border-white/5 relative overflow-hidden">
              {/* Quote icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-24 h-24 text-[#FF5C00]" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {testimonialsConfig.testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`transition-all duration-500 ${
                      index === activeIndex 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                    }`}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#FF5C00] fill-[#FF5C00]" />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-xl sm:text-2xl text-white leading-relaxed mb-8">
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[#FF5C00]/30"
                        />
                        {/* Glow ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-[#FF5C00] animate-pulse opacity-50" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{testimonial.name}</h4>
                        <p className="text-[#A0A0A0] text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-[#141419] border border-white/10 flex items-center justify-center text-white hover:border-[#FF5C00] hover:text-[#FF5C00] transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonialsConfig.testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'bg-[#FF5C00] w-8' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-[#141419] border border-white/10 flex items-center justify-center text-white hover:border-[#FF5C00] hover:text-[#FF5C00] transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Side cards preview (desktop) */}
          <div className="hidden lg:block">
            {/* Left preview */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-64 opacity-30 scale-75 pointer-events-none"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="bg-[#141419] rounded-2xl p-6 border border-white/5"
                style={{ transform: 'rotateY(25deg) translateZ(-100px)' }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FF5C00] fill-[#FF5C00]" />
                  ))}
                </div>
                <p className="text-white text-sm line-clamp-3">
                  "{testimonialsConfig.testimonials[(activeIndex - 1 + testimonialsConfig.testimonials.length) % testimonialsConfig.testimonials.length].quote}"
                </p>
              </div>
            </div>

            {/* Right preview */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-64 opacity-30 scale-75 pointer-events-none"
              style={{ perspective: '1000px' }}
            >
              <div 
                className="bg-[#141419] rounded-2xl p-6 border border-white/5"
                style={{ transform: 'rotateY(-25deg) translateZ(-100px)' }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FF5C00] fill-[#FF5C00]" />
                  ))}
                </div>
                <p className="text-white text-sm line-clamp-3">
                  "{testimonialsConfig.testimonials[(activeIndex + 1) % testimonialsConfig.testimonials.length].quote}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
