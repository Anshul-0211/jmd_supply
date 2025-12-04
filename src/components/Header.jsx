import React, { useState, useEffect } from 'react';
// Using your original imports for Icons and logo
import { MenuIcon, XIcon } from './Icons';
import logo from '../assets/bg_logo.png';

// --- Header Component ---
const Header = () => {
  // State to manage the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Get all section elements
      const sections = [
        { id: 'hero', name: 'home' },
        { id: 'services', name: 'services' },
        { id: 'clients', name: 'clients' },
        { id: 'about', name: 'about us' },
        { id: 'contact', name: 'contact' }
      ];

      // Get current scroll position with some offset for better UX
      const scrollPosition = window.scrollY + 150; // Adding offset to trigger section change earlier

      // Find the current section
      let currentSection = 'home';
      sections.forEach(section => {
        const element = section.id === 'hero' ? document.querySelector('main') : document.querySelector(`#${section.id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = element.offsetTop;
          if (scrollPosition >= offset) {
            currentSection = section.name;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Navigation links data
  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Clients', href: '#clients' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  // Function to handle smooth scrolling when a nav link is clicked
  const handleNavClick = (e, href) => {
    e.preventDefault(); // Prevent default anchor link behavior
    setIsMenuOpen(false); // Close mobile menu if open

    // Special handling for the 'Home' link to scroll to the top
    if (href === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return; // Exit the function
    }

    // Find the target element using the href (which should be a CSS selector like '#services')
    const element = document.querySelector(href);
    if (element) {
      // Calculate the offset position to account for the fixed header
      const headerOffset = 80; // Adjust this value based on your actual fixed header height
      const elementPosition = element.getBoundingClientRect().top; // Position relative to viewport
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Calculate final scroll position

      // Scroll smoothly to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Render the Header component
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full overflow-x-hidden">
      {/* Contact Information Bar */}
      <div className="bg-[#27548A] py-1 px-4">
        <div className="container mx-auto flex justify-end items-center space-x-4 text-xs ">
          {/* Phone number link */}
          <a
            href="tel:+918318241510"
            // Updated classes: text-white, added hover:italic
            className="flex text-white items-center hover:font-bold transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +91 8318241510 , +91 9972491073
          </a>
          {/* Email link */}
          <a
            href="mailto:jmdsupplychainsolutions@gmail.com"
            // Updated classes: text-white (already present), added hover:italic
            className="flex text-white items-center hover:font-bold transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            jmdsupplychainsolutions@gmail.com
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-6 pb-2 pt-1 flex justify-between items-center bg-white max-w-full">
        {/* Logo - Using the imported logo */}
        <a href="/" className="text-xl font-bold text-gray-800" onClick={(e) => handleNavClick(e, '#')}>
          <img src={logo} alt="Company Logo" className='w-35 h-15' />
        </a>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-gray-800 hover:text-blue-600 transition duration-300 relative group px-4 py-2`}
              >
                <span className={`relative z-10 text-gray-800 text-xl transition-all duration-300 ${
                  isActive ? 'font-bold' : 'font-normal'
                }`}>
                  {link.name}
                </span>
                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            );
          })}
        </div>

        {/* Quote Button (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-medium"
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Menu Button - Using imported icons */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
            {/* Toggle between imported Menu and Close icons */}
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) - Appears when isMenuOpen is true */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-6 absolute top-full left-0 right-0 shadow-lg w-full">
          {/* Mobile navigation links */}
          {navLinks.map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block py-2 text-gray-800 hover:text-blue-600 transition duration-300 relative group`}
              >
                <span className={`transition-all duration-300 ${
                  isActive ? 'font-bold' : 'font-normal'
                }`}>
                  {link.name}
                </span>
                {/* Underline effect - always visible when active, on hover otherwise */}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            );
          })}
          {/* Mobile Quote Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="block mt-2 bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-medium"
          >
            Get a Quote.
          </a>
        </div>
      )}
    </header>
  );
};

// Export the component for use in other parts of the application
export default Header;
