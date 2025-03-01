import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

function AuthPage({ type }) {
  const isLogin = type === "login";
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-sans">
          {isLogin ? "Log in" : "Sign up"}
        </h2>
        <p className="text-gray-500 mb-4">
          {isLogin ? "Welcome back!" : "Create a new account"}
        </p>
        
        <div className="space-y-4">
          {!isLogin && (
            <motion.input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}
          
          {/* Single Input Box for Email or Phone on Login */}
          <motion.input
            type="text"
            placeholder={isLogin ? "Email or Phone Number" : "Email Address"}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          
          {!isLogin && (
            <motion.input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}
          
          <motion.input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md font-medium hover:bg-purple-700"
          >
            {isLogin ? "Log in" : "Sign up"}
          </motion.button>
        </div>
        
        <div className="mt-6 space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 border border-gray-300 rounded-lg shadow-md text-gray-700 font-medium bg-white hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500 text-xl" />
            <span>Continue with Google</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 border border-gray-300 rounded-lg shadow-md text-gray-700 font-medium bg-white hover:bg-gray-100"
          >
            <FaGithub className="text-gray-800 text-xl" />
            <span>Continue with GitHub</span>
          </motion.button>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-gray-400 text-sm mt-6"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default AuthPage;
