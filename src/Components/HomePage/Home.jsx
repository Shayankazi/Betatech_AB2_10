import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import Header from "/src/Components/HeaderPage/Header";
import Footer from "/src/Components/FooterPage/Footer";

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate(); 
  
  // Handle scroll event for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Add overflow hidden to body to prevent horizontal scrolling
    document.body.style.overflowX = 'hidden';
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up the style when component unmounts
      document.body.style.overflowX = '';
    };
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
  
  // New animation variants
  const pulse = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  const float = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section 
        className="relative py-24 bg-gradient-to-br from-slate-50 to-slate-100 w-full"
        style={{ backgroundPosition: `0 ${scrollY * 0.1}px` }}
      >
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <motion.div 
            className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500/30 to-emerald-500/30 blur-3xl -top-20 -left-20"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl top-40 right-20"
            animate={{
              x: [0, -30, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
          <motion.div 
            className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-emerald-500/30 to-indigo-500/30 blur-3xl bottom-10 left-40"
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          ></motion.div>
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
            <motion.button 
              onClick={() => navigate('/login')}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 overflow-hidden relative after:absolute after:w-full after:h-full after:top-0 after:left-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-all after:duration-500 hover:after:left-[100%]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial="initial"
              animate="animate"
              variants={pulse}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="px-6 py-3 rounded-lg border border-indigo-500 text-indigo-500 font-medium transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:-translate-y-1 overflow-hidden relative after:absolute after:w-full after:h-full after:top-0 after:left-[-100%] after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:transition-all after:duration-500 hover:after:left-[100%]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white h-32 -top-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-800 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mx-auto after:mt-4 after:rounded-full"
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
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              <motion.div 
                className="text-5xl mb-6 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent"
                initial="initial"
                animate="animate"
                variants={float}
              >🔍</motion.div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Advanced AI Detection</h3>
              <p className="text-slate-600">Our AI engine scans documents for names, addresses, phone numbers, and other sensitive information with high accuracy.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
              variants={fadeIn}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              <motion.div 
                className="text-5xl mb-6 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent"
                initial="initial"
                animate="animate"
                variants={float}
              >🛡️</motion.div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Privacy Protection</h3>
              <p className="text-slate-600">Identify and protect sensitive data across all your documents and communications with our state-of-the-art technology.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
              variants={fadeInRight}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
              <motion.div 
                className="text-5xl mb-6 bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent"
                initial="initial"
                animate="animate"
                variants={float}
              >⚡</motion.div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">Instant Results</h3>
              <p className="text-slate-600">Get immediate feedback on what personal information your files contain and potential privacy risks.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section 
        className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative w-full"
        style={{ backgroundPosition: `0 ${scrollY * -0.05}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-800 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mx-auto after:mt-4 after:rounded-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            How It Works
          </motion.h2>
          
          <div className="relative">
            <motion.div 
              className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 hidden md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
            ></motion.div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
              <motion.div 
                className="text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeIn}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >1</motion.div>
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
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >2</motion.div>
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
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >3</motion.div>
                <h3 className="text-xl font-bold mb-4 text-slate-800">Review Results</h3>
                <p className="text-slate-600">Get a detailed report of all PII detected in your file with privacy recommendations.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;