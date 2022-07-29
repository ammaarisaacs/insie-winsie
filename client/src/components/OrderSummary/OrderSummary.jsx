import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../context/StateContext";
import { motion } from "framer-motion";
import styles from "./ordersummary.module.css";
import ShippingForm from "../ShippingForm/ShippingForm";
import { randify } from "../../utils/costing";
import { sendOrderData } from "../../services/OrderService";
import validate from "../../validations/validatePaymentData";

const staticUrl = "http://localhost:5000/static/";

const OrderSummary = () => {
  const [notClickable, setNotClickable] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [payData, setPayData] = useState({});
  const [merchantId, setMerchantId] = useState("");
  const [merchantKey, setMerchantKey] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [returnUrl, setReturnUrl] = useState("");
  const [cancelUrl, setCancelUrl] = useState("");
  const [notifyUrl, setNotifyUrl] = useState("");
  const [signature, setSignature] = useState("");

  const ref = useRef();

  const { cartItems, totalPrice, shippingRate, showToast } = useStateContext();

  const validateOrder = async (e) => {
    e.preventDefault();

    try {
      const { data } = await sendOrderData(orderData);
      console.log(data);
      setPayData(data);
      setMerchantId(data.merchant_id);
      setMerchantKey(data.merchant_key);
      setFirstName(data.name_first);
      setLastName(data.name_last);
      setEmail(data.email_address);
      setOrderNumber(data.item_name);
      setAmount(data.amount);
      setSignature(data.signature);
      setReturnUrl(data.return_url);
      setCancelUrl(data.cancel_url);
      setNotifyUrl(data.notify_url);
    } catch (error) {
      showToast(error.response.data);
    }
  };

  useEffect(() => {
    console.log("order data", orderData);
    console.log("pay Data", payData);
    const clientAmount = 500;
    // const clientAmount = (totalPrice + shippingRate).toFixed(2);

    if (Object.keys(orderData).length > 0 && Object.keys(payData).length > 0) {
      const errors = validate(payData, orderData);
      if (Object.keys(errors).length === 0) ref.current.submit();
    }
  }, [amount, signature, payData]);

  return (
    <main className={styles.order_summary_container}>
      <div className={styles.layout_container}>
        <ShippingForm
          setNotClickable={setNotClickable}
          setOrderData={setOrderData}
          orderData={orderData}
          cartItems={cartItems}
          shippingRate={shippingRate}
          totalPrice={totalPrice}
        />

        <div className={styles.order_items_container}>
          <h4>Order Summary</h4>
          <hr />
          {cartItems.map((item, i) => {
            const { product, orderQty } = item;
            const { name, price, media } = product;
            const fileName = media[0].file_name;
            const altText = media[0].alt_text;
            return (
              <motion.article
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: i * 0.2,
                    duration: 0.8,
                  },
                }}
                className={styles.order_item_container}
                key={item.product.id}
              >
                <img src={`${staticUrl}${fileName}`} alt={altText} />
                <p>{name}</p>
                <p>{randify(price * orderQty)}</p>
              </motion.article>
            );
          })}
          <hr />
          {[
            ["subtotal", totalPrice],
            ["shipping", shippingRate],
            ["total", totalPrice + shippingRate],
          ].map((indicator) => {
            return (
              <div className={styles.totals_container} key={indicator[0]}>
                <p className={styles.subtotal}>{indicator[0]}</p>
                <p className={styles.total_price}>
                  {indicator[1] === null ? "-" : randify(indicator[1])}
                </p>
              </div>
            );
          })}
          <hr />
          <form
            ref={ref}
            action="https://sandbox.payfast.co.za/eng/process"
            method="post"
          >
            {Object.keys(payData).length > 0 && (
              <>
                <input type="hidden" name="merchant_id" value={merchantId} />
                <input type="hidden" name="merchant_key" value={merchantKey} />
                <input type="hidden" name="return_url" value={returnUrl} />
                <input type="hidden" name="cancel_url" value={cancelUrl} />
                <input type="hidden" name="notify_url" value={notifyUrl} />
                <input type="hidden" name="name_first" value={firstName} />
                <input type="hidden" name="name_last" value={lastName} />
                <input type="hidden" name="email_address" value={email} />
                <input type="hidden" name="m_payment_id" value="01AB" />
                <input type="hidden" name="amount" value={amount} />
                <input type="hidden" name="item_name" value={orderNumber} />
                <input type="hidden" name="signature" value={signature} />
              </>
            )}
            <motion.button
              initial={{ backgroundColor: "grey" }}
              animate={{
                backgroundColor: notClickable
                  ? "hsl(0, 0%, 93%)"
                  : "hsl(0, 100%, 50%)",
                transition: { duration: 0.5 },
              }}
              whileHover={{ scale: 1.1 }}
              className={styles.pay_now}
              disabled={notClickable}
              onClick={(e) => validateOrder(e)}
              type="submit"
            >
              Pay Now
            </motion.button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default OrderSummary;
