import styles from "./cart.module.css";
import { useStateContext } from "../../context/StateContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// animation ideas
// shopping cart header must come in one letter at a time
// line between heading and table must be drawn accross slowly
// all other words must fade in slowly
// svg splashes that morph when either hovered or pressed on for quantity selector and remove

const Cart = () => {
  const { cartItems, totalPrice, totalQty, updateCartQty, removeCartItem } =
    useStateContext();

  return (
    <div className={styles.cart_container}>
      {cartItems.length > 0 ? (
        <>
          <p>total items: {totalQty}</p>
          {cartItems.map((item, i) => {
            return (
              <motion.div
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
                className={styles.cart_item_container}
                key={item.product.id}
              >
                <div className={styles.cart_item}>
                  <img src={item.product.url} alt="product" />
                  <div className={styles.cart_item_details}>
                    <p>{item.product.name}</p>
                    <p>{item.product.price}</p>
                  </div>
                </div>

                <div className={styles.quantity_container}>
                  <button
                    className={styles.decrement_button}
                    onClick={() => updateCartQty(item.product.id, "dec")}
                  >
                    -
                  </button>
                  <div className={styles.quantity}>{item.orderQty}</div>
                  <button
                    className={styles.increment_button}
                    onClick={() => updateCartQty(item.product.id, "inc")}
                  >
                    +
                  </button>
                </div>

                <div className={styles.total_price_container}>
                  {item.product.price * item.orderQty}
                </div>

                <button
                  className={styles.remove_button}
                  onClick={() => removeCartItem(item.product.id)}
                >
                  <svg
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="25" cy="25" r="24.5" />
                    <path d="M10.8933 11L38.8933 39" stroke-linecap="round" />
                    <path d="M10.8933 39L38.8933 11" stroke-linecap="round" />
                  </svg>
                </button>
              </motion.div>
            );
          })}
          <div className={styles.totals_container}>
            <p className={styles.subtotal}>subtotal</p>
            <p className={styles.total_price}>{totalPrice}</p>
          </div>
        </>
      ) : (
        <div className={styles.no_cart_container}>
          <h4 className={styles.no_cart_message}>No Products in Cart</h4>
          <Link to="/products">
            <button className={styles.continue_shopping}>
              Continue Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
