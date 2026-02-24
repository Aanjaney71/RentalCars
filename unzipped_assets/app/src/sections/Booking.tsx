import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bookingConfig, fleetConfig } from '@/config';
import { MapPin, Calendar, Car, User, Phone, Mail, Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Booking() {
  const [formData, setFormData] = useState({
    location: '',
    pickupDate: '',
    returnDate: '',
    car: '',
    name: '',
    phone: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 80, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.location) newErrors.location = 'Please select a pickup location';
    if (!formData.pickupDate) newErrors.pickupDate = 'Please select pickup date';
    if (!formData.returnDate) newErrors.returnDate = 'Please select return date';
    if (!formData.car) newErrors.car = 'Please select a car';
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        location: '',
        pickupDate: '',
        returnDate: '',
        car: '',
        name: '',
        phone: '',
        email: '',
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="booking" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-[#0A0A0F] overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FF5C00 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#FF5C00] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            {bookingConfig.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {bookingConfig.titleRegular}{' '}
            <span className="italic font-normal text-[#C0C0C0]">{bookingConfig.titleItalic}</span>
          </h2>
          <p className="text-[#A0A0A0] text-lg max-w-2xl mx-auto">
            {bookingConfig.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative bg-[#141419]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-[#FF5C00]/5 pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-2">
                  <MapPin className="w-4 h-4 text-[#FF5C00]" />
                  Pickup Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full bg-[#0A0A0F] border ${errors.location ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-[#FF5C00] focus:ring-1 focus:ring-[#FF5C00] outline-none transition-all`}
                >
                  <option value="">Select location</option>
                  {bookingConfig.locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              {/* Dates */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-2">
                    <Calendar className="w-4 h-4 text-[#FF5C00]" />
                    Pickup Date
                  </label>
                  <input
                    type="datetime-local"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className={`w-full bg-[#0A0A0F] border ${errors.pickupDate ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-[#FF5C00] focus:ring-1 focus:ring-[#FF5C00] outline-none transition-all`}
                  />
                  {errors.pickupDate && <p className="text-red-500 text-xs mt-1">{errors.pickupDate}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-2">
                    <Calendar className="w-4 h-4 text-[#FF5C00]" />
                    Return Date
                  </label>
                  <input
                    type="datetime-local"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className={`w-full bg-[#0A0A0F] border ${errors.returnDate ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-[#FF5C00] focus:ring-1 focus:ring-[#FF5C00] outline-none transition-all`}
                  />
                  {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate}</p>}
                </div>
              </div>

              {/* Car Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-2">
                  <Car className="w-4 h-4 text-[#FF5C00]" />
                  Select Car
                </label>
                <select
                  name="car"
                  value={formData.car}
                  onChange={handleChange}
                  className={`w-full bg-[#0A0A0F] border ${errors.car ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:border-[#FF5C00] focus:ring-1 focus:ring-[#FF5C00] outline-none transition-all`}
                >
                  <option value="">Choose your car</option>
                  {fleetConfig.cars.map(car => (
                    <option key={car.id} value={car.name}>
                      {car.name} - ₹{car.price}/day
                    </option>
                  ))}
                </select>
                {errors.car && <p className="text-red-500 text-xs mt-1">{errors.car}</p>}
              </div>

              {/* Personal Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-2">
                    <User className="w-4 h-4 text-[#FF5C00]" />
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full bg-[#0A0A0F] border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-[#666] focus:border-[#FF5C00] focus:ring-1 focus:ring-[#FF5C00] outline-none transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-2">
                    <Phone className="w-4 h-4 text-[#FF5C00]" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`w-full bg-[#0A0A0F] border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-[#666] focus:border-[#FF5C00] focus:ring-1 focus:ring-[#FF5C00] outline-none transition-all`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm text-[#A0A0A0] mb-2">
                  <Mail className="w-4 h-4 text-[#FF5C00]" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full bg-[#0A0A0F] border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-[#666] focus:border-[#FF5C00] focus:ring-1 focus:ring-[#FF5C00] outline-none transition-all`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full py-4 rounded-xl font-bold text-lg tracking-wider transition-all duration-500 ${
                  isSuccess 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#FF5C00] text-white hover:bg-[#E65100] hover:shadow-lg hover:shadow-[#FF5C00]/30'
                } disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    CHECKING...
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" />
                    BOOKING CONFIRMED!
                  </span>
                ) : (
                  bookingConfig.submitButton
                )}
              </button>
            </div>
          </form>

          {/* Image Side */}
          <div 
            ref={imageRef}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/hero-road.jpg"
                alt="Luxury car experience"
                className="w-full h-[600px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
              
              {/* Floating stats */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-[#141419]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-[#FF5C00]">500+</p>
                      <p className="text-sm text-[#A0A0A0]">Happy Customers</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#FF5C00]">10+</p>
                      <p className="text-sm text-[#A0A0A0]">Premium Cars</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-[#FF5C00]">24/7</p>
                      <p className="text-sm text-[#A0A0A0]">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
