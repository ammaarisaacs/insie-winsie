import { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../context/StateContext";
import { motion } from "framer-motion";
import styles from "./ordersummary.module.css";
import ShippingForm from "../ShippingForm/ShippingForm";
import { randify } from "../../utils/costing";
import { sendOrderData } from "../../services/OrderService";
import validate from "../../validations/validatePaymentData";
import { useNavigate } from "react-router-dom";

const staticUrl = "http://localhost:5000/static/";

const OrderSummary = () => {
  const [notClickable, setNotClickable] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [payData, setPayData] = useState({});
  const [paymentErrors, setPaymentErrors] = useState(null);
  const { cartItems, totalPrice, shippingRate } = useStateContext();
  const ref = useRef();
  const navigate = useNavigate();

  const getPaymentData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await sendOrderData(orderData);
      setPayData(data);
    } catch (error) {
      navigate("*");
    }
  };

  useEffect(() => {
    if (Object.keys(orderData).length > 0 && Object.keys(payData).length > 0) {
      const errors = validate(payData, orderData);
      if (Object.keys(errors).length !== 0) {
        setPaymentErrors(errors);
      } else {
        ref.current.submit();
      }
    }
  }, [payData]);

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
            {Object.keys(payData).length > 0 &&
              [
                "merchant_id",
                "merchant_key",
                "return_url",
                "cancel_url",
                "notify_url",
                "name_first",
                "name_last",
                "email_address",
                "m_payment_id",
                "amount",
                "item_name",
                "signature",
              ].map((item) => (
                <input
                  type="hidden"
                  key={item}
                  name={item}
                  value={payData[item]}
                />
              ))}

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
              onClick={(e) => getPaymentData(e)}
              type="submit"
            >
              Pay Now
            </motion.button>
          </form>
          {paymentErrors && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundColor: "red",
                borderRadius: 10,
                marginTop: "1rem",
                padding: "1rem",
                width: "100%",
                color: "white",
              }}
            >
              {Object.values(paymentErrors).map((error) => (
                <p key={error}>{error}</p>
              ))}
              <p>Please contact us for support</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
};

export default OrderSummary;
