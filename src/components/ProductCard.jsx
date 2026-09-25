"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product, onEdit, onDelete }) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between shadow-sm">
            <div>
                <div className="relative w-full h-40 mb-3 bg-gray-50 rounded overflow-hidden">
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 300px"
                    />
                </div>
                <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded mb-2">
                    {product.category}
                </span>
                <h3 className="font-bold text-gray-900 line-clamp-1">{product.title}</h3>
                <div className="flex items-center justify-between my-2 text-sm">
                    <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                    <span className="text-amber-500 font-medium">★ {product.rating}</span>
                </div>
                <p className="text-xs text-gray-500">Stock: {product.stock} units</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
                <Link
                    href={`/products/${product.id}`}
                    className="text-indigo-600 hover:underline font-medium"
                >
                    View Details
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(product)}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(product)}
                        className="px-2 py-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}