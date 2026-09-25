"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct } from "@/services/productApi";
import { useDebounce } from "@/hooks/useDebounce";
import ProductTable from "@/components/ProductTable";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import ProductForm from "@/components/ProductForm";
import ConfirmDelete from "@/components/ConfirmDelete";
import Loader from "@/components/Loader";

export default function ProductsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Read URL params safely with fallback values
    const rawPage = parseInt(searchParams.get("page") || "1", 10);
    const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

    const rawLimit = parseInt(searchParams.get("limit") || "10", 10);
    const limit = [10, 20, 50].includes(rawLimit) ? rawLimit : 10;

    const searchParam = searchParams.get("q") || "";
    const categoryParam = searchParams.get("category") || "all";
    const sortByParam = searchParams.get("sortBy") || "";
    const orderParam = searchParams.get("order") || "asc";

    // Search input local state
    const [searchInput, setSearchInput] = useState(searchParam);
    const debouncedSearch = useDebounce(searchInput, 500);

    // Products and Categories State
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modals state
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // Sync Search Input with Debounced Search Value -> Updates URL Parameters
    useEffect(() => {
        if (debouncedSearch !== searchParam) {
            updateUrlParams({ q: debouncedSearch, page: 1 });
        }
    }, [debouncedSearch]);

    // Helper to sync changes directly into Next.js URL Search Params
    const updateUrlParams = (newParams) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null || value === "" || value === "all") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });
        router.push(`/products?${params.toString()}`);
    };

    // Main Data Fetcher
    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const skip = (page - 1) * limit;
            const data = await fetchProducts({
                limit,
                skip,
                search: searchParam,
                category: categoryParam,
                sortBy: sortByParam,
                order: orderParam,
            });

            setProducts(data.products || []);
            setTotal(data.total || 0);
        } catch (err) {
            if (err.name !== "CanceledError") {
                setError(err.message || "Failed to load products");
            }
        } finally {
            setLoading(false);
        }
    }, [page, limit, searchParam, categoryParam, sortByParam, orderParam]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Load Categories on mount
    useEffect(() => {
        fetchCategories()
            .then((data) => setCategories(data))
            .catch((err) => console.error("Failed to load categories:", err));
    }, []);

    // Form submit handler (Optimistic client state update + API mock call)
    const handleSaveProduct = async (formData) => {
        if (editingProduct) {
            const updated = await updateProduct(editingProduct.id, formData);
            setProducts((prev) =>
                prev.map((p) => (p.id === editingProduct.id ? { ...p, ...updated } : p))
            );
        } else {
            const created = await createProduct(formData);
            setProducts((prev) => [
                {
                    ...created,
                    id: Date.now(),
                    thumbnail:
                        formData.thumbnail ||
                        "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
                },
                ...prev,
            ]);
            setTotal((prev) => prev + 1);
        }
    };

    // Delete product handler
    const handleDeleteConfirm = async () => {
        if (!deletingProduct) return;
        setActionLoading(true);
        try {
            await deleteProduct(deletingProduct.id);
            setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
            setTotal((prev) => Math.max(0, prev - 1));
            setDeletingProduct(null);
        } catch (err) {
            alert("Failed to delete product");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-emerald-600">Products Catalog</h1>
                    <p className="text-sm text-emerald-800/70 mt-1">Manage products, stock levels, and pricing.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setFormModalOpen(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white font-medium text-sm rounded-lg hover:bg-indigo-700 transition"
                >
                    + Add Product
                </button>
            </div>

            {/* Search, Filter, Sort Controls */}
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <SearchBar value={searchInput} onChange={setSearchInput} />

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Category Filter */}
                    <select
                        value={categoryParam}
                        disabled={!!searchParam}
                        onChange={(e) => updateUrlParams({ category: e.target.value, page: 1 })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => {
                            const name = typeof cat === "string" ? cat : cat.name || cat.slug;
                            const slug = typeof cat === "string" ? cat : cat.slug;
                            return (
                                <option key={slug} value={slug}>
                                    {name}
                                </option>
                            );
                        })}
                    </select>

                    {/* Sort Field Selector */}
                    <select
                        value={sortByParam}
                        onChange={(e) => updateUrlParams({ sortBy: e.target.value, page: 1 })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Sort By (Default)</option>
                        <option value="title">Title</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                    </select>

                    {/* Order Selector */}
                    {sortByParam && (
                        <select
                            value={orderParam}
                            onChange={(e) => updateUrlParams({ order: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                    <p className="text-red-600 font-medium mb-4">{error}</p>
                    <button
                        onClick={loadData}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                    <p className="text-gray-500 font-medium">No products found matching your criteria.</p>
                </div>
            ) : (
                <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                        <ProductTable
                            products={products}
                            onEdit={(prod) => {
                                setEditingProduct(prod);
                                setFormModalOpen(true);
                            }}
                            onDelete={(prod) => setDeletingProduct(prod)}
                        />
                    </div>

                    {/* Mobile Grid/Card View */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                        {products.map((prod) => (
                            <ProductCard
                                key={prod.id}
                                product={prod}
                                onEdit={(p) => {
                                    setEditingProduct(p);
                                    setFormModalOpen(true);
                                }}
                                onDelete={(p) => setDeletingProduct(p)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        currentPage={page}
                        totalItems={total}
                        pageSize={limit}
                        onPageChange={(p) => updateUrlParams({ page: p })}
                        onPageSizeChange={(s) => updateUrlParams({ limit: s, page: 1 })}
                    />
                </>
            )}

            {/* Modals */}
            {formModalOpen && (
                <ProductForm
                    initialData={editingProduct}
                    categories={categories}
                    onSubmit={handleSaveProduct}
                    onClose={() => {
                        setFormModalOpen(false);
                        setEditingProduct(null);
                    }}
                />
            )}

            <ConfirmDelete
                isOpen={!!deletingProduct}
                title={deletingProduct?.title}
                loading={actionLoading}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeletingProduct(null)}
            />
        </div>
    );
}