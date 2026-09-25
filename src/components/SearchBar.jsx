"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
    const [searchTerm, setSearchTerm] = useState(value || "");

    useEffect(() => {
        setSearchTerm(value || "");
    }, [value]);

    const handleChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        onChange(val);
    };

    return (
        <div className="w-full sm:w-72">
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search products..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}