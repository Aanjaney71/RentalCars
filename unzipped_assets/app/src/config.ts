// Site Configuration
// Indore Self-Drive Cars - Premium Car Rental Service

export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Indore Self-Drive Cars | Premium Car Rentals",
  siteDescription: "Premium self-drive car rental service in Indore. Book luxury cars, SUVs, and sedans at affordable prices. GPS-enabled, well-maintained vehicles with 24/7 support.",
};

// Hero Section
export interface HeroConfig {
  backgroundText: string;
  heroImage: string;
  heroImageAlt: string;
  overlayText: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundText: "DRIVE",
  heroImage: "/hero-road.jpg",
  heroImageAlt: "Luxury car on open road",
  overlayText: "Premium Self-Drive Experience",
  brandName: "INDORE DRIVE",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Fleet", href: "#fleet" },
    { label: "Booking", href: "#booking" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
};

// Fleet Section
export interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  features: string[];
  fuelType: string;
  seats: number;
}

export interface FleetConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  filterTabs: string[];
  cars: Car[];
}

export const fleetConfig: FleetConfig = {
  subtitle: "OUR FLEET",
  titleRegular: "CHOOSE YOUR",
  titleItalic: "RIDE",
  description: "From compact city cars to luxury SUVs, find the perfect vehicle for your journey.",
  filterTabs: ["ALL", "SUV", "SEDAN", "MUV"],
  cars: [
    {
      id: 1,
      name: "Tata Safari",
      category: "SUV",
      price: 2499,
      image: "/car-safari.png",
      features: ["AC", "Bluetooth", "GPS", "Airbags"],
      fuelType: "Diesel",
      seats: 7,
    },
    {
      id: 2,
      name: "Hyundai Verna",
      category: "SEDAN",
      price: 1799,
      image: "/car-verna.png",
      features: ["AC", "Bluetooth", "GPS", "Sunroof"],
      fuelType: "Petrol",
      seats: 5,
    },
    {
      id: 3,
      name: "Maruti Ertiga",
      category: "MUV",
      price: 1999,
      image: "/car-ertiga.png",
      features: ["AC", "Bluetooth", "GPS", "Spacious"],
      fuelType: "Petrol",
      seats: 7,
    },
    {
      id: 4,
      name: "Toyota Innova Crysta",
      category: "MUV",
      price: 2999,
      image: "/car-innova.png",
      features: ["AC", "Bluetooth", "GPS", "Luxury"],
      fuelType: "Diesel",
      seats: 7,
    },
    {
      id: 5,
      name: "Honda City",
      category: "SEDAN",
      price: 1699,
      image: "/car-city.png",
      features: ["AC", "Bluetooth", "GPS", "Premium"],
      fuelType: "Petrol",
      seats: 5,
    },
    {
      id: 6,
      name: "Mahindra Thar",
      category: "SUV",
      price: 2799,
      image: "/car-thar.png",
      features: ["AC", "Bluetooth", "GPS", "4x4"],
      fuelType: "Diesel",
      seats: 4,
    },
  ],
};

// Booking Section
export interface BookingConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  locations: string[];
  submitButton: string;
}

export const bookingConfig: BookingConfig = {
  subtitle: "RESERVE YOUR RIDE",
  titleRegular: "BOOK IN",
  titleItalic: "SECONDS",
  description: "Simple, fast, and secure booking process. Your adventure awaits.",
  locations: [
    "Indore Railway Station",
    "Indore Airport",
    "City Center",
    "Vijay Nagar",
    "Palasia",
    "Custom Location",
  ],
  submitButton: "CHECK AVAILABILITY",
};

// Why Choose Us Section
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  features: FeatureCard[];
}

export const whyChooseUsConfig: WhyChooseUsConfig = {
  subtitle: "WHY CHOOSE US",
  titleRegular: "THE DRIVE",
  titleItalic: "DIFFERENCE",
  statsLabel: "BY THE NUMBERS",
  stats: [
    { value: 500, suffix: "+", label: "Happy Customers" },
    { value: 10, suffix: "+", label: "Premium Cars" },
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 24, suffix: "/7", label: "Support" },
  ],
  features: [
    {
      icon: "Wallet",
      title: "NO HIDDEN CHARGES",
      description: "Transparent pricing, always. What you see is what you pay.",
    },
    {
      icon: "MapPin",
      title: "GPS ENABLED",
      description: "Track your journey in real-time with our GPS-equipped fleet.",
    },
    {
      icon: "Wrench",
      title: "WELL-MAINTAINED",
      description: "Every car is serviced and sanitized after every trip.",
    },
    {
      icon: "Truck",
      title: "DOORSTEP DELIVERY",
      description: "We bring the car to your location. Convenience at its best.",
    },
    {
      icon: "RotateCcw",
      title: "FREE CANCELLATION",
      description: "Plans changed? Cancel anytime with no fees up to 24h before.",
    },
    {
      icon: "Headphones",
      title: "24/7 SUPPORT",
      description: "Our team is always here to help, anytime you need us.",
    },
  ],
};

// How It Works Section
export interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface HowItWorksConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  steps: Step[];
}

export const howItWorksConfig: HowItWorksConfig = {
  subtitle: "HOW IT WORKS",
  titleRegular: "THREE STEPS TO",
  titleItalic: "FREEDOM",
  steps: [
    {
      id: 1,
      title: "CHOOSE YOUR CAR",
      description: "Browse our fleet and pick your perfect ride from our premium collection.",
      image: "/icon-choose.jpg",
    },
    {
      id: 2,
      title: "BOOK ONLINE",
      description: "Reserve in seconds with our simple and secure booking form.",
      image: "/icon-book.jpg",
    },
    {
      id: 3,
      title: "DRIVE AWAY",
      description: "Pick up your car and hit the road with confidence and freedom.",
      image: "/icon-drive.jpg",
    },
  ],
};

// Testimonials Section
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  subtitle: "TESTIMONIALS",
  titleRegular: "HAPPY",
  titleItalic: "DRIVERS",
  testimonials: [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Business Traveler",
      image: "/avatar-rahul.jpg",
      quote: "Best car rental experience in Indore! The Safari was pristine and the booking process was seamless. Highly recommend!",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Family Vacation",
      image: "/avatar-priya.jpg",
      quote: "Amazing service! GPS tracking gave me peace of mind during my road trip with family. Will book again!",
      rating: 5,
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "Frequent Renter",
      image: "/avatar-amit.jpg",
      quote: "Clean cars, transparent pricing, and excellent customer support. This is my go-to car rental service in Indore.",
      rating: 5,
    },
    {
      id: 4,
      name: "Sneha Gupta",
      role: "Weekend Traveler",
      image: "/avatar-sneha.jpg",
      quote: "Rented the Verna for a weekend getaway. The car was in perfect condition and the delivery was on time.",
      rating: 5,
    },
    {
      id: 5,
      name: "Vikram Rao",
      role: "Corporate Client",
      image: "/avatar-vikram.jpg",
      quote: "Doorstep delivery saved me so much time. Professional service and well-maintained vehicles. Highly recommended!",
      rating: 5,
    },
  ],
};

// Pricing Section
export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  unit: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface PricingConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  plans: PricingPlan[];
}

export const pricingConfig: PricingConfig = {
  subtitle: "PRICING",
  titleRegular: "FLEXIBLE",
  titleItalic: "PLANS",
  plans: [
    {
      id: 1,
      name: "HOURLY",
      price: 299,
      unit: "hour",
      features: [
        "Perfect for short trips",
        "Minimum 4 hours",
        "Fuel not included",
        "Basic insurance",
      ],
      cta: "GET STARTED",
      popular: false,
    },
    {
      id: 2,
      name: "DAILY",
      price: 1499,
      unit: "day",
      features: [
        "Best value for money",
        "24-hour usage",
        "200km included",
        "GPS tracking",
        "Full insurance",
      ],
      cta: "BOOK NOW",
      popular: true,
    },
    {
      id: 3,
      name: "WEEKLY",
      price: 8999,
      unit: "week",
      features: [
        "Extended adventures",
        "7-day usage",
        "1500km included",
        "Priority support",
        "Free delivery",
      ],
      cta: "CHOOSE PLAN",
      popular: false,
    },
  ],
};

// FAQ Section
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "FAQ",
  titleRegular: "QUESTIONS?",
  titleItalic: "ANSWERED.",
  ctaText: "Still have questions?",
  ctaButtonText: "CONTACT US",
  ctaHref: "#contact",
  faqs: [
    {
      id: "1",
      question: "What documents do I need to rent a car?",
      answer: "You need a valid driving license, Aadhaar card, and one additional ID proof (Passport/Voter ID). For international customers, a valid passport and international driving permit are required.",
    },
    {
      id: "2",
      question: "Is there a security deposit?",
      answer: "Yes, we collect a refundable security deposit of ₹5,000-₹10,000 depending on the car category. This is fully refunded within 24 hours of returning the vehicle in good condition.",
    },
    {
      id: "3",
      question: "What is the fuel policy?",
      answer: "Cars are provided with a full tank and should be returned with a full tank. Alternatively, we can refuel for you at market rates plus a small service fee.",
    },
    {
      id: "4",
      question: "Can I cancel my booking?",
      answer: "Yes, we offer free cancellation up to 24 hours before the pickup time. Cancellations within 24 hours may incur a nominal fee of ₹500.",
    },
    {
      id: "5",
      question: "Is there a kilometer limit?",
      answer: "Daily packages include 200km. Additional kilometers are charged at ₹12-₹20 per km depending on the car category. Weekly packages include 1500km.",
    },
    {
      id: "6",
      question: "What if the car breaks down?",
      answer: "All our bookings include 24/7 roadside assistance. Just call our support number and we'll send help immediately. Replacement vehicles are provided if needed.",
    },
  ],
};

// Footer Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  phone: string;
  email: string;
  locationText: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "DRIVE",
  contactLabel: "GET IN TOUCH",
  phone: "+91 98765 43210",
  email: "info@indoredrive.com",
  locationText: "123 MG Road, Indore,\nMadhya Pradesh 452001",
  navigationLabel: "QUICK LINKS",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Our Fleet", href: "#fleet" },
    { label: "Booking", href: "#booking" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  socialLabel: "FOLLOW US",
  socialLinks: [
    { iconName: "Instagram", href: "#", label: "Instagram" },
    { iconName: "Facebook", href: "#", label: "Facebook" },
    { iconName: "Twitter", href: "#", label: "Twitter" },
    { iconName: "MessageCircle", href: "https://wa.me/919876543210", label: "WhatsApp" },
  ],
  tagline: "Premium self-drive car rentals in Indore.\nYour journey begins here.",
  copyright: "© 2024 Indore Self-Drive Cars. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

// Contact Info (for floating buttons)
export interface ContactConfig {
  whatsappNumber: string;
  phoneNumber: string;
}

export const contactConfig: ContactConfig = {
  whatsappNumber: "919876543210",
  phoneNumber: "+91 98765 43210",
};
