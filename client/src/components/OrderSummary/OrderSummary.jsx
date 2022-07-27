import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../context/StateContext";
import { motion } from "framer-motion";
import styles from "./ordersummary.module.css";
import ShippingForm from "../ShippingForm/ShippingForm";
import { randify } from "../../utils/costing";
import { sendOrderData } from "../../services/OrderService";

// const initialPayData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   orderNumber: "",
//   amount: 0,
//   returnUrl: "",
//   cancelUrl: "",
//   notifyUrl: "",
//   signature: "",
// };
// const [payData, setPayData] = useState(initialPayData);

const OrderSummary = () => {
  const [notClickable, setNotClickable] = useState(true);
  const [orderData, setOrderData] = useState({});
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
    const clientAmount = (totalPrice + shippingRate).toFixed(2);

    // expand on this validation
    if (ref.current && amount === clientAmount && signature) {
      ref.current.submit();
    }
  }, [amount, orderNumber, signature]);

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
            return (
              <motion.div
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
                <img
                  src={`http://localhost:5000/static/${item.product.media[0].file_name}`}
                  alt="product"
                />
                <p>{item.product.name}</p>
                <p>{`R ${item.product.price.toFixed(2)}`}</p>
              </motion.div>
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
            <input type="hidden" name="merchant_id" value="10026685" />
            <input type="hidden" name="merchant_key" value="hu59n36aijojn" />
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
