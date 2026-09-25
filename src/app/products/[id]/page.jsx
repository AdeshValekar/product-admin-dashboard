"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchProductById } from "@/services/productApi";
import Loader from "@/components/Loader";

const FALLBACK_IMAGE = "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg";

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(FALLBACK_IMAGE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLocalMock, setIsLocalMock] = useState(false);

    useEffect(() => {
        async function getProduct() {
            try {
                setLoading(true);

                // Check for client-generated local mock products
                if (id && Number(id) > 1000) {
                    setIsLocalMock(true);
                    const mockProduct = {
                        id,
                        title: "Newly Added Local Product",
                        category: "General",
                        brand: "Custom Brand",
                        price: 99.99,
                        rating: 5.0,
                        stock: 10,
                        description:
                            "This product was created locally during your session. DummyJSON API simulates CRUD operations but does not persist new records in its database.",
                        thumbnail: FALLBACK_IMAGE,
                        images: [FALLBACK_IMAGE],
                        reviews: [],
                    };
                    setProduct(mockProduct);
                    setSelectedImage(FALLBACK_IMAGE);
                    return;
                }

                const data = await fetchProductById(id);
                setProduct(data);

                // Fallback image handling
                const initialImg =
                    data?.images && data.images.length > 0 && data.images[0]
                        ? data.images[0]
                        : data?.thumbnail || FALLBACK_IMAGE;

                setSelectedImage(initialImg);
            } catch (err) {
                if (err.response?.status === 404) {
                    router.push("/products/not-found");
                } else {
                    setIsLocalMock(true);
                    const mockProduct = {
                        id,
                        title: "Newly Added Local Product",
                        category: "General",
                        brand: "Custom Brand",
                        price: 99.99,
                        rating: 5.0,
                        stock: 10,
                        description:
                            "This product was created locally during your current session. Because DummyJSON is a read-only mock REST API, new items are not stored permanently on its remote backend database.",
                        thumbnail: FALLBACK_IMAGE,
                        images: [FALLBACK_IMAGE],
                        reviews: [],
                    };
                    setProduct(mockProduct);
                    setSelectedImage(FALLBACK_IMAGE);
                }
            } finally {
                setLoading(false);
            }
        }

        if (id) getProduct();
    }, [id, router]);

    if (loading) return <Loader message="Loading details..." />;

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Link href="/products" className="text-indigo-600 underline text-sm">
                    Return to products
                </Link>
            </div>
        );
    }

    if (!product) return null;

    const imageList = product.images && product.images.length > 0 ? product.images : [selectedImage];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Link href="/products" className="text-sm text-indigo-600 hover:underline mb-6 inline-block">
                ← Back to products
            </Link>

            {isLocalMock && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
                    <strong>Mock Persistence Notice:</strong> This item was added locally during this session. DummyJSON API does not persist new entries to its server database.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                {/* Images View */}
                <div>
                    <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <Image
                            src={selectedImage || FALLBACK_IMAGE}
                            alt={product.title || "Product image"}
                            fill
                            className="object-contain p-4"
                            onError={() => setSelectedImage(FALLBACK_IMAGE)}
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {imageList.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                className={`relative w-16 h-16 border-2 rounded overflow-hidden flex-shrink-0 ${selectedImage === img ? "border-indigo-600" : "border-gray-200"
                                    }`}
                            >
                                <Image
                                    src={img || FALLBACK_IMAGE}
                                    alt=""
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = FALLBACK_IMAGE;
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Information */}
                <div className="flex flex-col justify-between">
                    <div>
                        <span className="text-xs uppercase bg-indigo-50 text-indigo-600 font-semibold px-2 py-1 rounded">
                            {product.category || "General"}
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.title}</h1>
                        <p className="text-sm text-gray-500 mt-1">Brand: {product.brand || "N/A"}</p>

                        <div className="flex items-center gap-4 my-4">
                            <span className="text-3xl font-extrabold text-indigo-600">${product.price}</span>
                            <span className="text-amber-500 font-semibold">★ {product.rating || "N/A"}</span>
                            <span className="text-xs text-gray-500">In Stock: {product.stock || 0}</span>
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed mb-6">{product.description}</p>
                    </div>

                    {/* Customer Reviews */}
                    <div className="border-t border-gray-100 pt-4">
                        <h3 className="font-bold text-gray-900 text-base mb-3">Customer Reviews</h3>
                        {product.reviews && product.reviews.length > 0 ? (
                            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                {product.reviews.map((rev, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded text-xs">
                                        <div className="flex justify-between font-semibold text-gray-800">
                                            <span>{rev.reviewerName}</span>
                                            <span className="text-amber-500">★ {rev.rating}</span>
                                        </div>
                                        <p className="text-gray-600 mt-1">{rev.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-gray-500">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}