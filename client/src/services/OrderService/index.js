import * as api from "../api";

export const getShippingCharger = (shippingData) => {
  return api.sendShippingData(shippingData);
};

export const sendOrderData = (orderData) => {
  return api.sendOrderData(orderData);
};

export const confirmPayment = (id) => {
  return api.confirmPayment(id);
};
