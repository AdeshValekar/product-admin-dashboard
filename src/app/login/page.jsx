"use client";

import { useState } from "react";
import { useAuth } from '@/context/AuthContext';


export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setError("");
        setLoading(true);

        try {
            await login(username, password);
            // Auth context redirects to /products on success
        } catch (err) {
            setError(err.response?.data?.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
            <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Admin Login</h1>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Log in with your credentials to manage products.
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4 border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}