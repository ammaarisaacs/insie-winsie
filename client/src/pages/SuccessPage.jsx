import { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { sendPaymentId } from "../services/OrderService";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const { clearCart } = useStateContext();
  const { id } = useParams();
  const { data, isPending, error, styling } = useFetch(() => sendPaymentId(id));

  const cardStyle = {
    width: 300,
    margin: "auto",
    border: "1px solid lightgray",
    borderRadius: 30,
    padding: "1rem",
  };

  const {
    order_number,
    first_name,
    last_name,
    email,
    total,
    cellphone,
    products,
  } = data ?? {};

  useEffect(() => {
    clearCart();
  }, []);

  const pageVariants = {
    initial: {},
    animate: {},
    exit: {},
  };

  if (isPending) return <main style={styling}>Loading...</main>;
  if (error) return <main style={styling}>{error}</main>;

  return (
    <motion.main
      style={{
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
        gap: "1rem",
      }}
    >
      <hr />
      <h3>order Summary</h3>
      <p>thank you for your purchase</p>
      <hr />
      <article
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <article style={cardStyle}>
          <h4>shipping</h4>
          <hr />
          <p>{first_name}</p>
          <p>{last_name}</p>
          <p>{email}</p>
          <p>{cellphone}</p>
        </article>

        <article style={cardStyle}>
          <h4>payment</h4>
          <hr />
          <p>{order_number}</p>
          <p>{total}</p>
        </article>

        <article style={cardStyle}>
          <h4>cart</h4>
          <hr />
          <article
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              marginBottom: 5,
            }}
          >
            <p>item</p>
            <p>qty</p>
          </article>
          {products?.map((product) => {
            const { name, order_item } = product;
            const { order_qty } = order_item;
            return (
              <article
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0 1rem",
                  backgroundColor: "#e3e5ed",
                }}
              >
                <p>{name}</p>
                <p>{order_qty}</p>
              </article>
            );
          })}
        </article>
      </article>
    </motion.main>
  );
};

export default SuccessPage;
