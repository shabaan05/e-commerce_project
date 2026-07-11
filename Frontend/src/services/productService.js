import api from "./api";

// ✅ Get all products
export const getProducts = async (categoryId) => {
  const url = categoryId
    ? `/products?category=${categoryId}`
    : "/products";

  const response = await api.get(url);

  // ✅ RETURN THE ARRAY
  return response.data.products || [];
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

export const createProduct = async (form) => {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("price", form.price);
  formData.append("category", form.category);
  formData.append("countInStock", form.countInStock);
  formData.append("description", form.description);
  formData.append("image", form.image);

  const response = await api.post("/products", formData);

  return response.data;
};
