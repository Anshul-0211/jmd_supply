import React from 'react';
import AnimatedSection from './AnimatedSection';

import vbl_logo from '../assets/vbl_logo.png';
import nandosLogo from '../assets/nandos-logo.svg';
import devyaniLogo from '../assets/devyani_logo.png';
import gyanLogo from '../assets/gyan.svg';
import shine from '../assets/shine.png';
import prestige from '../assets/prestige-logo.jpg';
import novatech from '../assets/novatech-logo.png';


const OurClients = () => {
  
  const logoImages = [
    { src: vbl_logo, alt: "vbl" },
    { src: nandosLogo, alt: "Nandos" },
    { src: devyaniLogo, alt: "Devyani" },
    { src: gyanLogo, alt: "Gyan" },
    { src: shine, alt: "Shine" },
    { src: prestige, alt: "Safyeast" },
    { src: novatech, alt: "Novatech" }
  ];

  const logos = logoImages.map((logo, index) => (
    <div
      key={index}
      className="flex-shrink-0 mx-5 transition-all duration-300"
    >
      <div className="w-72 h-36 bg-white rounded-lg flex items-center justify-center">
        <img 
          src={logo.src} 
          alt={logo.alt} 
          className="max-w-[80%] max-h-[80%] object-contain" 
        />
      </div>
    </div>
  ));

  return (
    <section id="clients" className="bg-gray-50 w-full pt-8 pb-12">
      <div className="container mx-auto px-4 overflow-hidden">
        <AnimatedSection className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Our Major Clients</h2>
          <div className="w-68 h-1 bg-indigo-600 mx-auto mt-2"></div>
        </AnimatedSection>

        {/* Logo Carousel */}
        <AnimatedSection delay={0.1}>
          <div className="relative overflow-hidden py-1 bg-white rounded-lg shadow-inner max-w-full">
            <div className="flex animate-marquee">
              {logos}
              {logos}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OurClients; 