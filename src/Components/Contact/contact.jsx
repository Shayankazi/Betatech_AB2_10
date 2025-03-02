import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaGlobe, 
  FaPhone, 
  FaQuestionCircle, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaArrowRight,
  FaPaperPlane,
  FaCheck,
  FaShieldAlt,
  FaUserSecret,
  FaFileAlt
} from "react-icons/fa";
import Header from "/src/Components/HeaderPage/Header";
import Footer from "/src/Components/FooterPage/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [scrollY, setScrollY] = useState(0);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 3000);
    }, 1000);
  };

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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
            Get in Touch
          </motion.h1>
          
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full mb-8"></div>
          
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-slate-700"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
          >
            Have questions about PII Shield or need assistance with personal information detection? We're here to help! Choose how you'd like to connect with us.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods Tabs */}
      <section className="py-12 bg-white relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white h-32 -top-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-5xl mx-auto mb-10 px-4"
          >
            <div className="flex flex-wrap justify-center gap-2 mb-8 text-gray-700">
              <button 
                onClick={() => setActiveTab("general")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "general" 
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg" 
                    : "bg-white hover:bg-gray-100 border border-slate-200"
                }`}
              >
                General Inquiries
              </button>
              <button 
                onClick={() => setActiveTab("support")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "support" 
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg" 
                    : "bg-white hover:bg-gray-100 border border-slate-200"
                }`}
              >
                Support
              </button>
              <button 
                onClick={() => setActiveTab("business")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "business" 
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg" 
                    : "bg-white hover:bg-gray-100 border border-slate-200"
                }`}
              >
                Business & Partnerships
              </button>
              <button 
                onClick={() => setActiveTab("privacy")}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === "privacy" 
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg" 
                    : "bg-white hover:bg-gray-100 border border-slate-200"
                }`}
              >
                Privacy Consultation
              </button>
            </div>
          </motion.div>

          {/* Two Column Layout - Contact Info + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Contact Cards */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-2 space-y-6"
            >
              {/* Support Card */}
              <motion.div 
                variants={fadeInLeft}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <FaEnvelope className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Email Us</h3>
                      <p className="text-sm text-slate-500">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="space-y-2 pl-16">
                    <a href="mailto:support@piishield.ai" className="block text-indigo-600 hover:text-indigo-700 transition-colors">
                      support@piishield.ai
                    </a>
                    <a href="mailto:privacy@piishield.ai" className="block text-indigo-600 hover:text-indigo-700 transition-colors">
                      privacy@piishield.ai
                    </a>
                    <a href="mailto:enterprise@piishield.ai" className="block text-indigo-600 hover:text-indigo-700 transition-colors">
                      enterprise@piishield.ai
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div 
                variants={fadeInLeft}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <FaPhone className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Call Us</h3>
                      <p className="text-sm text-slate-500">Available Mon-Fri, 9am-6pm IST</p>
                    </div>
                  </div>
                  <div className="space-y-2 pl-16">
                    <p className="text-slate-700">📞 +91 8822 456 789 (Support)</p>
                    <p className="text-slate-700">📞 +91 8822 567 890 (Privacy Team)</p>
                    <p className="text-slate-700">📞 +91 8822 678 901 (Enterprise)</p>
                  </div>
                </div>
              </motion.div>

              {/* Office Location Card */}
              <motion.div 
                variants={fadeInLeft}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <FaMapMarkerAlt className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Visit Us</h3>
                      <p className="text-sm text-slate-500">Our headquarters</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <p className="text-slate-700">PII Shield Pvt. Ltd.</p>
                    <p className="text-slate-700">Tower 2, Connaught Place,</p>
                    <p className="text-slate-700">New Delhi, India - 110001</p>
                    <a href="https://maps.app.goo.gl/cSYUaMthxGVi18zt5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-2 text-indigo-600 hover:text-indigo-700">
                      View on Maps <FaArrowRight className="ml-1 text-xs" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Social Media Card */}
              <motion.div 
                variants={fadeInLeft}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                      <FaGlobe className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Connect Online</h3>
                      <p className="text-sm text-slate-500">Follow us on social media</p>
                    </div>
                  </div>
                  <div className="flex justify-around mt-4">
                    <a href="https://linkedin.com/company/piishield" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all">
                      <FaLinkedin size={28} className="text-blue-600" />
                    </a>
                    <a href="https://twitter.com/piishield" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all">
                      <FaTwitter size={28} className="text-blue-500" />
                    </a>
                    <a href="https://facebook.com/piishield" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all">
                      <FaFacebook size={28} className="text-blue-700" />
                    </a>
                    <a href="https://instagram.com/piishield" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition-all">
                      <FaInstagram size={28} className="text-pink-600" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden border border-slate-100">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400 to-emerald-500 rounded-full filter blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-emerald-400 to-indigo-500 rounded-full filter blur-3xl opacity-20 -ml-20 -mb-20"></div>
                
                <div className="relative z-10">
                  <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl font-bold mb-6 text-slate-800"
                  >
                    <span className="bg-gradient-to-r from-indigo-500 to-emerald-500 bg-clip-text text-transparent">Send Us a Message</span>
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 text-slate-600"
                  >
                    Fill out the form below and our privacy experts will get back to you as soon as possible.
                  </motion.p>

                  {formSubmitted ? (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="text-center py-12 text-slate-800"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheck className="text-green-600 text-2xl" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-slate-600">
                        Thank you for reaching out. Our privacy experts will respond to your inquiry shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <motion.div variants={fadeIn}>
                          <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded-lg border bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-colors"
                            placeholder="John Doe"
                          />
                        </motion.div>
                        <motion.div variants={fadeIn}>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-700">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 rounded-lg border bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-colors"
                            placeholder="john@example.com"
                          />
                        </motion.div>
                      </div>
                      <motion.div variants={fadeIn}>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-slate-700">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 rounded-lg border bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-colors"
                          placeholder="PII Detection Question"
                        />
                      </motion.div>
                      <motion.div variants={fadeIn}>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-slate-700">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows="6"
                          className="w-full p-3 rounded-lg border bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-colors resize-none"
                          placeholder="Tell us how we can assist you with personal information detection..."
                        ></textarea>
                      </motion.div>
                      <motion.div 
                        variants={fadeIn}
                        className="pt-2"
                      >
                        <motion.button
                          type="submit"
                          className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial="initial"
                          animate="animate"
                          variants={pulse}
                        >
                          <FaPaperPlane />
                          Send Message
                        </motion.button>
                      </motion.div>
                    </motion.form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-800 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mx-auto after:mt-4 after:rounded-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <motion.div 
              variants={fadeIn} 
              className="p-6 rounded-xl bg-white shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                What is PII Shield?
              </h3>
              <p className="text-slate-600">
                PII Shield is an AI-powered platform that analyzes documents to detect personal identifiable information (PII), providing risk assessment scores and recommendations for safe document usage.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn} 
              className="p-6 rounded-xl bg-white shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                How accurate is your PII detection?
              </h3>
              <p className="text-slate-600">
                Our AI uses advanced machine learning algorithms to achieve over 98% accuracy in identifying various types of personal information across multiple document formats.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn} 
              className="p-6 rounded-xl bg-white shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                Is my data secure when using PII Shield?
              </h3>
              <p className="text-slate-600">
                Yes, PII Shield processes all documents locally on your device or in encrypted cloud storage. We never store the actual content of your documents on our servers.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn} 
              className="p-6 rounded-xl bg-white shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-3 text-slate-800">
                What file formats does PII Shield support?
              </h3>
              <p className="text-slate-600">
                PII Shield supports a wide range of formats including PDF, DOC/DOCX, XLS/XLSX, TXT, CSV, HTML, and most common image formats containing text (through OCR).
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <motion.a 
              href="/faqs" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-indigo-600 hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              View All FAQs <FaArrowRight className="ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Privacy Quote Section */}
      <section className="py-16 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="max-w-4xl mx-auto px-8 py-10 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl shadow-xl text-white text-center"
        >
          <FaUserSecret className="text-4xl mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-4">Protecting Personal Information Is Our Priority</h2>
          <p className="text-lg max-w-3xl mx-auto">
            In today's digital world, safeguarding sensitive information is more important than ever. 
            PII Shield empowers you to identify and manage personal data risks effectively.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;