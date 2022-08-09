const { getOrderAndQtyByOrderNumber } = require("../repo/orderRepo");
const { ApiError } = require("../errors");
const {
  pfValidSignature,
  pfValidIP,
  pfValidPaymentData,
  pfValidServerConfirmation,
} = require("../services/paymentService");
// import logger but use adaptation of logger

const testingMode = true;
const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

module.exports = async function validatePayment(req, res, next) {
  const pfData = JSON.parse(JSON.stringify(req.body));

  console.log("validating payment: creating pf string.");

  let pfParamString = "";
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }

  // validate ITN with other credentials here

  try {
    console.log("validating payment: getting cart total details");

    const order = await getOrderAndQtyByOrderNumber(parseInt(pfData.item_name));
    const plainOrder = order.get({ plain: true });
    const cartTotal = plainOrder.total;

    console.log("validating payment: validating itn");

    pfParamString = pfParamString.slice(0, -1); // Remove last ampersand
    const check1 = pfValidSignature(pfData, pfParamString);
    const check2 = pfValidIP(req);
    const check3 = pfValidPaymentData(cartTotal, pfData);
    const check4 = pfValidServerConfirmation(pfHost, pfParamString);

    if (check1 && check2 && check3 && check4) {
      // All checks have passed, the payment is successful
      console.log("validating payment: checks passed.");
      req.body.order = plainOrder;
      next();
      return;
    }
  } catch (error) {
    // Some checks have failed, check payment manually and log for investigation
    // cancel the payment
    next(ApiError.internal("Payment validation failed."));
    return;
  }
};
