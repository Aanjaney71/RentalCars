import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { faqConfig } from '@/config';
import { Plus, Minus, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: itemsRef.current,
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
      id="faq" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#141419] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#141419] to-[#0A0A0F]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {faqConfig.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {faqConfig.titleRegular}{' '}
            <span className="italic font-normal text-[#C0C0C0]">{faqConfig.titleItalic}</span>
          </h2>
        </div>

        {/* FAQ Items */}
        <div ref={itemsRef} className="space-y-4">
          {faqConfig.faqs.map((faq) => (
            <div
              key={faq.id}
              className="faq-item bg-[#0A0A0F] rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  openId === faq.id ? 'text-[#FF5C00]' : 'text-white group-hover:text-[#FF5C00]'
                }`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openId === faq.id 
                    ? 'bg-[#FF5C00] text-white rotate-0' 
                    : 'bg-white/5 text-[#A0A0A0] group-hover:bg-[#FF5C00]/20 group-hover:text-[#FF5C00]'
                }`}>
                  {openId === faq.id ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </span>
              </button>
              
              {/* Answer */}
              <div 
                className={`grid transition-all duration-500 ease-out ${
                  openId === faq.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6">
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-[#A0A0A0] leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#A0A0A0] mb-6">{faqConfig.ctaText}</p>
          <a
            href={faqConfig.ctaHref}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF5C00] text-white font-bold rounded-xl transition-all duration-300 hover:bg-[#E65100] hover:shadow-lg hover:shadow-[#FF5C00]/30 group"
          >
            {faqConfig.ctaButtonText}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
