import { useState, useEffect } from "react";
import { useStateContext } from "../../context/StateContext";
import { motion } from "framer-motion";
import styles from "./ordersummary.module.css";
import ShippingForm from "../ShippingForm/ShippingForm";

{
  /* combine the order data with the shipping data */
}

{
  /* work through payfast */
}
{
  /* if payfast is all clear, send through to checkout api */
}
{
  /* this will then be stored in a database as a payment data */
}

const OrderSummary = () => {
  const [responseMesssage, setResponseMesssage] = useState("");
  // const [tax, setTax] = useState(0);

  const {
    cartItems,
    totalPrice,
    shippingData,
    setShippingData,
    shippingRate,
    setShippingRate,
  } = useStateContext();

  return (
    <div className={styles.order_summary_container}>
      <div className={styles.layout_container}>
        <ShippingForm
          setShippingData={setShippingData}
          shippingData={shippingData}
          setResponseMesssage={setResponseMesssage}
          setShippingRate={setShippingRate}
        />

        <div className={styles.order_items_container}>
          <h4>Order Summary</h4>
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
                <p>{`R ${item.product.price}`}</p>
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
              <div className={styles.totals_container}>
                <p className={styles.subtotal}>{indicator[0]}</p>
                <p className={styles.total_price}>
                  {indicator[1] ? `R ${indicator[1].toFixed(2)}` : "-"}
                </p>
              </div>
            );
          })}
          <hr />

          {/* only make this clickable if area or city is supported */}

          <form
            action="https://sandbox.payfast.co.za​/eng/process"
            method="post"
          >
            <input type="hidden" name="merchant_id" value="10000100" />
            <input type="hidden" name="merchant_key" value="46f0cd694581a" />
            <input
              type="hidden"
              name="amount"
              value={(totalPrice + shippingRate).toFixed(2)}
            />
            <input type="hidden" name="item_name" value="#00001" />
            <button className={styles.pay_now} type="submit">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

// fill in info
// send data to backend
// area and city checked through db
// need to send something back if not found
