import axios from "axios";

// Base URL from .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Common CRUD functions
const apiService = {
  getProducts: () => api.get("/products"),
  getProductById: (id) => api.get(`/products/${id}`),
  addProduct: (data) => api.post("/products/add", data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

export default apiService;
