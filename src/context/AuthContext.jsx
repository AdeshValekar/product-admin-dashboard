"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                document.cookie = "token=; path=/; max-age=0;";
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const data = await loginUser(username, password);
        const token = data.accessToken || data.token;

        // 1. Store token in localStorage (for client API calls)
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data));

        // 2. Store token in Cookies so Next.js Middleware can read it on the server
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;

        setUser(data);

        // 3. Force refresh router state and navigate to products
        router.push("/products");
        router.refresh();
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Clear cookie
        document.cookie = "token=; path=/; max-age=0;";
        setUser(null);
        router.push("/login");
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};