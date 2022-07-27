import React from "react";
import styles from "./cartitem.module.css";
import { randify } from "../../../utils/costing";
import { motion } from "framer-motion";
import { useStateContext } from "../../../context/StateContext";

const staticUrl = "http://localhost:5000/static/";

const CartItem = ({ item, i }) => {
  const { updateCartQty, removeCartItem } = useStateContext();
  const { product, orderQty } = item;
  const { id, name, price, media } = product;
  const fileName = media[0].file_name;
  const alt_text = media[0].alt_text;

  return (
    <motion.article
      layout
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: i * 0.2,
          duration: 0.8,
        },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8 },
      }}
      className={styles.cart_item_container}
    >
      <article className={styles.cart_item}>
        <img src={`${staticUrl}${fileName}`} alt={alt_text} />
        <ul className={styles.cart_item_details}>
          <li>{name}</li>
          <li>{randify(price)}</li>
        </ul>
      </article>

      <div className={styles.quantity_container}>
        <button
          className={styles.decrement_button}
          onClick={() => updateCartQty(id, "dec")}
        >
          -
        </button>
        <div className={styles.quantity}>{orderQty}</div>
        <button
          className={styles.increment_button}
          onClick={() => updateCartQty(id, "inc")}
        >
          +
        </button>
      </div>

      <div className={styles.total_price_container}>
        {randify(price * orderQty)}
      </div>

      <button
        className={styles.remove_button}
        onClick={() => removeCartItem(id)}
      >
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.8933 11L38.8933 39" />
          <path d="M10.8933 39L38.8933 11" />
        </svg>
      </button>
    </motion.article>
  );
};

export default CartItem;
