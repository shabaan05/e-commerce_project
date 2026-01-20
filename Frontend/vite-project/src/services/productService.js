import api from "./api";

// ✅ Get all products
export const getProducts = async (categoryId) => {
  try {
    // Optional category filter
    const url = categoryId ? `/products?category=${categoryId}` : "/products";

    const response = await api.get(url);

    // Ensure we always return an array
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      return []; // fallback to empty array
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // return empty array on error
  }
};

// ✅ Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
