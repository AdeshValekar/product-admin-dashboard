import api from "./axios";

let searchAbortController = null;

export const fetchProducts = async ({ limit, skip, search, category, sortBy, order }) => {
    // 1. Cancel previous search request if one is still pending
    if (searchAbortController) {
        searchAbortController.abort();
        searchAbortController = null; // Always reset after aborting
    }

    let url = "/products";

    if (search && search.trim() !== "") {
        url = `/products/search?q=${encodeURIComponent(search.trim())}`;
        // Create new controller specifically for search requests
        searchAbortController = new AbortController();
    } else if (category && category !== "all") {
        url = `/products/category/${encodeURIComponent(category)}`;
    }

    const params = { limit, skip };

    if (sortBy) {
        params.sortBy = sortBy;
        params.order = order || "asc";
    }

    const response = await api.get(url, {
        params,
        // Pass signal ONLY during active search operations
        signal: searchAbortController ? searchAbortController.signal : undefined,
    });

    return response.data;
};

export const fetchCategories = async () => {
    const response = await api.get("/products/categories");
    return response.data;
};

export const fetchProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post("/products/add", productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};