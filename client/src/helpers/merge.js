export const formatFormData = (formData) => {
  let postData = {};
  for (let field in formData) {
    const { value } = formData[field];
    postData[field] = value;
  }
  return postData;
};

export const formatOrderData = (...args) => {
  const [cartItems, shippingData, billingData, isSame, totalPrice, data] = args;
  return {
    shipping: { ...shippingData, method: data },
    ...(!isSame && { billing: billingData }),
    cart: { items: cartItems, total: parseFloat(totalPrice.toFixed(2)) },
  };
};
