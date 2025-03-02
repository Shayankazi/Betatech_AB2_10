import React, { useState, useEffect } from 'react';
import { LogIn, Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import for navigation

const AdminLoginPage = () => {
  // Default credentials (hidden from UI)
  const DEFAULT_EMAIL = 'admin123@gmail.com';
  const DEFAULT_PASSWORD = 'admin123';

  const navigate = useNavigate(); // Hook for programmatic navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(0);
  const [loginError, setLoginError] = useState(false);

  // Handle redirection with progress
  useEffect(() => {
    let interval;
    if (redirecting) {
      interval = setInterval(() => {
        setRedirectProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Navigate to the AdminDashboard route
            navigate('/AdminDashboard');
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [redirecting, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset any previous errors
    setLoginError(false);
    
    // Set loading state first
    setIsLoading(true);
    
    // Simulate API call with brief delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Check credentials
      if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
        // Handle remember me option
        if (rememberMe) {
          localStorage.setItem('adminEmail', email);
        } else {
          localStorage.removeItem('adminEmail');
        }
        
        // Start the redirect process with visual indicator
        setRedirecting(true);
      } else {
        // Show error for invalid credentials
        setLoginError(true);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md p-4">
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-2">
            <div className="w-full flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl text-center font-bold text-gray-800">Welcome Back</h2>
            <p className="text-center text-gray-600 mt-1">
              Sign in to access your admin dashboard
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              {loginError && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span>Invalid email or password. Please try again.</span>
                  </div>
                </div>
              )}
            
              {redirecting && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Redirecting to admin dashboard...
                    </span>
                    <span>{redirectProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-150" 
                      style={{ width: `${redirectProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700 font-medium">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-3 h-5 w-5 text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 py-2 px-3 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-3 h-5 w-5 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 py-2 px-3 border rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                />
                <label 
                  htmlFor="remember" 
                  className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  Remember me
                </label>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isLoading || redirecting}
              >
                {isLoading ? (
                  <div className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// This component would be in a separate file in your project 
// and would be accessed via routing, but I'm including it here for reference
const AdminDashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-full max-w-4xl p-4">
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShieldCheck className="h-6 w-6" />
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              </div>
              <button 
                className="px-4 py-2 bg-white text-indigo-600 rounded-md shadow hover:bg-indigo-50 transition-colors"
                onClick={() => window.location.href = '/'}
              >
                Logout
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm">
                <h3 className="font-bold text-green-800 mb-1">Total Users</h3>
                <p className="text-2xl font-bold">1,234</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="font-bold text-blue-800 mb-1">Active Sessions</h3>
                <p className="text-2xl font-bold">56</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 shadow-sm">
                <h3 className="font-bold text-purple-800 mb-1">New Registrations</h3>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(item => (
                  <div key={item} className="p-3 bg-gray-50 rounded-md border border-gray-100">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">User #{item * 100 + 22} logged in</span>
                      <span className="text-sm text-gray-500">{item * 5} minutes ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;