import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import {
  MapPin, Calendar, Car as CarIcon, CheckCircle, Zap, Shield, Phone, User, Map, MessageCircle
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. BUTTERY SMOOTH IMAGE SEQUENCE BACKGROUND
// ==========================================
const ImageSequenceBackground = () => {
  const canvasRef = useRef(null);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const totalFrames = 240; // You have 240 frames in the CAR BG folder

  // We'll store our preloaded Image objects here
  const imagesRef = useRef([]);

  useEffect(() => {
    // 1. Preload all the images for zero-lag scrubbing
    const preloadImages = () => {
      let loadedCount = 0;
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        // Format the string to handle padding (e.g., 001, 002... 240)
        const frameNumber = i.toString().padStart(3, '0');
        img.src = `/CAR BG/ezgif-frame-${frameNumber}.jpg`;

        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalFrames) {
            setImagesPreloaded(true);
          }
        };
        imagesRef.current.push(img);
      }
    };

    preloadImages();
  }, [totalFrames]);

  useEffect(() => {
    if (!imagesPreloaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    // Function to draw an image covering the whole canvas (object-fit: cover equivalent)
    const drawImageProp = (img) => {
      if (!img || !canvas || !context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Calculate scale to cover canvas
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

      // Calculate centered coordinates
      const x = (canvasWidth / 2) - (imgWidth / 2) * scale;
      const y = (canvasHeight / 2) - (imgHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    // Draw the very first frame initially
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawImageProp(imagesRef.current[0]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Set up GSAP ScrollTrigger
    // We create a dummy object with a 'frame' property that goes 0 -> 239
    const frameObj = { frame: 0 };

    const ctx = gsap.context(() => {
      gsap.to(frameObj, {
        frame: totalFrames - 1,
        snap: "frame", // ensure we only get whole numbers for frame index
        ease: "none",
        scrollTrigger: {
          trigger: "#root",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5, // 0.5 fixes any choppiness but keeps it responsive
        },
        onUpdate: () => {
          // Whenever the frame updates, redraw the canvas with the new frame
          const currentImg = imagesRef.current[frameObj.frame];
          drawImageProp(currentImg);
        }
      });
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [imagesPreloaded, totalFrames]);

  return (
    <div className="canvas-wrapper" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block' // Removes the extra bottom spacing of inline elements
        }}
      />
      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(10, 10, 15, 0.6)'
      }} />
    </div>
  );
};

// ==========================================
// 2. UI OVERLAY PAGES
// ==========================================
function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedCar, setSelectedCar] = useState("");

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert("🎉 SUCCESS!\n\nYour Ride Request is Received! A confirmation has been sent to you. A NexGen Executive will call you shortly to confirm your identity documents.");
    e.target.reset();
    setSelectedCar("");
  };

  const handleBookThisClick = (carId) => {
    setSelectedCar(carId);

    const bookingSection = document.getElementById("book");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fleet = [
    { id: "safari", name: "Tata Safari (Dark)", type: "Flagship SUV", price: "2,999", img: "/car-safari.png" },
    { id: "fortuner", name: "Toyota Fortuner", type: "Premium SUV", price: "3,499", img: "/car_fortuner.png" },
    { id: "innova", name: "Toyota Innova Crysta", type: "Premium MUV", price: "2,499", img: "/car-innova.png" },
    { id: "thar", name: "Mahindra Thar", type: "Adventure 4x4", price: "2,499", img: "/car-thar.png" },
    { id: "creta", name: "Hyundai Creta", type: "Compact SUV", price: "2,199", img: "/car_creta.png" },
    { id: "verna", name: "Hyundai Verna", type: "Luxury Sedan", price: "1,999", img: "/car-verna.png" },
    { id: "city", name: "Honda City", type: "Premium Sedan", price: "1,899", img: "/car-city.png" },
    { id: "ertiga", name: "Maruti Ertiga", type: "Family MUV", price: "1,799", img: "/car-ertiga.png" },
    { id: "swift", name: "Maruti Swift", type: "Hatchback", price: "1,299", img: "/car_swift.png" },
  ];

  const faqs = [
    { q: "What documents do I need to rent?", a: "A valid Driving License and Aadhar Card/Passport are required for identity verification." },
    { q: "Is fuel included in the price?", a: "Cars are provided with a full tank and must be returned with a full tank. Fuel costs are borne by the renter." },
    { q: "Do you deliver to Indore Airport?", a: "Yes! We offer doorstep delivery to the airport, railway station, or your hotel in Indore." }
  ];

  return (
    <>
      {/* SCROLL IMAGE SEQUENCE BACKGROUND LAYER */}
      <ImageSequenceBackground />

      {/* HTML UI LAYER */}
      <main className="ui-container">
        {/* Navbar */}
        <nav className={"navbar " + (navScrolled ? "scrolled" : "")}>
          <a href="#" className="nav-brand">NEXGEN <span>MOTORS</span></a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#fleet">Fleet</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        {/* Hero Section */}
        <section id="home" className="section hero container">
          <motion.div
            className="content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1>DRIVE YOUR WAY.<br /><span>SELF-DRIVE IN INDORE.</span></h1>
            <p>Premium cars, affordable rates, and zero driver hassle. Explore Madhya Pradesh on your own terms with our well-maintained, GPS-enabled fleet featuring the mighty Dark Edition SUVs.</p>
            <div className="cta-group">
              <a href="#book" className="btn btn-primary">Book Now</a>
              <a href="#fleet" className="btn btn-outline">View Fleet</a>
            </div>
          </motion.div>
        </section>

        {/* Booking Form Section */}
        <section id="book" className="section container" style={{ justifyContent: 'flex-end' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', position: 'relative', zIndex: 10, alignSelf: 'center' }}>
            <h2 style={{ marginTop: '2rem' }}>RESERVE YOUR <span>RIDE</span></h2>
            <form className="booking-form" style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleBookingSubmit}>
              <div className="form-group full">
                <label><MapPin size={16} style={{ display: 'inline', marginBottom: '-3px' }} /> Pickup Location</label>
                <select required style={{ width: '100%' }}>
                  <option value="">Select Location in Indore</option>
                  <option value="airport">Devi Ahilya Bai Holkar Airport</option>
                  <option value="station">Indore Railway Station</option>
                  <option value="palasia">Palasia Square</option>
                  <option value="bhavarkuan">Bhavarkuan</option>
                </select>
              </div>
              <div className="form-group full">
                <label><CarIcon size={16} style={{ display: 'inline', marginBottom: '-3px' }} /> Select Car</label>
                <select
                  required
                  style={{ width: '100%' }}
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                >
                  <option value="">Choose your vehicle</option>
                  <option value="safari">Tata Safari Dark Edition (SUV)</option>
                  <option value="fortuner">Toyota Fortuner (SUV)</option>
                  <option value="innova">Toyota Innova Crysta (MUV)</option>
                  <option value="thar">Mahindra Thar (4x4)</option>
                  <option value="creta">Hyundai Creta (Compact SUV)</option>
                  <option value="verna">Hyundai Verna (Sedan)</option>
                  <option value="city">Honda City (Sedan)</option>
                  <option value="ertiga">Maruti Ertiga (MUV)</option>
                  <option value="swift">Maruti Swift (Hatchback)</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label><Calendar size={16} style={{ display: 'inline', marginBottom: '-3px' }} /> Pickup Date & Time</label>
                  <input type="datetime-local" required style={{ width: '100%' }} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label><Calendar size={16} style={{ display: 'inline', marginBottom: '-3px' }} /> Return Date & Time</label>
                  <input type="datetime-local" required style={{ width: '100%' }} />
                </div>
              </div>
              <div className="form-group full" style={{ marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Check Availability</button>
              </div>
            </form>
          </div>
        </section>

        {/* Fleet Section */}
        <section id="fleet" className="section container" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <h2>OUR WIDE <span>FLEET</span></h2>
          <div className="fleet-grid" style={{ width: '100%', marginTop: '4rem' }}>
            {fleet.map((car, idx) => (
              <div key={idx} className="fleet-card glass-panel">
                <div className="fleet-image-container">
                  <img src={car.img} alt={car.name} className="fleet-img" />
                </div>
                <div className="fleet-category">{car.type}</div>
                <h3>{car.name}</h3>
                <div className="fleet-price">₹{car.price}<span>/day</span></div>

                <div className="fleet-features">
                  <span className="feature-tag">AC</span>
                  <span className="feature-tag">GPS</span>
                  <span className="feature-tag">Bluetooth</span>
                  <span className="feature-tag">Diesel/Petrol</span>
                </div>

                <button
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '1rem', padding: '0.8rem' }}
                  onClick={() => handleBookThisClick(car.id)}
                >
                  Book This
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Steps & Why Choose Us */}
        <section id="how-it-works" className="section container" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ width: '100%' }}>
            <h2 style={{ textAlign: 'center' }}>SIMPLIFIED <span>RENTAL PROCESS</span></h2>
            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <h4>Choose Car</h4>
                <p>Select from our range of well-maintained premium cars.</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <h4>Book Online</h4>
                <p>Pick dates, provide basic details and confirm.</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <h4>Drive Away</h4>
                <p>Get the keys delivered or pickup, and start your journey.</p>
              </div>
            </div>

            <h2 style={{ textAlign: 'center', marginTop: '8rem' }}>WHY CHOOSE <span>NEXGEN</span></h2>
            <div className="features-grid">
              <div className="feature-box glass-panel">
                <div className="feature-icon"><CheckCircle size={32} /></div>
                <h4>Well Maintained</h4>
                <p>Cars serviced regularly for a zero-breakdown experience on your trips.</p>
              </div>
              <div className="feature-box glass-panel">
                <div className="feature-icon"><Zap size={32} /></div>
                <h4>No Hidden Costs</h4>
                <p>Transparent pricing. What you see is exactly what you pay.</p>
              </div>
              <div className="feature-box glass-panel">
                <div className="feature-icon"><Shield size={32} /></div>
                <h4>24/7 Support</h4>
                <p>Round-the-clock roadside assistance to ensure peace of mind.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="section container" style={{ flexDirection: 'column' }}>
          <h2>FREQUENTLY ASKED <span>QUESTIONS</span></h2>
          <div className="faq-list glass-panel" style={{ width: '100%', padding: '2rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={"faq-item " + (activeFaq === idx ? "active" : "")}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <h4>{faq.q}</h4>
                  <span>{activeFaq === idx ? '-' : '+'}</span>
                </div>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact">
          <div className="footer-content">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <div className="nav-brand" style={{ marginBottom: '1rem' }}>NEXGEN <span>MOTORS</span></div>
              <p>The premier self-drive car rental platform serving Indore and surrounding regions of Madhya Pradesh. Experience luxury, freedom, and affordability.</p>
            </div>
            <div className="footer-col">
              <h4>Contact Info</h4>
              <a href="tel:+919876543210"><Phone size={16} style={{ display: 'inline', marginRight: '8px' }} /> +91 98765 43210</a>
              <a href="mailto:hello@nexgenindore.com"><User size={16} style={{ display: 'inline', marginRight: '8px' }} /> hello@nexgenindore.com</a>
              <p style={{ marginTop: '1rem' }}><Map size={16} style={{ display: 'inline', marginRight: '8px' }} /> 123, AB Road, Palasia, Indore, M.P. 452001</p>
            </div>
            <div className="footer-col">
              <h4>Follow Us</h4>
              <div className="socials">
                <a href="#">IG</a>
                <a href="#">FB</a>
                <a href="#">TW</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            &copy; {new Date().getFullYear()} NexGen Motors Indore. All Rights Reserved.
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="whatsapp-float">
        <MessageCircle size={32} />
      </a>
    </>
  );
}

export default App;
