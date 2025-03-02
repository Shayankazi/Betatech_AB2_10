import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md bg-opacity-80 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/src/assets/pii_logo.jpg" 
              alt="PII Detection Logo" 
              className="h-10 w-auto mr-3 transition-transform duration-300 hover:scale-110"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
              PII Detection
            </span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-500 font-medium transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-md hover:-translate-y-1">
              Login
            </button>
            <button onClick={() => navigate('/signup')} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-md shadow-indigo-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
