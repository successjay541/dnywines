'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import assetFetcher from './fetcher';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [counters, setCounters] = useState({
    premiumWine: 0,
    brands: 0,
    customers: 0,
    delivery: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Preload assets on component mount
  useEffect(() => {
    const preloadAssets = async () => {
      setIsLoading(true);
      
      // Use the new preloadLogo method
      await assetFetcher.preloadLogo();
      
      // Wait for logo to load
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };
    
    preloadAssets();
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto slide images every 4 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2); // 2 images (0 and 1)
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  // Animated counters for stats
  useEffect(() => {
    const targetValues = {
      premiumWine: 150,
      brands: 100,
      customers: 1000,
      delivery: 24
    };

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames per second
    const interval = duration / steps;

    const countersInterval = setInterval(() => {
      setCounters(prev => ({
        premiumWine: Math.min(prev.premiumWine + Math.ceil(targetValues.premiumWine / steps), targetValues.premiumWine),
        brands: Math.min(prev.brands + Math.ceil(targetValues.brands / steps), targetValues.brands),
        customers: Math.min(prev.customers + Math.ceil(targetValues.customers / steps), targetValues.customers),
        delivery: Math.min(prev.delivery + Math.ceil(targetValues.delivery / steps), targetValues.delivery)
      }));
    }, interval);

    setTimeout(() => {
      clearInterval(countersInterval);
    }, duration);

    return () => clearInterval(countersInterval);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  // Array of image filenames a through t (20 images)
  const wineImages = [
    'a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg', 'g.jpg', 'h.jpg', 
    'i.jpg', 'j.jpg', 'k.jpg', 'l.jpg', 'm.jpg', 'n.jpg', 'o.jpg', 'p.jpg', 
    'q.jpg', 'r.jpg', 's.jpg', 't.jpg'
  ];

  // Loading screen
  if (isLoading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        zIndex: 9999
      }}>
        {/* The fetcher.ts is handling the loading screen */}
      </div>
    );
  }

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-content">
          {/* UPDATED LOGO SECTION WITH LOCAL IMAGE */}
          <div className="logo animate-logo">
            <div className="logo-container">
              <img 
                src="/image/dnylogo.jpg" 
                alt="DNY Wine Hub Logo" 
                className="logo-image"
              />
              <div className="logo-glow"></div>
              <div className="logo-sparkle logo-sparkle-1"></div>
              <div className="logo-sparkle logo-sparkle-2"></div>
              <div className="logo-sparkle logo-sparkle-3"></div>
            </div>
            <div className="logo-text">
              <h1>DNY Wine Hub</h1>
              <div className="logo-tagline">Premium Wines & Essentials</div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="nav-link">
              <span className="nav-text">Home</span>
              <span className="nav-underline"></span>
            </a>
            <a href="#collections" onClick={(e) => handleLinkClick(e, 'collections')} className="nav-link">
              <span className="nav-text">Collections</span>
              <span className="nav-underline"></span>
            </a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="nav-link">
              <span className="nav-text">About</span>
              <span className="nav-underline"></span>
            </a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="nav-link">
              <span className="nav-text">Contact</span>
              <span className="nav-underline"></span>
            </a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
            <span className="menu-icon-bar"></span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="mobile-nav-link">
            <span>Home</span>
            <span className="link-arrow">→</span>
          </a>
          <a href="#collections" onClick={(e) => handleLinkClick(e, 'collections')} className="mobile-nav-link">
            <span>Collections</span>
            <span className="link-arrow">→</span>
          </a>
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="mobile-nav-link">
            <span>About</span>
            <span className="link-arrow">→</span>
          </a>
          <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="mobile-nav-link">
            <span>Contact</span>
            <span className="link-arrow">→</span>
          </a>
        </div>
      </header>

      <main>
        {/* Home Section - Updated with DNY Logo Image */}
        <section id="home" className="section hero-section">
          <div className="hero-content">
            <div className="hero-text animate-slide-up">
              <h2 className="hero-title">PREMIUM WINES & ESSENTIALS</h2>
              <h3 className="hero-subtitle-main">CURATED FOR EVERY OCCASION</h3>
              <p className="hero-description">
                DNY Wine Hub Is Your Trusted Destination For Premium Wines And Carefully Selected Accessories.
              </p>
              <button className="cta-button animate-pulse">
                <span>Shop Our Collection</span>
                <svg className="button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 7L18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 7H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </button>
            </div>
            <div className="hero-image-container animate-fade-in">
              {/* REPLACED ANIMATION WITH DNY LOGO IMAGE */}
              <div className="logo-display-container">
                <div className="logo-display">
                  <img 
                    src="/image/dnylogo.jpg" 
                    alt="DNY Wine Hub Logo" 
                    className="logo-display-image"
                  />
                  <div className="logo-display-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW STATS SECTION - From your uploaded image */}
        <section className="stats-section animate-slide-up">
          <div className="stats-container">
            <div className="stats-header">
              <h2 className="stats-title">Why Choose DNY Wine Hub?</h2>
              <p className="stats-subtitle">Experience excellence in every bottle and accessory</p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card animate-card" style={{ animationDelay: '0.1s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    <span className="counter">{counters.premiumWine}</span>
                    <span className="plus">+</span>
                  </div>
                  <h3 className="stat-label">Premium Wine & Accessory</h3>
                  <p className="stat-description">Curated selection of premium wines and essential accessories</p>
                </div>
                <div className="stat-decoration"></div>
              </div>

              <div className="stat-card animate-card" style={{ animationDelay: '0.2s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    <span className="counter">{counters.brands}</span>
                    <span className="percent">%</span>
                  </div>
                  <h3 className="stat-label">Authentic & Verified Brands</h3>
                  <p className="stat-description">Only genuine products from verified and trusted brands</p>
                </div>
                <div className="stat-decoration"></div>
              </div>

              <div className="stat-card animate-card" style={{ animationDelay: '0.3s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.06 13.31L11.53 15.78C11.21 15.95 10.79 15.95 10.47 15.78L5.94 13.31C5.65 13.15 5.5 12.83 5.5 12.5V8.5C5.5 8.17 5.65 7.85 5.94 7.69L10.47 5.22C10.79 5.05 11.21 5.05 11.53 5.22L16.06 7.69C16.35 7.85 16.5 8.17 16.5 8.5V12.5C16.5 12.83 16.35 13.15 16.06 13.31Z" 
                      stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    <span className="counter">{counters.customers}</span>
                    <span className="plus">+</span>
                  </div>
                  <h3 className="stat-label">Satisfied Adult Customers</h3>
                  <p className="stat-description">Thousands of happy customers trust our premium selections</p>
                </div>
                <div className="stat-decoration"></div>
              </div>

              <div className="stat-card animate-card" style={{ animationDelay: '0.4s' }}>
                <div className="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    <span className="counter">{counters.delivery}</span>
                    <span className="hours"> Hrs</span>
                  </div>
                  <h3 className="stat-label">Fast & Secure Delivery</h3>
                  <p className="stat-description">Quick and secure delivery to your doorstep within 24 hours</p>
                </div>
                <div className="stat-decoration"></div>
              </div>
            </div>
          </div>
        </section>

        {/* UPDATED IMAGE SLIDER SECTION - Compact and Fully Visible */}
        <section className="image-slider-section">
          <div className="slider-container">
            <div className="slider-wrapper">
              <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {/* FIRST IMAGE */}
                <div className="slide">
                  <div className="slide-image slide-image-1">
                    <img src="/image/glenfidish.jpg" alt="Glenfidish Wine" />
                    <div className="image-overlay"></div>
                  </div>
                </div>
                
                {/* SECOND IMAGE */}
                <div className="slide">
                  <div className="slide-image slide-image-2">
                    <img src="/image/Asconi.jpg" alt="Asconi Wine" />
                    <div className="image-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="slider-controls">
              <button 
                className={`slider-dot ${currentSlide === 0 ? 'active' : ''}`}
                onClick={() => setCurrentSlide(0)}
                aria-label="Show slide 1"
              />
              <button 
                className={`slider-dot ${currentSlide === 1 ? 'active' : ''}`}
                onClick={() => setCurrentSlide(1)}
                aria-label="Show slide 2"
              />
            </div>
          </div>
        </section>

        {/* NEW PROMOTIONAL SECTION - Added after image slider */}
        <section className="promotional-section animate-slide-up">
          <div className="promotional-container">
            <div className="promotional-header">
              <h2 className="promotional-title">MORE THAN A WINE STORE</h2>
              <p className="promotional-subtitle">DNY Wine Hub Was Created For People Who Appreciate Quality And Authenticity</p>
            </div>
            
            <div className="promotional-content">
              <div className="promotional-text">
                <p className="promotional-description">
                  We Source Premium Wines From Trusted Suppliers And Complement Them With Carefully Selected Lifestyle Accessories.
                </p>
                <div className="promotional-cta">
                  <p className="cta-text">Discover Premium Wines And Trusted Essentials, Delivered With Care And Authenticity</p>
                  <button className="promotional-button">
                    <span>Explore Our Selection</span>
                    <svg className="button-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 7L18 12L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M6 7H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="promotional-images">
                <div className="image-grid">
                  <div className="image-item image-item-1">
                    <img src="/image/1.jpg" alt="Wine Collection 1" />
                    <div className="image-overlay-promo"></div>
                  </div>
                  <div className="image-item image-item-2">
                    <img src="/image/2.jpg" alt="Wine Collection 2" />
                    <div className="image-overlay-promo"></div>
                  </div>
                  <div className="image-item image-item-3">
                    <img src="/image/3.jpg" alt="Wine Collection 3" />
                    <div className="image-overlay-promo"></div>
                  </div>
                  <div className="image-item image-item-4">
                    <img src="/image/4.jpg" alt="Wine Collection 4" />
                    <div className="image-overlay-promo"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UPDATED Collections Section with Wine Images and Purchase Buttons */}
        <section id="collections" className="section collections-section">
          <div className="section-header">
            <h2 className="section-title">FIND YOUR PERFECT BOTTLE</h2>
            <p className="section-description">
              To Complete The Experience, DNY Wine Hub Offers A Range Of Essential Accessories From Trusted Brands. 
              These Products Are Carefully Selected To Complement Your Purchase While Maintaining Quality And Authenticity.
            </p>
          </div>
          
         <div className="wine-collections-grid">
            {wineImages.map((imageName, index) => (
              <div key={index} className="wine-collection-card animate-card" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="wine-image">
                  <img src={`/image/${imageName}`} alt="Wine Collection" />
                  <div className="image-overlay-collection"></div>
                </div>
                <button className="purchase-button">
                  Purchase
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* UPDATED About Section with Wine Branding */}
        <section id="about" className="section about-section">
          <div className="about-container">
            <div className="about-brand-logo animate-slide-up">
              <h2 className="brand-title">DNY WINES HUB</h2>
              <div className="brand-badges">
                <span className="badge badge-limited">LIMITED</span>
                <span className="badge badge-since">SINCE 2021</span>
              </div>
              <p className="brand-tagline">Premium Wines. Trusted Essentials</p>
            </div>
            
            <div className="about-content">
              <div className="about-image-side">
                <div className="about-wine-image">
                  <img src="/image/dnylogo.jpg" alt="DNY Wine Hub Logo" />
                  <div className="wine-image-overlay"></div>
                </div>
              </div>
              
              <div className="about-text-side">
                <div className="about-mission animate-slide-left">
                  <h3 className="mission-title">OUR MISSION</h3>
                  <p className="mission-description">
                    At DNY Wine Hub, we believe that every bottle tells a story and every accessory enhances the experience. 
                    We are dedicated to bringing you the finest selection of premium wines and carefully curated essentials 
                    that celebrate the art of wine appreciation.
                  </p>
                </div>
                
                <div className="about-values animate-slide-left" style={{ animationDelay: '0.2s' }}>
                  <h3 className="values-title">OUR VALUES</h3>
                  <div className="values-grid">
                    <div className="value-item">
                      <div className="value-icon">🍷</div>
                      <h4>Quality First</h4>
                      <p>Every product is selected for its exceptional quality and authenticity</p>
                    </div>
                    <div className="value-item">
                      <div className="value-icon">🎯</div>
                      <h4>Curated Selection</h4>
                      <p>Carefully chosen wines and accessories that complement each other</p>
                    </div>
                    <div className="value-item">
                      <div className="value-icon">🤝</div>
                      <h4>Trust & Transparency</h4>
                      <p>Verified brands and honest information about every product</p>
                    </div>
                    <div className="value-item">
                      <div className="value-icon">💎</div>
                      <h4>Premium Experience</h4>
                      <p>Elevating your wine journey with exceptional service and products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UPDATED Contact Section - Removed location icon and adjusted font weights */}
        <section id="contact" className="section contact-section">
          <div className="contact-container">
            <div className="contact-header">
              <h2 className="section-title">Our Office Address</h2>
              <p className="contact-description">Visit us or get in touch with our team</p>
            </div>
            <div className="contact-content">
              <div className="contact-address animate-slide-up">
                <div className="address-card">
                  <div className="company-title">DNY WINES HUB LIMITED</div>
                  <div className="address-details">
                    <p className="address-line">Justice Mall, 3 Nnobi Lane,</p>
                    <p className="address-line">Lekki Peninsula II, Lekki Eti-Osa</p>
                    <p className="address-line">Lagos State, Lagos, NG</p>
                    <p className="address-line">Lekki - Epe Expy, Igbo-Efon,</p>
                    <p className="address-line">Lagos I06104, Lekki, Lagos,</p>
                    <p className="address-line">Nigeria</p>
                  </div>
                  <div className="contact-divider"></div>
                  <div className="contact-links">
                    <div className="contact-item">
                      <div className="contact-icon">📱</div>
                      <div className="contact-text">09133555573</div>
                    </div>
                    <a href="https://www.instagram.com/dnywineshub" target="_blank" rel="noopener noreferrer" className="contact-item">
                      <div className="contact-image-icon">
                        <img src="/image/instagram.png" alt="Instagram" />
                      </div>
                      <div className="contact-text">@Dnywineshub</div>
                    </a>
                    <a href="https://snapchat.com/t/d2v5ZFhh" target="_blank" rel="noopener noreferrer" className="contact-item">
                      <div className="contact-image-icon">
                        <img src="/image/snaptchat.png" alt="Snapchat" />
                      </div>
                      <div className="contact-text">@Dnywineshub</div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-policies animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="policies-section">
                  <h3 className="policies-title">Terms & Conditions</h3>
                  <p className="policies-description">
                    We adhere to all legal requirements and ensure responsible service.
                    Please review our terms for complete details on purchases and services.
                  </p>
                </div>
                <div className="policies-section">
                  <h3 className="policies-title">Privacy Policy</h3>
                  <p className="policies-description">
                    Your privacy is important to us. We protect your personal information
                    and ensure secure transactions.
                  </p>
                </div>
                <div className="age-warning">
                  <div className="warning-icon">⚠️</div>
                  <div className="warning-text">
                    <strong className="warning-bold">18+ Only | Drink Responsibly</strong>
                    <p className="warning-message">Enjoy our premium selection responsibly and in moderation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>DNY Wine Hub</h2>
            <p className="footer-tagline">Premium wines curated for every occasion</p>
          </div>
          <div className="footer-links">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>Home</a>
            <a href="#collections" onClick={(e) => handleLinkClick(e, 'collections')}>Collections</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
          </div>
          <div className="footer-social">
            {/* Social media icons removed as requested */}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 DNY Wine Hub. All rights reserved.</p>
          <p className="footer-note">Curated with passion and precision</p>
        </div>
      </footer>

      <style jsx>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          color: #333;
          overflow-x: hidden;
          font-weight: normal; /* Reduced font weight */
        }

        a {
          text-decoration: none;
          color: inherit;
          font-weight: normal; /* Reduced font weight */
        }

        button {
          border: none;
          background: none;
          cursor: pointer;
          font-family: inherit;
          font-weight: normal; /* Reduced font weight */
        }

        /* Header Styles */
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: rgba(30, 30, 30, 0.95);
          backdrop-filter: blur(10px);
          color: #fff;
          z-index: 1000;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header.scrolled {
          padding: 5px 0;
          background-color: rgba(30, 30, 30, 0.98);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        /* UPDATED LOGO STYLES WITH IMAGE AND ANIMATIONS */
        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
          overflow: hidden;
        }

        .logo-container {
          position: relative;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 
            0 0 20px rgba(212, 175, 55, 0.3),
            0 0 40px rgba(139, 69, 19, 0.2),
            inset 0 0 20px rgba(255, 255, 255, 0.1);
          animation: logoGlow 4s ease-in-out infinite;
          border: 2px solid rgba(212, 175, 55, 0.5);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .logo-container:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 
            0 0 30px rgba(212, 175, 55, 0.5),
            0 0 60px rgba(139, 69, 19, 0.3),
            inset 0 0 30px rgba(255, 255, 255, 0.2);
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 1;
          transition: all 0.5s ease;
        }

        .logo-container:hover .logo-image {
          transform: scale(1.1);
        }

        .logo-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, 
            rgba(212, 175, 55, 0.3) 0%,
            rgba(139, 69, 19, 0.1) 50%,
            transparent 70%);
          animation: glowPulse 3s ease-in-out infinite;
          z-index: 0;
        }

        .logo-sparkle {
          position: absolute;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          z-index: 2;
        }

        .logo-sparkle-1 {
          width: 8px;
          height: 8px;
          top: 10px;
          left: 10px;
          animation: sparkleTwinkle 1.5s ease-in-out infinite;
        }

        .logo-sparkle-2 {
          width: 6px;
          height: 6px;
          bottom: 15px;
          right: 15px;
          animation: sparkleTwinkle 2s ease-in-out infinite 0.5s;
        }

        .logo-sparkle-3 {
          width: 4px;
          height: 4px;
          top: 20px;
          right: 20px;
          animation: sparkleTwinkle 2.5s ease-in-out infinite 1s;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .logo h1 {
          font-size: 1.8rem;
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600; /* Reduced font weight */
          letter-spacing: -0.5px;
          font-family: 'Georgia', serif;
          margin: 0;
          line-height: 1;
          transition: all 0.3s ease;
        }

        .logo:hover h1 {
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }

        .logo-tagline {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 400; /* Reduced font weight */
          opacity: 0;
          transform: translateY(-10px);
          animation: taglineSlide 0.5s ease-out 0.5s forwards;
        }

        @media (max-width: 768px) {
          .logo-container {
            width: 50px;
            height: 50px;
          }

          .logo h1 {
            font-size: 1.4rem;
          }

          .logo-tagline {
            font-size: 0.6rem;
          }
        }

        @media (max-width: 480px) {
          .logo {
            gap: 10px;
          }

          .logo-container {
            width: 40px;
            height: 40px;
          }

          .logo h1 {
            font-size: 1.2rem;
          }

          .logo-tagline {
            font-size: 0.5rem;
          }
        }

        /* NEW LOGO ANIMATIONS */
        @keyframes logoGlow {
          0%, 100% {
            box-shadow: 
              0 0 20px rgba(212, 175, 55, 0.3),
              0 0 40px rgba(139, 69, 19, 0.2),
              inset 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 
              0 0 30px rgba(212, 175, 55, 0.5),
              0 0 60px rgba(139, 69, 19, 0.3),
              inset 0 0 30px rgba(255, 255, 255, 0.2);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes sparkleTwinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes taglineSlide {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-logo {
          animation: logoFloat 2s ease-in-out infinite;
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          gap: 30px;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
        }

        .nav-link {
          position: relative;
          font-weight: 400; /* Reduced font weight */
          font-size: 1rem;
          padding: 8px 0;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #D4AF37;
        }

        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .nav-link:hover .nav-underline {
          transform: translateX(0);
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: none;
          width: 30px;
          height: 30px;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          padding: 0;
          z-index: 1001;
        }

        @media (max-width: 768px) {
          .mobile-menu-button {
            display: flex;
          }
        }

        .menu-icon-bar {
          display: block;
          width: 100%;
          height: 3px;
          background-color: #fff;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .mobile-menu-button.open .menu-icon-bar:nth-child(1) {
          transform: translateY(11px) rotate(45deg);
        }

        .mobile-menu-button.open .menu-icon-bar:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-button.open .menu-icon-bar:nth-child(3) {
          transform: translateY(-11px) rotate(-45deg);
        }

        /* Mobile Navigation */
        .mobile-nav {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background-color: rgba(30, 30, 30, 0.98);
          backdrop-filter: blur(15px);
          padding: 20px;
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 999;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          font-size: 1.2rem;
          font-weight: 400; /* Reduced font weight */
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover {
          color: #D4AF37;
          padding-left: 10px;
        }

        .mobile-nav-link:last-child {
          border-bottom: none;
        }

        .link-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Section Common Styles */
        .section {
          padding: 100px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .section {
            padding: 80px 20px;
          }
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #333, #555);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 600; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
        }

        .section-description {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
          font-weight: normal; /* Reduced font weight */
        }

        /* NEW STATS SECTION STYLES */
        .stats-section {
          padding: 100px 20px;
          background: linear-gradient(135deg, #f9f5f0 0%, #f2ebe3 100%);
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(128, 0, 32, 0.05) 0%, transparent 50%);
        }

        .stats-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .stats-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .stats-title {
          font-size: 2.8rem;
          margin-bottom: 15px;
          background: linear-gradient(90deg, #8B4513, #D2691E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Georgia', serif;
          font-weight: 600; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .stats-title {
            font-size: 2.2rem;
          }
        }

        .stats-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: normal; /* Reduced font weight */
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .stat-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(139, 69, 19, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(139, 69, 19, 0.15);
          border-color: rgba(139, 69, 19, 0.3);
        }

        .stat-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(128, 0, 32, 0.1));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: #8B4513;
          transition: all 0.3s ease;
        }

        .stat-card:hover .stat-icon {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.2), rgba(128, 0, 32, 0.2));
        }

        .stat-icon svg {
          width: 32px;
          height: 32px;
        }

        .stat-content {
          flex: 1;
          width: 100%;
        }

        .stat-number {
          font-size: 3.5rem;
          font-weight: 600; /* Reduced font weight */
          margin-bottom: 10px;
          color: #8B4513;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 5px;
        }

        @media (max-width: 768px) {
          .stat-number {
            font-size: 2.8rem;
          }
        }

        .counter {
          display: inline-block;
          min-width: 60px;
        }

        .plus, .percent, .hours {
          font-size: 1.5rem;
          color: #D2691E;
          font-weight: 500; /* Reduced font weight */
        }

        .stat-label {
          font-size: 1.3rem;
          margin-bottom: 10px;
          color: #333;
          font-weight: 500; /* Reduced font weight */
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .stat-label {
            font-size: 1.2rem;
          }
        }

        .stat-description {
          color: #666;
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.9;
          font-weight: normal; /* Reduced font weight */
        }

        .stat-decoration {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #8B4513, #D2691E);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }

        .stat-card:hover .stat-decoration {
          transform: scaleX(1);
        }

        /* UPDATED IMAGE SLIDER SECTION - Compact, Fully Visible */
        .image-slider-section {
          width: 100%;
          padding: 60px 20px;
          background: #1a1a1a;
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .image-slider-section {
            padding: 40px 20px;
          }
        }

        .slider-container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .slider-wrapper {
          width: 100%;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          position: relative;
          background: #000;
        }

        .slider-track {
          display: flex;
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
          width: 200%;
        }

        .slide {
          width: 100%;
          flex-shrink: 0;
          position: relative;
        }

        .slide-image {
          width: 100%;
          height: 400px;
          position: relative;
        }

        .slide-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 768px) {
          .slide-image {
            height: 300px;
          }
        }

        @media (max-width: 480px) {
          .slide-image {
            height: 250px;
          }
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.05), rgba(128, 0, 32, 0.05));
        }

        .slider-controls {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .slider-controls {
            margin-top: 15px;
          }
        }

        .slider-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        @media (max-width: 768px) {
          .slider-dot {
            width: 8px;
            height: 8px;
          }
        }

        .slider-dot:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        .slider-dot.active {
          background: #D4AF37;
          transform: scale(1.3);
        }

        /* NEW PROMOTIONAL SECTION STYLES */
        .promotional-section {
          padding: 100px 20px;
          background: linear-gradient(135deg, #fff 0%, #f8f5f0 100%);
          position: relative;
          overflow: hidden;
        }

        .promotional-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 5% 10%, rgba(139, 69, 19, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 95% 90%, rgba(128, 0, 32, 0.03) 0%, transparent 40%);
        }

        .promotional-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .promotional-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .promotional-title {
          font-size: 2.8rem;
          margin-bottom: 15px;
          background: linear-gradient(90deg, #8B4513, #D2691E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Georgia', serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .promotional-title {
            font-size: 2rem;
            letter-spacing: 1px;
          }
        }

        .promotional-subtitle {
          font-size: 1.3rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .promotional-subtitle {
            font-size: 1.1rem;
          }
        }

        .promotional-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .promotional-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .promotional-text {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .promotional-description {
          font-size: 1.2rem;
          color: #444;
          line-height: 1.7;
          font-weight: 300; /* Reduced font weight */
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .promotional-description {
            font-size: 1.1rem;
          }
        }

        .promotional-cta {
          margin-top: 20px;
          padding: 30px;
          background: rgba(139, 69, 19, 0.05);
          border-radius: 15px;
          border: 1px solid rgba(139, 69, 19, 0.1);
        }

        .cta-text {
          font-size: 1.1rem;
          color: #333;
          margin-bottom: 25px;
          line-height: 1.6;
          font-weight: 400; /* Reduced font weight */
        }

        .promotional-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(90deg, #8B4513, #D2691E);
          color: white;
          padding: 16px 35px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 500; /* Reduced font weight */
          box-shadow: 0 5px 20px rgba(139, 69, 19, 0.3);
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Georgia', serif;
        }

        .promotional-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
          gap: 15px;
          background: linear-gradient(90deg, #D2691E, #8B4513);
        }

        .button-arrow {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .promotional-button:hover .button-arrow {
          transform: translateX(5px);
        }

        .promotional-images {
          position: relative;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 15px;
          aspect-ratio: 1;
          max-width: 500px;
          margin: 0 auto;
        }

        .image-item {
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .image-item:hover {
          transform: scale(1.05) rotate(1deg);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
          z-index: 2;
        }

        .image-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay-promo {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(128, 0, 32, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-item:hover .image-overlay-promo {
          opacity: 1;
        }

        /* UPDATED Collections Section Styles */
        .wine-collections-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: 40px;
        }

        @media (max-width: 1200px) {
          .wine-collections-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 900px) {
          .wine-collections-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .wine-collections-grid {
            grid-template-columns: 1fr;
          }
        }

        .wine-collection-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(139, 69, 19, 0.1);
          display: flex;
          flex-direction: column;
        }

        .wine-collection-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(139, 69, 19, 0.15);
          border-color: rgba(139, 69, 19, 0.3);
        }

        .wine-image {
          width: 100%;
          height: 250px;
          position: relative;
          transition: all 0.3s ease;
        }

        .wine-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wine-collection-card:hover .wine-image {
          transform: scale(1.05);
        }

        .image-overlay-collection {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .wine-collection-card:hover .image-overlay-collection {
          opacity: 1;
        }

        .purchase-button {
          background: linear-gradient(90deg, #8B4513, #D2691E);
          color: white;
          padding: 15px 20px;
          font-size: 1rem;
          font-weight: 500; /* Reduced font weight */
          text-transform: uppercase;
          letter-spacing: 1px;
          width: 100%;
          border-top: 1px solid rgba(139, 69, 19, 0.2);
          transition: all 0.3s ease;
          font-family: 'Georgia', serif;
          position: relative;
          overflow: hidden;
        }

        .purchase-button:hover {
          background: linear-gradient(90deg, #D2691E, #8B4513);
          letter-spacing: 2px;
        }

        .purchase-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 0;
          border-radius: 100%;
          transform: scale(1, 1) translate(-50%);
          transform-origin: 50% 50%;
        }

        .purchase-button:focus:not(:active)::after {
          animation: ripple 1s ease-out;
        }

        @keyframes ripple {
          0% {
            transform: scale(0, 0);
            opacity: 0.5;
          }
          100% {
            transform: scale(20, 20);
            opacity: 0;
          }
        }

        /* Updated Hero Section - Wine Theme */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 120px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          overflow: hidden;
          position: relative;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(128, 0, 32, 0.1) 0%, transparent 50%);
        }

        .hero-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 992px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
          }
        }

        .hero-text {
          flex: 1;
          color: #fff;
        }

        .hero-title {
          font-size: 3.2rem;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          font-family: 'Georgia', serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.3rem;
          }
        }

        .hero-subtitle-main {
          font-size: 1.8rem;
          margin-bottom: 25px;
          color: #D4AF37;
          font-weight: 300; /* Reduced font weight */
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .hero-subtitle-main {
            font-size: 1.3rem;
          }
        }

        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 40px;
          line-height: 1.6;
          max-width: 500px;
          font-weight: 300; /* Reduced font weight */
          letter-spacing: 0.5px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(90deg, #8B4513, #D2691E);
          color: white;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 500; /* Reduced font weight */
          box-shadow: 0 5px 20px rgba(139, 69, 19, 0.4);
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-family: 'Georgia', serif;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(139, 69, 19, 0.6);
          gap: 15px;
          background: linear-gradient(90deg, #D2691E, #8B4513);
        }

        .button-icon {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
        }

        .cta-button:hover .button-icon {
          transform: translateX(5px);
        }

        /* UPDATED: Replaced animation with DNY Logo Image */
        .hero-image-container {
          flex: 1;
          position: relative;
          height: 500px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1000px;
        }

        @media (max-width: 992px) {
          .hero-image-container {
            height: 400px;
            margin-top: 40px;
          }
        }

        .logo-display-container {
          width: 300px;
          height: 300px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-display {
          position: relative;
          width: 250px;
          height: 250px;
          animation: logoFloat 6s ease-in-out infinite;
        }

        .logo-display-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 
            0 0 40px rgba(212, 175, 55, 0.4),
            0 0 80px rgba(139, 69, 19, 0.3),
            0 20px 60px rgba(0, 0, 0, 0.5);
          border: 3px solid rgba(212, 175, 55, 0.3);
          transition: all 0.5s ease;
          position: relative;
          z-index: 2;
        }

        .logo-display:hover .logo-display-image {
          transform: scale(1.05) rotate(2deg);
          box-shadow: 
            0 0 60px rgba(212, 175, 55, 0.6),
            0 0 100px rgba(139, 69, 19, 0.4),
            0 30px 80px rgba(0, 0, 0, 0.6);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .logo-display-glow {
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: radial-gradient(circle at center, 
            rgba(212, 175, 55, 0.3) 0%,
            rgba(139, 69, 19, 0.2) 40%,
            transparent 70%);
          border-radius: 30px;
          animation: logoGlowPulse 4s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }

        @keyframes logoGlowPulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        /* UPDATED About Section Styles */
        .about-section {
          background: linear-gradient(135deg, #f9f5f0 0%, #f2ebe3 100%);
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(128, 0, 32, 0.05) 0%, transparent 50%);
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .about-brand-logo {
          text-align: center;
          margin-bottom: 60px;
          padding-bottom: 40px;
          border-bottom: 2px solid rgba(139, 69, 19, 0.1);
        }

        .brand-title {
          font-size: 4rem;
          font-weight: 700; /* Reduced font weight */
          color: #8B4513;
          margin-bottom: 20px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-family: 'Georgia', serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .brand-title {
            font-size: 2.8rem;
            letter-spacing: 2px;
          }
        }

        .brand-badges {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .badge {
          padding: 8px 20px;
          border-radius: 25px;
          font-weight: 500; /* Reduced font weight */
          font-size: 0.9rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .badge-limited {
          background: linear-gradient(90deg, #800020, #B3002D);
          color: white;
          box-shadow: 0 3px 10px rgba(128, 0, 32, 0.3);
        }

        .badge-since {
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          color: #1a1a1a;
          box-shadow: 0 3px 10px rgba(212, 175, 55, 0.3);
        }

        .brand-tagline {
          font-size: 1.4rem;
          color: #666;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 400; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .brand-tagline {
            font-size: 1.1rem;
            letter-spacing: 1px;
          }
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 992px) {
          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .about-image-side {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }

        .about-wine-image {
          width: 100%;
          height: 500px;
          position: relative;
          transition: transform 0.5s ease;
        }

        .about-wine-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-wine-image:hover {
          transform: scale(1.03);
        }

        .wine-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.2), rgba(128, 0, 32, 0.2));
        }

        .about-text-side {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .about-mission {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border-left: 5px solid #8B4513;
        }

        .mission-title {
          font-size: 1.8rem;
          color: #8B4513;
          margin-bottom: 15px;
          font-family: 'Georgia', serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .mission-title {
            font-size: 1.5rem;
          }
        }

        .mission-description {
          color: #555;
          line-height: 1.7;
          font-size: 1.1rem;
          font-weight: normal; /* Reduced font weight */
        }

        .about-values {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .values-title {
          font-size: 1.8rem;
          color: #8B4513;
          margin-bottom: 25px;
          font-family: 'Georgia', serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-align: center;
          font-weight: 600; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .values-title {
            font-size: 1.5rem;
          }
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }

        .value-item {
          text-align: center;
          padding: 20px;
          background: rgba(139, 69, 19, 0.05);
          border-radius: 10px;
          transition: all 0.3s ease;
          border: 1px solid rgba(139, 69, 19, 0.1);
        }

        .value-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(139, 69, 19, 0.1);
          background: rgba(139, 69, 19, 0.08);
        }

        .value-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
          display: block;
        }

        .value-item h4 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 10px;
          font-weight: 500; /* Reduced font weight */
        }

        .value-item p {
          color: #666;
          font-size: 0.9rem;
          line-height: 1.5;
          font-weight: normal; /* Reduced font weight */
        }

        /* UPDATED Contact Section - Removed location icon and adjusted font weights */
        .contact-section {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(128, 0, 32, 0.1) 0%, transparent 50%);
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .contact-header .section-title {
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Georgia', serif;
          font-weight: 600; /* Reduced font weight */
          letter-spacing: 1.5px;
        }

        .contact-description {
          font-size: 1.2rem;
          color: #ddd;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 400; /* Reduced font weight */
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        @media (max-width: 992px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .contact-address {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .address-card {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        /* UPDATED: Company title - adjusted font weight */
        .company-title {
          font-size: 2.4rem;
          font-weight: 600; /* Reduced font weight */
          color: #FFD700;
          margin-bottom: 15px;
          font-family: 'Georgia', serif;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
          line-height: 1.3;
          text-align: center;
        }

        @media (max-width: 768px) {
          .company-title {
            font-size: 2rem;
            letter-spacing: 1.5px;
          }
        }

        @media (max-width: 480px) {
          .company-title {
            font-size: 1.7rem;
            letter-spacing: 1px;
          }
        }

        /* UPDATED: Address details - removed location icon and adjusted font weight */
        .address-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 1.2rem;
          line-height: 1.8;
          color: #fff;
          font-weight: 400; /* Reduced font weight */
          letter-spacing: 0.4px;
        }

        .address-line {
          margin: 0;
          padding: 5px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          padding-left: 0; /* Removed padding for icon */
        }

        /* REMOVED location icon */
        .address-line::before {
          display: none; /* Hide the location icon */
        }

        @media (max-width: 768px) {
          .address-details {
            font-size: 1.1rem;
            line-height: 1.7;
          }
        }

        @media (max-width: 480px) {
          .address-details {
            font-size: 1rem;
            line-height: 1.6;
          }
        }

        .contact-divider {
          height: 3px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          margin: 25px 0;
          border-radius: 2px;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 18px 22px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          transition: all 0.3s ease;
          font-weight: 400; /* Reduced font weight */
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateX(8px);
          border-color: #D4AF37;
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
        }

        .contact-icon {
          font-size: 1.8rem;
          color: #FFD700;
          font-weight: normal; /* Reduced font weight */
          min-width: 40px;
          text-align: center;
        }

        .contact-image-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.95);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          min-width: 50px;
        }

        .contact-image-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* UPDATED: Contact text - adjusted font weight */
        .contact-text {
          font-size: 1.2rem;
          color: #fff;
          font-weight: 400; /* Reduced font weight */
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .contact-text {
            font-size: 1.1rem;
          }
        }

        .contact-policies {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .policies-section {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 30px;
          border-left: 5px solid #D4AF37;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .policies-section:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        /* UPDATED: Policies title - adjusted font weight */
        .policies-title {
          font-size: 1.6rem;
          color: #FFD700;
          margin-bottom: 18px;
          font-family: 'Georgia', serif;
          font-weight: 600; /* Reduced font weight */
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .policies-title {
            font-size: 1.4rem;
          }
        }

        /* UPDATED: Policies description - adjusted font weight */
        .policies-description {
          color: #eee;
          line-height: 1.7;
          font-size: 1.1rem;
          font-weight: 400; /* Reduced font weight */
          letter-spacing: 0.3px;
        }

        @media (max-width: 768px) {
          .policies-description {
            font-size: 1rem;
          }
        }

        .age-warning {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 25px;
          background: rgba(128, 0, 32, 0.3);
          border-radius: 15px;
          border: 2px solid rgba(255, 107, 107, 0.4);
          margin-top: 15px;
          backdrop-filter: blur(10px);
        }

        .warning-icon {
          font-size: 2.5rem;
          color: #ff6b6b;
          min-width: 50px;
          text-align: center;
        }

        .warning-text {
          flex: 1;
        }

        /* UPDATED: Warning text - adjusted font weight */
        .warning-bold {
          display: block;
          color: #ff6b6b;
          font-size: 1.4rem;
          margin-bottom: 8px;
          font-family: 'Georgia', serif;
          font-weight: 600; /* Reduced font weight */
          letter-spacing: 1px;
          text-shadow: 0 2px 5px rgba(255, 107, 107, 0.3);
        }

        .warning-message {
          color: #ffd1d1;
          font-size: 1rem;
          margin: 0;
          font-weight: 400; /* Reduced font weight */
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .warning-bold {
            font-size: 1.2rem;
          }
          
          .warning-message {
            font-size: 0.95rem;
          }
        }

        /* Footer */
        .footer {
          background-color: #1a1a1a;
          color: #fff;
          padding: 60px 20px 30px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 40px;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
          }
        }

        .footer-logo h2 {
          font-size: 2rem;
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
          font-family: 'Georgia', serif;
          font-weight: 600; /* Reduced font weight */
        }

        .footer-tagline {
          color: #aaa;
          font-size: 0.9rem;
          font-weight: normal; /* Reduced font weight */
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .footer-links a {
          color: #ccc;
          transition: color 0.3s ease;
          font-weight: normal; /* Reduced font weight */
        }

        .footer-links a:hover {
          color: #D4AF37;
        }

        .footer-social {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: linear-gradient(135deg, #8B4513, #D2691E);
          transform: translateY(-5px);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          color: #aaa;
          font-size: 0.9rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          font-weight: normal; /* Reduced font weight */
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            gap: 10px;
          }
        }

        .footer-note {
          color: #D4AF37;
          font-weight: normal; /* Reduced font weight */
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-left {
          animation: slideLeft 0.8s ease-out;
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-right {
          animation: slideRight 0.8s ease-out;
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-card {
          animation: cardAppear 0.5s ease-out forwards;
          opacity: 0;
        }

        @keyframes cardAppear {
          to {
            opacity: 1;
          }
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </>
  );
}
