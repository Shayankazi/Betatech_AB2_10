import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-6 relative w-full">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-6 text-emerald-400">PII Detection</h3>
            <p className="text-slate-400">Protecting your personal information with advanced AI technology.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-emerald-400">Quick Links</h3>
            <ul className="space-y-3">
              <li><a onClick={() => navigate('/')} className="cursor-pointer text-slate-400 hover:text-white">Home</a></li>
              <li><a onClick={() => navigate('/about')} className="cursor-pointer text-slate-400 hover:text-white">About</a></li>
              <li><a onClick={() => navigate('/contact')} className="cursor-pointer text-slate-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 text-emerald-400">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-slate-800 text-slate-500">
          <p>&copy; {new Date().getFullYear()} PII Detection. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
