import { useState, useEffect } from "react";
import { useStateContext } from "../../context/StateContext";
import { motion } from "framer-motion";
import styles from "./ordersummary.module.css";
import ShippingForm from "../ShippingForm/ShippingForm";
import * as api from "../../api";

{
  /* if payfast is all clear, send through to checkout api */
}
{
  /* this will then be stored in a database as a payment data */
}

// const initialOrder = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   cellphone: "",
//   total: "",
//   cart: {},
//   // include delivery charge coming from getshippingrate
//   deliveryAddress: {},
//   billAddress: {},
// };

const OrderSummary = () => {
  const [notClickable, setNotClickable] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [isSame, setIsSame] = useState(true);

  const {
    cartItems,
    totalPrice,
    shippingData,
    setShippingData,
    shippingRate,
    setShippingRate,
    billingData,
    setBillingData,
    showToast,
  } = useStateContext();

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // validate order here

    try {
      const { data } = await api.sendOrderData(orderData);
      // await orderID and give this to payfast
      // this is effectively the "name" of the invoice
      // also get 200 or any code
      // could have an order summary page before paying
      // could have a potentialOrder, only once it is paid, create it in the db

      console.log(data);
      // clear local storage of cart items
      // clear any sensitive info
    } catch (error) {
      showToast(error.response.data);
    }
  };

  useEffect(() => {
    console.log(orderData);
  }, [shippingData, billingData, cartItems, orderData]);

  // useEffect(() => {
  //   const getOrderID = async function (orderData) {
  //     try {
  //       const { data } = await api.createOrderID(orderData);
  //       setOrder(data.id);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getOrderID(orderData);
  // }, []);

  return (
    <div className={styles.order_summary_container}>
      <div className={styles.layout_container}>
        <ShippingForm
          setShippingData={setShippingData}
          shippingData={shippingData}
          setShippingRate={setShippingRate}
          setNotClickable={setNotClickable}
          setIsSame={setIsSame}
          isSame={isSame}
          billingData={billingData}
          setBillingData={setBillingData}
          setOrderData={setOrderData}
          orderData={orderData}
          api={api}
          cartItems={cartItems}
          shippingRate={shippingRate}
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
                  {indicator[1] === null ? "-" : indicator[1].toFixed(2)}
                </p>
              </div>
            );
          })}
          <hr />

          <form
            action="https://sandbox.payfast.co.za​/eng/process"
            method="post"
          >
            <input type="hidden" name="merchant_id" value="10000100" />
            <input type="hidden" name="merchant_key" value="46f0cd694581a" />
            <input
              type="hidden"
              name="amount"
              // value={(totalPrice + shippingRate).toFixed(2)}
            />
            <input type="hidden" name="item_name" value="#00001" />
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
              onClick={(e) => handleOrderSubmit(e)}
              type="submit"
            >
              Pay Now
            </motion.button>
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
