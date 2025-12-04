import React from 'react';
import AnimatedSection from './AnimatedSection';
import AnimatedButton from './AnimatedButton';
import about_us from '../assets/about_us.jpg';

const About = () => (
  <section id="about" className="py-16 md:py-24 bg-white px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
      <AnimatedSection className="md:w-1/2" delay={0.2}>
        {/* Placeholder for an image */}
        <img
          src={about_us}
          alt="About YourLogistics Company"
          className="rounded-lg shadow-md w-full"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Error'; }}
        />
      </AnimatedSection>
      <AnimatedSection className="md:w-1/2 text-center md:text-left" delay={0.4}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          About Us
          <div className="w-35 h-1 bg-indigo-600 mx-auto md:mx-0 mt-2 mb-4"></div>
        </h2>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          At JMD Supply Chain Solutions, we're redefining logistics with reliability, precision, and innovation. Specializing in  <span className='font-bold'>Full Truck Load (FTL),</span>   <span className='font-bold'>Part Truck Load (PTL),</span> and <span className='font-bold'>Over Dimensional Load (ODL)</span> services, we ensure your cargo—no matter the size or sensitivity—reaches its destination on time and in perfect condition.        </p>
        <p className="text-gray-600 mb-6 leading-relaxed">
          With a strong focus on <span className='font-bold font-medium'>refrigerated logistics</span> , we are trusted partners for transporting temperature-sensitive items like food, dairy products, and perishable goods. Our fleet is equipped with advanced cold-chain systems, maintaining optimal freshness throughout the journey.

          What sets us apart? Real-time GPS tracking across our entire fleet, giving our clients complete visibility and peace of mind. Whether you're shipping across cities or states, we bring you end-to-end transparency, accountability, and control.

          At JMD, logistics isn't just about moving goods—it's about delivering trust.        </p>
        <AnimatedButton 
          variant="primary" 
          onClick={() => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Learn More
        </AnimatedButton>
      </AnimatedSection>
    </div>
  </section>
);

export default About; 