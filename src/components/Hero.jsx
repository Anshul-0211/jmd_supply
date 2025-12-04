import React, { useState, useEffect } from 'react';
import AnimatedButton from './AnimatedButton';
import hero1 from '../images/hero1.png';
import logo1 from '../assets/logo1.png';
import hero2 from '../images/hero2.png';
import hero3 from '../images/hero32.png';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const slides = [
    {
      image: hero1,
      heading: 'Pan-India Road Connectivity....',
      paragraph: 'From the southernmost highways to the northern frontiers, we span the entire nation with a robust road-network designed to deliver your cargo safely and on time — wherever your destination lies.',
      buttonText: 'Request Quote'
    },
    {
      image: hero2,
      heading: 'Reliable Logistics Across India....',
      paragraph: 'With an expansive delivery network across every state, our fleet and logistics infrastructure ensure seamless freight movement — bridging cities, towns and remote locations with consistency you can trust.',
      buttonText: 'Contact Us'
    },
    {
      image: hero3,
      heading: 'Cold Chain Services Across India....',
      paragraph: 'Be it small parcels or heavy consignments, we navigate the country’s highways and by-lanes to bring your goods home. Trust us for punctuality, safety and end-to-end logistics covering every corner of India.',
      buttonText: 'Schedule a Call'
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 600);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    const heading = slides[currentSlide].heading;
    let index = 0;

    const typeTimer = setInterval(() => {
      if (index < heading.length) {
        setDisplayedText(heading.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeTimer);
      }
    }, 50); // Typing speed

    return () => clearInterval(typeTimer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleDotClick = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="min-h-[600px] md:min-h-screen md:h-screen flex flex-col md:flex-row">
        {/* Left Side - Image Carousel (Hidden on mobile/tablet) */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-white min-h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="relative w-full h-150 flex items-center justify-center">
                <img
                  src={slide.image}
                  alt={slide.heading}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Text Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-0 min-h-[600px]">
          <div className="max-w-xl w-full">
            {/* Company Logo/Name */}
            <div className="mb-6 md:mb-8">
              <img src={logo1} alt="Company Logo" className='w-48 sm:w-60 h-auto' />
            </div>

            {/* Animated Content */}
            <div
              className={`transition-opacity duration-500 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {/* Heading with Typewriter Effect */}
              <h1 className="italic text-2xl sm:text-3xl text-sky-600 md:text-4xl lg:text-5xl font-bold mb-0 min-h-[100px] sm:min-h-[120px] md:min-h-[140px]">
                {displayedText}
                <span className={`inline-block w-0.5 h-6 sm:h-8 md:h-10 bg-blue-600 ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
              </h1>

              {/* Paragraph */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                {slides[currentSlide].paragraph}
              </p>

              {/* CTA Button */}
              <AnimatedButton 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector('#contact');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg shadow-lg w-full sm:w-auto text-center"
              >
                {slides[currentSlide].buttonText}
              </AnimatedButton>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center md:justify-start gap-3 mt-8 md:mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide
                      ? 'w-12 h-3 bg-blue-600'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 