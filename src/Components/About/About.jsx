import React from "react";
import { FaLinkedin, FaEnvelope, FaPhone, FaGithub } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Header from "/src/Components/HeaderPage/Header";
import Footer from "/src/Components/FooterPage/Footer";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Vansh Talyani",
    role: "IT Engineer, PICT",
    linkedin: "www.linkedin.com/in/vanshtalyani",
    email: "vanshtalyani12@gmail.com",
    contact: "8468829368",
    github: "https://github.com/VANSHTalyani",
    image: "./src/assets/trishit.jpeg",
  },
  {
    name: "Tanishq Choudhary",
    role: "IT Engineer, PICT",
    linkedin: "https://www.linkedin.com/in/tanishq-choudhary-tc/",
    email: "tanishqchoudhary5689@gmail.com",
    contact: "8010125342",
    github: " https://github.com/Tanishq4501",
    image: "./src/assets/trishit.jpeg",
  },
  {
    name: "Shayan Kazi",
    role: "IT Engineer, PICT",
    linkedin: "https://www.linkedin.com/in/shayan-kazi-9685612a7",
    email: "shayankazi147@gmail.com",
    contact: "9420200037",
    github: "https://github.com",
    image: "./src/assets/trishit.jpeg",
  },
  {
    name: "Trishit Guin",
    role: "IT Engineer, PICT",
    linkedin: "www.linkedin.com/in/trishit-guin",
    email: "trishitguin2005@gmail.com",
    contact: "9340918137",
    github: "https://github.com/trishit-guin",
    image: "./src/assets/trishit.jpeg",
  },
];

const About = () => {
  const navigate = useNavigate();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
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

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        {/* About Section */}
        <section className="relative py-20 bg-gradient-to-br from-slate-50 to-slate-100 w-full">
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
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                About <span>PII Detection</span>
              </h1>
              
              <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full mb-8"></div>
              
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-slate-700">
                PII Detection is an advanced AI-powered platform designed to detect personally identifiable information (PII) in documents. 
                Our system analyzes uploaded files for sensitive data, providing risk assessments and helping users protect their 
                privacy and comply with data protection regulations.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              initial="hidden"
              animate="visible"
              variants={staggerCards}
            >
              <motion.div 
                className="p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
                variants={fadeInLeft}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">AI-Powered Detection</h3>
                <p className="text-slate-600">
                  Our advanced AI algorithms scan documents to identify personal information such as names, addresses, phone numbers, and financial details.
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
                variants={fadeIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">Risk Assessment</h3>
                <p className="text-slate-600">
                  Get detailed risk percentage analysis and recommendations on document safety based on the sensitive information detected.
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group"
                variants={fadeInLeft}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="absolute h-1 left-0 right-0 top-0 bg-gradient-to-r from-indigo-500 to-emerald-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">Privacy Protection</h3>
                <p className="text-slate-600">
                  Receive guidance on how to safeguard sensitive information and comply with data protection regulations like GDPR and CCPA.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 relative after:content-[''] after:block after:w-20 after:h-1 after:bg-gradient-to-r after:from-indigo-500 after:to-emerald-500 after:mx-auto after:mt-4 after:rounded-full">
                Meet Our Team
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-slate-600">
                We're a passionate team of IT engineers from PICT working to revolutionize document privacy and security through AI.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerCards}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-xl bg-white shadow-lg group"
                  variants={fadeIn}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Animated gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Content container with small offset from border */}
                  <div className="relative m-[2px] bg-white rounded-lg p-6 h-full flex flex-col items-center">
                    {/* Profile Picture with hover effects */}
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 blur-lg transition-all duration-300"></div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover relative z-10 filter group-hover:grayscale-0 grayscale transition-all duration-500"
                      />
                    </div>
                    
                    {/* Member details */}
                    <h3 className="text-xl font-bold mb-1 bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">{member.name}</h3>
                    <p className="text-sm mb-4 text-slate-600">{member.role}</p>
                    
                    {/* Social links */}
                    <div className="flex space-x-4 mt-auto">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-indigo-600 transform hover:scale-125 transition-all duration-300"
                      >
                        <FaLinkedin size={22} />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-slate-500 hover:text-indigo-500 transform hover:scale-125 transition-all duration-300"
                      >
                        <FaEnvelope size={22} />
                      </a>
                      <a
                        href={`tel:${member.contact}`}
                        className="text-slate-500 hover:text-emerald-500 transform hover:scale-125 transition-all duration-300"
                      >
                        <FaPhone size={22} />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-indigo-600 transform hover:scale-125 transition-all duration-300"
                      >
                        <FaGithub size={22} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;