const { getOrderAndQtyByOrderNumber } = require("../repo/orderRepo");
const { ApiError } = require("../errors");
const {
  pfValidSignature,
  pfValidIP,
  pfValidPaymentData,
  pfValidServerConfirmation,
} = require("../services/paymentService");
const { logger, errLogger } = require("../lib/logger");

const testingMode = true;
const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

module.exports = async function validatePayment(req, res, next) {
  const pfData = JSON.parse(JSON.stringify(req.body));

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
    const order = await getOrderAndQtyByOrderNumber(parseInt(pfData.item_name));
    const plainOrder = order.get({ plain: true });
    const cartTotal = plainOrder.total;

    logger.info({ message: `Validating ITN for order ${pfData.item_name}` });

    pfParamString = pfParamString.slice(0, -1);
    const check1 = pfValidSignature(pfData, pfParamString);
    const check2 = pfValidIP(req);
    const check3 = pfValidPaymentData(cartTotal, pfData);
    const check4 = pfValidServerConfirmation(pfHost, pfParamString);

    errLogger.error({ message: JSON.stringify(check1) });
    errLogger.error({ message: JSON.stringify(check2) });
    errLogger.error({ message: JSON.stringify(check3) });
    errLogger.error({ message: JSON.stringify(check4) });

    if (check1 && check2 && check3 && check4) {
      logger.info({
        message: `Payment validation for order ${pfData.item_name} successful`,
      });
      req.body.order = plainOrder;
      next();
      return;
    } else {
      next(
        ApiError.mismatch(
          `Payment ${pfData.item_name} information incorrect. Payment has been cancelled.`
        )
      );
    }
  } catch (error) {
    // cancel the payment
    next(
      ApiError.internal(`Payment validation failed for ${pfData.item_name}`)
    );
    return;
  }
};
