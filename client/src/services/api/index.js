import axios from "axios";
import { SERVER_URL } from "../../constants";

const API = axios.create({ baseURL: SERVER_URL });

// products

export const fetchProducts = (searchQuery, category) => {
  return API.get(`/products`, {
    params: {
      search: searchQuery,
      category: category,
    },
  });
};

export const fetchImage = (fileName) =>
  API.get(`http://localhost:5000/static/${fileName}`);

export const fetchProduct = (id) => API.get(`/products/${id}`);

export const createProduct = (newProduct) => API.post("/products", newProduct);

export const updateProduct = (id, update) =>
  API.patch(`/products/${id}`, update);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

// carousel

export const fetchCarouselProducts = () => API.get("/products/carousel");

export const createCarouselProducts = (newCarouselProduct) =>
  API.post(`/products/carousel`, newCarouselProduct);

export const updateCarouselProducts = (id, update) =>
  API.patch(`/products/carousel/${id}`);

export const deleteCarouselProducts = (id) =>
  API.delete(`/products/carousel/${id}`);

// contacts

export const sendContactData = (contactData) =>
  API.post("./contact", contactData);

// orders

export const sendOrderData = (orderData) => API.post("/order", orderData);

export const fetchOrderData = (id) => API.get(`/order/${id}`);

export const sendPaymentId = (id) => API.get(`/order/success/${id}`);

// shipping

export const sendShippingData = (shippingData) =>
  API.post("/order/shipping", shippingData);

// export const sendOrder = (id) => API.get(`/orders/${id}`);

// export const sendShippingDetails = (area) => API.get(`shipping/${area}`);
