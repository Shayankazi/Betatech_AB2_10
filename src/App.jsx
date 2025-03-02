import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/HomePage/Home';
import AuthPage from './Components/AuthPage/Auth'; 
import UserDashboard from './Components/Dashboard/UserDashboard';
import About from './Components/About/About'; 
import Contact from './Components/Contact/contact'; 
import FileDashboard from './Components/Dashboard/FileDashboard';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import AdminLoginPage from './Components/AuthPage/AdminAuth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/signup" element={<AuthPage type="signup" />} />
        <Route path="/dashboard" element={<UserDashboard/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/file-dashboard" element={<FileDashboard />} />
        <Route path="/admin" element={<AdminLoginPage />}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;