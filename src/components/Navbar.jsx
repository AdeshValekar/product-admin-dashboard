"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/products" className="text-xl font-bold text-indigo-600">
                    Admin Dash
                </Link>
                {user && (
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-700">
                            Welcome, <strong className="font-semibold">{user.firstName || user.username}</strong>
                        </span>
                        <button
                            onClick={logout}
                            className="text-sm px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-md transition"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}