const axios = require("axios");
const crypto = require("crypto");
const dns = require("dns");
require("dotenv").config();
const { errLogger } = require("../lib/logger");

function createPayData(order, id) {
  const myData = [];
  myData["merchant_id"] = process.env.PF_MERCHANT_ID;
  myData["merchant_key"] = process.env.PF_MERCHANT_KEY;
  myData["return_url"] = `${process.env.CLIENT_URL}/checkout/success/${id}`;
  myData["cancel_url"] = `${process.env.CLIENT_URL}/checkout`;
  // myData[
  //   "notify_url"
  // ] = `https://67e4-105-243-149-77.sa.ngrok.io/order/success`;
  // myData["notify_url"] = `${process.env.HOST}/order/success`;
  myData["notify_url"] = `https://insie-winsie-server.loca.lt/order/success`;
  myData["name_first"] = order.first_name;
  myData["name_last"] = order.last_name;
  myData["email_address"] = order.email;
  myData["m_payment_id"] = "01AB";
  myData["amount"] = order.total.toString();
  myData["item_name"] = order.order_number.toString();
  myData["signature"] = generateSignature(myData);
  return myData;
}

function generateSignature(data, passPhrase = null) {
  let pfOutput = "";
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(
          /%20/g,
          "+"
        )}&`;
      }
    }
  }
  let getString = pfOutput.slice(0, -1);
  if (passPhrase !== null) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
      /%20/g,
      "+"
    )}`;
  }
  return crypto.createHash("md5").update(getString).digest("hex");
}

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
    errLogger.error({ message: "Invalid IP found during payment validation" });
    errLogger.error({ message: err.message, stack: err.stack, code: err.code });
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

module.exports = {
  createPayData,
  pfValidSignature,
  pfValidIP,
  pfValidPaymentData,
  pfValidServerConfirmation,
};
