import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll event for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="overflow-x-hidden w-full min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-md bg-opacity-80 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="PII Detection Logo" 
                className="h-10 w-auto mr-3 transition-transform duration-300 hover:scale-110"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-indigo-600 bg-clip-text text-transparent">
                PII Detection
              </span>
            </div>
            <div className="flex gap-4">
              <button className="px-4 py-2 rounded-lg border border-indigo-500 text-indigo-500 font-medium transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-md hover:-translate-y-1 overflow-hidden relative after:absolute after:w-full after:h-full after:top-0 after:left-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-all after:duration-500 hover:after:left-[100%]">
                Login
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-md shadow-indigo-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 overflow-hidden relative after:absolute after:w-full after:h-full after:top-0 after:left-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-all after:duration-500 hover:after:left-[100%]">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 w-full"
        style={{ backgroundPosition: `0 ${scrollY * 0.1}px` }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500/30 to-emerald-500/30 blur-3xl -top-20 -left-20 animate-blob"></div>
          <div className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl top-40 right-20 animate-blob animation-delay-2000"></div>
          <div className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500/30 to-indigo-500/30 blur-3xl bottom-10 left-40 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 bg-clip-text text-transparent"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            AI-Powered Personal Information Detection
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-slate-700"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Protect your privacy with our advanced AI technology that identifies personally identifiable information (PII) in your documents and data.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 overflow-hidden relative after:absolute after:w-full after:h-full after:top-0 after:left-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-all after:duration-500 hover:after:left-[100%]">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-lg border border-indigo-500 text-indigo-500 font-medium transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:-translate-y-1 overflow-hidden relative after:absolute after:w-full after:h-full after:top-0 after:left-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-all after:duration-500 hover:after:left-[100%]">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white h-32 -top-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-800 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mx-auto after:mt-4 after:rounded-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            Protect Your Personal Information
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerCards}
          >
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
              variants={fadeInLeft}
            >
              <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              <div className="text-5xl mb-6 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">🔍</div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Advanced AI Detection</h3>
              <p className="text-slate-600">Our AI engine scans documents for names, addresses, phone numbers, and other sensitive information with high accuracy.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
              variants={fadeIn}
            >
              <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              <div className="text-5xl mb-6 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">🛡️</div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Privacy Protection</h3>
              <p className="text-slate-600">Identify and protect sensitive data across all your documents and communications with our state-of-the-art technology.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
              variants={fadeInRight}
            >
              <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              <div className="text-5xl mb-6 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">⚡</div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Instant Results</h3>
              <p className="text-slate-600">Get immediate feedback on what personal information your files contain and potential privacy risks.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section 
        className="py-32 bg-gradient-to-br from-slate-50 to-slate-100 relative w-full"
        style={{ backgroundPosition: `0 ${scrollY * -0.05}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-800 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mx-auto after:mt-4 after:rounded-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            How It Works
          </motion.h2>
          
          <div className="relative">
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 hidden md:block"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <motion.div 
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
                transition={{ delay: 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20 transition-transform duration-300 hover:scale-110">1</div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Select Your File</h3>
                <p className="text-slate-600">Choose the documents you want to analyze from our secure dashboard.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20 transition-transform duration-300 hover:scale-110">2</div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">AI Analysis</h3>
                <p className="text-slate-600">Our advanced AI scans the content to identify any personal information.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
                transition={{ delay: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20 transition-transform duration-300 hover:scale-110">3</div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Review Results</h3>
                <p className="text-slate-600">Get a detailed report of all PII detected in your file with privacy recommendations.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-6 relative w-full">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold mb-6 text-emerald-400 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mt-3 after:rounded-full">PII Detection</h3>
              <p className="text-slate-400">Protecting your personal information with advanced AI technology.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-emerald-400 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mt-3 after:rounded-full">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Home</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-emerald-400 relative after:content-[''] after:block after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mt-3 after:rounded-full">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 relative inline-block after:absolute after:left-0 after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-6 border-t border-slate-800 text-slate-500">
            <p>&copy; {new Date().getFullYear()} PII Detection. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;