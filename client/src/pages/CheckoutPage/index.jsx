import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./ordersummary.module.css";
import ShippingForm from "./ShippingForm";
import { sendOrderData } from "../../services/OrderService";
import validate from "../../validations/validatePaymentData";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import OrderSummary from "./OrderSummary";

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
  const ref = useRef();

  const getPaymentData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await sendOrderData(orderData);
      setPayData(data);
    } catch (error) {
      navigate("../error");
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
    <motion.main
      className={styles.order_summary_container}
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, type: "tween" },
      }}
      exit={{
        opacity: 0,
        x: 100,
        transition: { duration: 0.8, type: "tween" },
      }}
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
          cartItems={cartItems}
          totalPrice={totalPrice}
          setShippingRate={setShippingRate}
          shippingForm={shippingForm}
          billingForm={billingForm}
          payData={payData}
          ref={ref}
        />
      </div>
    </motion.main>
  );
};

export default CheckoutPage;
