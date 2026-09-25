"use client";

export default function Error({ error, reset }) {
    return (
        <div className="max-w-7xl mx-auto p-6 text-center py-16">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
            <p className="text-sm text-gray-600 mb-6">{error?.message || "Failed to load product data."}</p>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
            >
                Retry
            </button>
        </div>
    );
}