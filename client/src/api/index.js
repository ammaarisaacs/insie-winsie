import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchProducts = (searchQuery, filterQuery) => {
  // if (!searchQuery && !filterQuery) return API.get("/products");
  return API.get(`/products?search=${searchQuery}&filter=${filterQuery}`);
};

export const createProduct = (newProduct) => API.post("/products", newProduct);
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const updateProduct = (id, update) =>
  API.patch(`/products/${id}`, update);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const fetchCarouselProducts = () => API.get("/products/carousel");
export const createCarouselProducts = (newCarouselProduct) =>
  API.post(`/products/carousel`, newCarouselProduct);
export const updateCarouselProducts = (id, update) =>
  API.patch(`/products/carousel/${id}`);
export const deleteCarouselProducts = (id) =>
  API.delete(`/products/carousel/${id}`);

// export const sendOrder = (id) => API.get(`/orders/${id}`);
// export const sendShippingDetails = (area) => API.get(`shipping/${area}`);
export const sendShippingData = (shippingData) =>
  API.post("/checkout", shippingData);

export const sendContactData = (contactData) =>
  API.post("./contact", contactData);
