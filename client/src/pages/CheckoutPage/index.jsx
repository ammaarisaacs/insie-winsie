import { useState } from "react";
import styles from "./ordersummary.module.css";
import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import { useStateContext } from "../../context/StateContext";
import { sendOrderData } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const {
    cartItems,
    totalPrice,
    shippingRate,
    setShippingRate,
    shippingForm,
    billingForm,
  } = useStateContext();

  const [notClickable, setNotClickable] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [payData, setPayData] = useState({});
  const [paymentErrors, setPaymentErrors] = useState(null);
  const navigate = useNavigate();

  const getPaymentData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await sendOrderData(orderData);
      setPayData(data);
    } catch (error) {
      navigate("../error");
    }
  };

  return (
    <motion.main
      className={styles.order_summary_container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "tween" }}
    >
      <div className={styles.layout_container}>
        <ShippingForm
          setNotClickable={setNotClickable}
          setOrderData={setOrderData}
          orderData={orderData}
          cartItems={cartItems}
          totalPrice={totalPrice}
          shippingForm={shippingForm}
          billingForm={billingForm}
          setShippingRate={setShippingRate}
        />
        <OrderSummary
          notClickable={notClickable}
          getPaymentData={getPaymentData}
          shippingRate={shippingRate}
          paymentErrors={paymentErrors}
          setPaymentErrors={setPaymentErrors}
          cartItems={cartItems}
          totalPrice={totalPrice}
          setShippingRate={setShippingRate}
          shippingForm={shippingForm}
          billingForm={billingForm}
          orderData={orderData}
          payData={payData}
        />
      </div>
    </motion.main>
  );
};

export default CheckoutPage;
