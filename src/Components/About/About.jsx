import React from "react";
import { FaLinkedin, FaEnvelope, FaPhone, FaGithub } from "react-icons/fa";

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
  return (
    <div className="bg-gradient-to-br from-red-50 to-gray-100 p-8 min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-80 backdrop-blur-md shadow-md px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <img src="./src/assets/pii_logo.jpg" alt="PIIDetection Logo" className="h-10 w-10 rounded-md" />
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">PII Detection</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="font-medium text-gray-700 hover:text-red-600 transition-colors">Home</a>
            <a href="#" className="font-medium text-red-600 transition-colors">About</a>
            <a href="#" className="font-medium text-gray-700 hover:text-red-600 transition-colors">Services</a>
            <a href="#" className="font-medium text-gray-700 hover:text-red-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content with proper spacing from navbar */}
      <main className="pt-24 pb-12 max-w-7xl mx-auto">
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 font-poppins text-red-600">
              About <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">PII Detection</span>
            </h1>
            
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full mb-8"></div>
            
            <p className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-700">
              PII Detection is an advanced AI-powered platform designed to detect personally identifiable information (PII) in documents. 
              Our system analyzes uploaded files for sensitive data, providing risk assessments and helping users protect their 
              privacy and comply with data protection regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">AI-Powered Detection</h3>
              <p className="text-gray-600">
                Our advanced AI algorithms scan documents to identify personal information such as names, addresses, phone numbers, and financial details.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Risk Assessment</h3>
              <p className="text-gray-600">
                Get detailed risk percentage analysis and recommendations on document safety based on the sensitive information detected.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Privacy Protection</h3>
              <p className="text-gray-600">
                Receive guidance on how to safeguard sensitive information and comply with data protection regulations like GDPR and CCPA.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 font-poppins text-gray-800">Meet Our Team</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full mb-8"></div>
            <p className="text-lg max-w-2xl mx-auto text-gray-600">
              We're a passionate team of IT engineers from PICT working to revolutionize document privacy and security through AI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-white shadow-lg group"
              >
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content container with small offset from border */}
                <div className="relative m-[2px] bg-white rounded-lg p-6 h-full flex flex-col items-center">
                  {/* Profile Picture with hover effects */}
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-125 blur-lg transition-all duration-300"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover relative z-10 filter group-hover:grayscale-0 grayscale transition-all duration-500"
                    />
                  </div>
                  
                  {/* Member details */}
                  <h3 className="text-xl font-bold mb-1 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">{member.name}</h3>
                  <p className="text-sm mb-4 text-gray-600">{member.role}</p>
                  
                  {/* Social links */}
                  <div className="flex space-x-4 mt-auto">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transform hover:scale-125 transition-all duration-300"
                    >
                      <FaLinkedin size={22} />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-500 hover:text-red-500 transform hover:scale-125 transition-all duration-300"
                    >
                      <FaEnvelope size={22} />
                    </a>
                    <a
                      href={`tel:${member.contact}`}
                      className="text-gray-500 hover:text-green-500 transform hover:scale-125 transition-all duration-300"
                    >
                      <FaPhone size={22} />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-purple-600 transform hover:scale-125 transition-all duration-300"
                    >
                      <FaGithub size={22} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">PII Detection</span>
              <p className="mt-2 text-gray-600">Protecting your sensitive information with AI</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">About</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-gray-500">
            <p>© {new Date().getFullYear()} PII Detection. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;