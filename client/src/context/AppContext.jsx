import { axiosInstance } from "@/utils/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // <-- initially true
    const [error, setError] = useState(null);

    // Check for existing session on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (token) {
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
        }

        setLoading(false); 
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.post("/auth/login", {
                email,
                password,
            });
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.token}`;
            toast.success("Welcome back!");
            return true;
        } catch (err) {
            const msg = err.response?.data?.message || "Login failed";
            toast.error(msg);
            setError(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.post("/auth/register", {
                name,
                email,
                password,
            });
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data.token}`;
            toast.success("Account created and logged in!");
            return true;
        } catch (err) {
            const msg = err.response?.data?.message || "Registration failed";
            toast.error(msg);
            setError(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        delete axiosInstance.defaults.headers.common["Authorization"];
        toast.success("Logged out successfully");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
                register,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
