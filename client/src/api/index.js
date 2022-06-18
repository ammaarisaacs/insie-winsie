import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchProducts = () => API.get("/products");

export const createProduct = (newProduct) => API.post("/products", newProduct);
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const updateProduct = (id, update) =>
  API.patch(`/products/${id}`, update);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const fetchCarouselProducts = () => API.get("/products/carousel");
export const createCarouselProducts = (id) =>
  API.post(`/products/carousel/${id}`);
export const updateCarouselProducts = (id, update) =>
  API.patch(`/products/carousel/${id}`);
export const deleteCarouselProducts = (id) =>
  API.delete(`/products/carousel/${id}`);
