import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-gray-400 py-8 px-6">
    <div className="container mx-auto text-center md:flex md:justify-between items-center">
      <p className="text-sm mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} JMD Supply Chain Solutions. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer; 