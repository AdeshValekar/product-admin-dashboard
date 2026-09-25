import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
                The product you are looking for does not exist or has been removed.
            </p>
            <Link
                href="/products"
                className="px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded hover:bg-indigo-700"
            >
                Back to Products List
            </Link>
        </div>
    );
}