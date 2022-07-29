export default (payData, orderData) => {
  let errors = {};

  const {
    merchant_id,
    merchant_key,
    name_first,
    name_last,
    email_address,
    item_name,
    amount,
    signature,
    return_url,
    cancel_url,
    notify_url,
  } = payData;

  const { shipping, cart } = orderData;
  const { email, method } = shipping;
  const { charge } = method;

  if (
    Object.keys(payData).map((field) => {
      if (payData[field] === "" || payData[field] == null) {
        errors[field] = "missing";
      }
    })
  );

  const cartTotal = cart.items.reduce((tot, item) => {
    const { orderQty, product } = item;
    const { price } = product;
    return tot + price * orderQty;
  }, 0);

  const clientAmount = charge + cartTotal;

  if (amount !== clientAmount.toFixed(2)) errors.amount = "amount mismatch";

  if (email_address !== email) errors.email = "email mismatch";

  if (!signature) errors.signature = "signature missing";

  return errors;
};
