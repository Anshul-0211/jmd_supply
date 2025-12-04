import React from 'react';
import { TruckIcon, WarehouseIcon, GPSTrackingIcon, RefrigeratedTruckIcon } from './Icons';
import AnimatedSection from './AnimatedSection';

const Services = () => {
  const services = [
    {
      icon: <TruckIcon />,
      title: 'Full truck Load',
      description: 'JMD is fully equipped to handle your bulk/FTL movement from anywhere.',
    },
    {
      icon: <WarehouseIcon />,
      title: 'Warehousing & Storage',
      description: 'We provide Warehousing & Storage services for your goods.',
    },
    {
      icon: <GPSTrackingIcon />,
      title: 'Real-Time Satellite Tracking',
      description: 'We provide Real-Time GPS Tracking for your goods.',
    },
    {
      icon: <RefrigeratedTruckIcon />,
      title: 'Expert in Refrigerated Transport',
      description: 'We provide services for temperature-controlled goods.',
    },
    
  ];

  return (
    <section id="services" className="py-1 md:py-12 bg-gray-50 px-6">
      <div className="container mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Product and Services
          </h2>
          <div className="w-96 h-1 bg-indigo-600 mx-auto mt-2 mb-12"></div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
          {services.map((service, index) => (
            <AnimatedSection 
              key={index} 
              delay={0.1 * index} 
              duration={0.5}
              threshold={0.05}
            >
              <div
                className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center shadow-[0_4px_10px_-3px_rgba(0,0,0,0.3)]"
              >
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4 inline-block">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 