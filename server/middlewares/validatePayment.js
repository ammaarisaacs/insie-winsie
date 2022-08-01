const { order_detail, product } = require("../db/models");
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

  let pfParamString = "";
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }

  let cartTotal;

  try {
    const order = await order_detail.findOne({
      where: { order_number: parseInt(pfData.item_name) },
      include: [{ model: product, through: { attributes: ["order_qty"] } }],
    });

    // validate ITN with other credentials here

    const plainOrder = order.get({ plain: true });

    cartTotal = plainOrder.total;
    // Remove last ampersand
    pfParamString = pfParamString.slice(0, -1);
    const check1 = pfValidSignature(pfData, pfParamString);
    const check2 = pfValidIP(req);
    const check3 = pfValidPaymentData(cartTotal, pfData);
    const check4 = pfValidServerConfirmation(pfHost, pfParamString);

    if (check1 && check2 && check3 && check4) {
      // All checks have passed, the payment is successful
      req.body.order = plainOrder;
      next();
    }
  } catch (error) {
    return next(
      // Some checks have failed, check payment manually and log for investigation
      // cancel the payment
      ApiError.internal("Invalid payment. Please contact us for support.")
    );
  }
};
