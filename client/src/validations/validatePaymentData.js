import validateUrl from "./validateUrl";

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
  const { firstName, lastName, cellphone, email, method } = shipping;
  const { charge } = method;

  if (
    Object.keys(payData).map((field) => {
      if (payData[field] === "" || payData[field] == null) {
        errors[field] = "missing value";
      }
    })
  );

  if (name_first !== firstName.toLowerCase())
    errors.firstName = "first name does not match";
  if (name_last !== lastName.toLowerCase())
    errors.lastName = "last name does not match";

  const validatedReturnUrl = validateUrl(return_url);
  if (!validatedReturnUrl) errors.return_url = "return url is wrong";

  const validatedCancelUrl = validateUrl(cancel_url);
  if (!validatedCancelUrl) errors.return_url = "cancel url is wrong";

  const validatedNotifyUrl = validateUrl(notify_url);
  if (!validatedNotifyUrl) errors.return_url = "notify url is wrong";

  const cartTotal = cart.items.reduce((tot, item) => {
    const { orderQty, product } = item;
    const { price } = product;
    return tot + price * orderQty;
  }, 0);

  const clientAmount = charge + cartTotal;
  // const clientAmount = 500;

  if (amount !== clientAmount.toFixed(2)) errors.amount = "amount mismatch";

  if (email_address !== email) errors.email = "email mismatch";

  if (!signature) errors.signature = "signature missing";

  return errors;
};
