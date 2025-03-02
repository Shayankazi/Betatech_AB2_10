import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
                toastStyle={{
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #1e293b, #334155)",
                    color: "#f8fafc",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                }} />
    <GoogleOAuthProvider clientId='292023268028-umj8b4nmv5h3npi2oo3o67eu7i1mhfo7.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>

  </StrictMode>,
)