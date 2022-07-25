// grabs all value attributes in form data
export const mapStateToPost = (formData) => {
  let postData = {};
  for (let field in formData) {
    const { value } = formData[field];
    postData[field] = value;
  }
  return postData;
};

const mapStateToInputProps = (state, keys, handler) => {
  let props = {};
  for (let field in state) {
    keys.map((key) => {
      props[key] = state[field][key];
    });
    props.onChange = handler;
  }
  return props;
};

export const formatOrderData = (...args) => {
  const [cartItems, shippingData, billingData, isSame, totalPrice, data] = args;
  return {
    shipping: { ...shippingData, method: data },
    ...(!isSame && { billing: billingData }),
    cart: { items: cartItems, total: parseFloat(totalPrice.toFixed(2)) },
  };
};
