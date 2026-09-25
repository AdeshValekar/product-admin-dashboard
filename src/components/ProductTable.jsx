"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductTable({ products, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 border-b border-gray-200">
                    <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Rating</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 flex items-center gap-3">
                                <div className="relative w-12 h-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                    <Image
                                        src={product.thumbnail}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                        sizes="48px"
                                    />
                                </div>
                                <div>
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="font-semibold text-gray-900 hover:text-indigo-600 line-clamp-1"
                                    >
                                        {product.title}
                                    </Link>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                    {product.category}
                                </span>
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-900">${product.price}</td>
                            <td className="px-4 py-3 text-amber-500 font-medium">★ {product.rating}</td>
                            <td className="px-4 py-3">{product.stock}</td>
                            <td className="px-4 py-3 text-right space-x-2">
                                <button
                                    onClick={() => onEdit(product)}
                                    className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(product)}
                                    className="px-2.5 py-1 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}