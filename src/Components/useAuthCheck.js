import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            console.log("User is already logged in. Redirecting to dashboard...");
            navigate("/dashboard");
        }
    }, [navigate]);
};

export default useAuthCheck;
