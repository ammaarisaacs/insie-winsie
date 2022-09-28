const { getOrderAndQtyByOrderNumber } = require("../repo/orderRepo");
const { ApiError } = require("../errors");
const {
  pfValidSignature,
  pfValidIP,
  pfValidPaymentData,
  pfValidServerConfirmation,
} = require("../services/paymentService");
const { logger } = require("../lib/logger");

const testingMode = true;
const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

module.exports = async function validatePayment(req, res, next) {
  const pfData = JSON.parse(JSON.stringify(req.body));

  const { item_name } = pfData;

  let pfParamString = "";
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }

  try {
    const order = await getOrderAndQtyByOrderNumber(parseInt(item_name));
    const plainOrder = order.get({ plain: true });
    const cartTotal = plainOrder.total;

    logger.info({ message: `Validating order ${item_name}` });

    pfParamString = pfParamString.slice(0, -1);
    const check1 = pfValidSignature(pfData, pfParamString);
    const check2 = pfValidIP(req);
    const check3 = pfValidPaymentData(cartTotal, pfData);
    const check4 = pfValidServerConfirmation(pfHost, pfParamString);

    if (check1 && check2 && check3 && check4) {
      logger.info({ message: `Payment validation successful` });
      req.body.order = plainOrder;
      next();
      return;
    } else {
      next(ApiError.mismatch(`Payment ${item_name} information incorrect`));
      return;
    }
  } catch (error) {
    // cancel the payment
    next(ApiError.internal(`Payment validation failed for ${item_name}`));
    return;
  }
};
