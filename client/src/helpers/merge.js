// grabs all value attributes in form data
export const mapStateToPost = (formData) => {
  let postData = {};
  for (let field in formData) {
    const { value } = formData[field];
    postData[field] = value;
  }
  return postData;
};

const mapStateToInputProps = (state, keys, handler, error) => {
  let props = [];
  for (let field in state) {
    let prop = {};
    keys.map((key) => {
      prop[key] = state[field][key];
    });
    prop.onChange = handler;
    prop.error = error[field];

    props.push(prop);
  }
};

export const formatOrderData = (...args) => {
  const [cartItems, shippingData, billingData, isSame, totalPrice, data] = args;
  return {
    shipping: { ...shippingData, method: data },
    ...(!isSame && { billing: billingData }),
    cart: { items: cartItems, total: parseFloat(totalPrice.toFixed(2)) },
  };
};
