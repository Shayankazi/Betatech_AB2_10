import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { googleAuth } from "../api";
import useAuthCheck from "../useAuthCheck";

function AuthPage({ type }) {
  const isLogin = type === "login";
/*    useAuthCheck();  */

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: data.email, name: data.name })
        );
        toast.success("Login successful! Redirecting...", { autoClose: 2000 });
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      toast.error("Error logging in. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Registration successful! Redirecting...", {
          autoClose: 2000,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({ email: data.email, name: data.name })
        );
        localStorage.setItem("token", data.token);

        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      toast.error("Error signing up. Please try again.");
      console.error("Error:", error);
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const result = await googleAuth(authResult.code);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        localStorage.setItem("token", result.data.token);
        toast.success("Google Authentication Successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err) {
      console.error("Error during Google authentication:", err);
      toast.error("Google login/signup failed. Try again.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}

          <motion.input
            type="text"
            placeholder={isLogin ? "Email or Phone Number" : "Email Address"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {!isLogin && (
            <motion.input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={isLogin ? handleLogin : handleRegister}
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md font-medium hover:bg-purple-700"
          >
            {isLogin ? "Log in" : "Sign up"}
          </motion.button>
        </div>

        <div className="mt-6 space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center space-x-3 px-6 py-3 border border-gray-300 rounded-lg shadow-md text-gray-700 font-medium bg-white hover:bg-gray-100"
          >
            <FaGoogle className="text-red-500 text-xl" />
            <span>Continue with Google</span>
          </motion.button>


        </div>
      </motion.div>
    </div>
  );
}

export default AuthPage;
