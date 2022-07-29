import * as api from "../api";

export const sendShippingData = (shippingData) => {
  return api.sendShippingData(shippingData);
};

export const sendOrderData = (orderData) => {
  return api.sendOrderData(orderData);
};

export const sendPaymentId = (id) => {
  return api.sendPaymentId(id);
};
