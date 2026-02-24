import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { footerConfig } from '@/config';
import { Instagram, Facebook, Twitter, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  'Instagram': Instagram,
  'Facebook': Facebook,
  'Twitter': Twitter,
  'MessageCircle': MessageCircle,
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const columns = contentRef.current?.querySelectorAll('.footer-column');
      if (columns) {
        gsap.fromTo(columns,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      id="contact" 
      className="relative bg-[#0A0A0F] pt-24 pb-8 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden"
    >
      {/* Large background logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[30vw] font-bold text-white opacity-[0.02] tracking-wider transform -rotate-6">
          {footerConfig.logoText}
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div ref={contentRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          {/* Contact Column */}
          <div className="footer-column">
            <h3 className="text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-6">
              {footerConfig.contactLabel}
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`tel:${footerConfig.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-white hover:text-[#FF5C00] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF5C00]/20 transition-colors duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  {footerConfig.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${footerConfig.email}`}
                  className="flex items-center gap-3 text-white hover:text-[#FF5C00] transition-colors duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF5C00]/20 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  {footerConfig.email}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="whitespace-pre-line">{footerConfig.locationText}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="footer-column">
            <h3 className="text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-6">
              {footerConfig.navigationLabel}
            </h3>
            <ul className="space-y-3">
              {footerConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-[#A0A0A0] hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className="footer-column">
            <h3 className="text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-6">
              {footerConfig.socialLabel}
            </h3>
            <div className="flex gap-4 mb-8">
              {footerConfig.socialLinks.map((social) => {
                const Icon = iconMap[social.iconName] || MessageCircle;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#A0A0A0] hover:bg-[#FF5C00] hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-[#A0A0A0] text-sm whitespace-pre-line">
              {footerConfig.tagline}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#A0A0A0] text-sm">
              {footerConfig.copyright}
            </p>
            <div className="flex gap-6">
              {footerConfig.bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
