import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [hoveredLink, setHoveredLink] = useState(null);
  
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-800 pt-20 pb-6 relative w-full shadow-lg">
      {/* Animated gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 animate-gradient-x"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Logo and Description Section */}
          <div className="transform transition duration-300 hover:translate-y-1">
            <h3 className="text-xl font-bold mb-6 text-blue-600">PII Detection</h3>
            <p className="text-gray-600">Protecting your personal information with advanced AI technology.</p>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-600">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={index} 
                    className="transform transition duration-200 ease-in-out"
                    style={{ 
                      transform: hoveredLink === index ? 'translateX(8px)' : 'translateX(0)' 
                    }}>
                  <a onClick={() => navigate(link.path)} 
                     onMouseEnter={() => setHoveredLink(index)}
                     onMouseLeave={() => setHoveredLink(null)}
                     className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                    <span className="opacity-0 transition-opacity duration-200 mr-1"
                          style={{ opacity: hoveredLink === index ? 1 : 0 }}>
                      →
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-600">Support</h3>
            <ul className="space-y-3">
              {[
                { label: 'Help Center' },
                { label: 'Privacy Policy' },
                { label: 'Terms of Service' }
              ].map((link, index) => (
                <li key={index + 3} 
                    className="transform transition duration-200 ease-in-out"
                    style={{ 
                      transform: hoveredLink === index + 3 ? 'translateX(8px)' : 'translateX(0)' 
                    }}>
                  <a href="#" 
                     onMouseEnter={() => setHoveredLink(index + 3)}
                     onMouseLeave={() => setHoveredLink(null)}
                     className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center">
                    <span className="opacity-0 transition-opacity duration-200 mr-1"
                          style={{ opacity: hoveredLink === index + 3 ? 1 : 0 }}>
                      →
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="text-center pt-6 border-t border-gray-200 text-gray-500">
          <p className="transition-opacity duration-700 hover:opacity-80">
            &copy; {year} PII Detection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Add this to your global CSS or tailwind.config.js for the gradient animation
// @keyframes gradient-x {
//   0%, 100% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
// }
// .animate-gradient-x {
//   background-size: 200% 200%;
//   animation: gradient-x 15s ease infinite;
// }

export default Footer;