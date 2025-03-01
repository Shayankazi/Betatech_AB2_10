import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/HomePage/Home';
import AuthPage from './Components/AuthPage/Auth'; 
import UserDashboard from './Components/Dashboard/UserDashboard';
import About from './Components/About/About'; 
import Contact from './Components/Contact/contact'; 


// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />
        <Route path="/userdash" element={<UserDashboard/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />


        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;