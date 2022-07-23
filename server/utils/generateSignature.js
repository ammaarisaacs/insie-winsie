const crypto = require("crypto");
require("dotenv").config();

module.exports = function createPayData(order, id) {
  const myData = [];

  myData["merchant_id"] = "10026685";
  myData["merchant_key"] = "hu59n36aijojn";
  myData["return_url"] = `http://localhost:3000/checkout/success/${id}`;
  myData["cancel_url"] = "http://localhost:3000/checkout";
  myData["notify_url"] =
    "https://da4f-105-243-149-77.sa.ngrok.io/order/success";
  // myData["notify_url"] = `${process.env.SERVER_URL}/order/success`;
  myData["name_first"] = order.first_name;
  myData["name_last"] = order.last_name;
  myData["email_address"] = order.email;
  myData["m_payment_id"] = "01AB";
  myData["amount"] = order.total.toString();
  myData["item_name"] = order.order_number.toString();
  myData["signature"] = generateSignature(myData);

  return myData;
};

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
