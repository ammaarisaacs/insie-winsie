const axios = require("axios");
const crypto = require("crypto");
const dns = require("dns");

const { order_detail, product } = require("../models");
const ApiError = require("../errors/errors");

const testingMode = true;
const pfHost = testingMode ? "sandbox.payfast.co.za" : "www.payfast.co.za";

module.exports = async function verifyPayment(req, res, next) {
  const pfData = JSON.parse(JSON.stringify(req.body));

  console.log(pfData);

  let pfParamString = "";
  for (let key in pfData) {
    if (pfData.hasOwnProperty(key) && key !== "signature") {
      pfParamString += `${key}=${encodeURIComponent(pfData[key].trim()).replace(
        /%20/g,
        "+"
      )}&`;
    }
  }

  let plainOrder, cartTotal;

  try {
    const order = await order_detail.findOne({
      where: { order_number: parseInt(pfData.item_name) },
      include: [{ model: product, through: { attributes: ["order_qty"] } }],
    });

    // validate ITN with other credentials here

    plainOrder = order.get({ plain: true });

    cartTotal = plainOrder.total;
  } catch (error) {
    return next(ApiError.internal());
  }

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
  } else {
    // Some checks have failed, check payment manually and log for investigation
    next(ApiError.internal("Invalid payment. Please contact us for support."));
    // cancel the payment
  }
};

function pfValidSignature(pfData, pfParamString, pfPassphrase = null) {
  // Calculate security signature
  let tempParamString = "";
  if (pfPassphrase !== null) {
    pfParamString += `&passphrase=${encodeURIComponent(
      pfPassphrase.trim()
    ).replace(/%20/g, "+")}`;
  }

  const signature = crypto
    .createHash("md5")
    .update(pfParamString)
    .digest("hex");
  return pfData["signature"] === signature;
}

async function pfValidIP(req) {
  const validHosts = [
    "www.payfast.co.za",
    "sandbox.payfast.co.za",
    "w1w.payfast.co.za",
    "w2w.payfast.co.za",
  ];

  let validIps = [];
  const pfIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    for (let key in validHosts) {
      const ips = await ipLookup(validHosts[key]);
      validIps = [...validIps, ...ips];
    }
  } catch (err) {
    console.error(err);
    // need to log error here
  }

  const uniqueIps = [...new Set(validIps)];

  if (uniqueIps.includes(pfIp)) {
    return true;
  }
  return false;
}

function pfValidPaymentData(cartTotal, pfData) {
  return (
    Math.abs(parseFloat(cartTotal) - parseFloat(pfData["amount_gross"])) <= 0.01
  );
}

async function pfValidServerConfirmation(pfHost, pfParamString) {
  const result = await axios
    .post(`https://${pfHost}/eng/query/validate`, pfParamString)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result === "VALID";
}

async function ipLookup(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { all: true }, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        const addressIps = address.map(function (item) {
          return item.address;
        });
        resolve(addressIps);
      }
    });
  });
}
