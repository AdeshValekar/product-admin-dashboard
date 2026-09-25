"use client";

import { useState, useEffect } from "react";
import { validateProduct } from "@/utils/validation";

export default function ProductForm({ initialData, categories = [], onSubmit, onClose }) {
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        stock: "",
        category: "",
        thumbnail: "", // Added Image URL field
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                price: initialData.price || "",
                stock: initialData.stock || "",
                category: initialData.category || "",
                thumbnail: initialData.thumbnail || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;

        const validationErrors = validateProduct(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setSubmitting(true);
            await onSubmit({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
                // Fallback default image if no image URL was provided
                thumbnail:
                    formData.thumbnail.trim() ||
                    "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            });
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {initialData ? "Edit Product" : "Add New Product"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Image URL (Thumbnail)
                        </label>
                        <input
                            type="text"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.stock && <p className="text-xs text-red-500 mt-1">{errors.stock}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. beauty, laptops"
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button

                            type="submit"
                            disabled={submitting}
                            className="px-4 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                        >
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                "Save Product"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}