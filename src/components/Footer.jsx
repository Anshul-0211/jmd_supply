import React from 'react';

const Footer = () => (
  <footer className="bg-gray-800 text-gray-400 py-8 px-6">
    <div className="container mx-auto text-center md:flex md:justify-between items-center">
      <p className="text-sm mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} YourLogo Logistics. All rights reserved.
      </p>
      {/* Optional: Add social media links */}
      <div className="flex justify-center space-x-4">
        {/* Replace with actual links and icons */}
        <a href="#" className="hover:text-white transition duration-300">Facebook</a>
        <a href="#" className="hover:text-white transition duration-300">LinkedIn</a>
        <a href="#" className="hover:text-white transition duration-300">Twitter</a>
      </div>
    </div>
  </footer>
);

export default Footer; 