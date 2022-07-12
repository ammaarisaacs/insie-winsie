import styles from "./cart.module.css";
import { useStateContext } from "../../context/StateContext";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// animation ideas
// shopping cart header must come in one letter at a time
// line between heading and table must be drawn accross slowly
// all other words must fade in slowly
// svg splashes that morph when either hovered or pressed on for quantity selector and remove

const Cart = () => {
  const { cartItems, totalPrice, totalQty, updateCartQty, removeCartItem } =
    useStateContext();

  return (
    <motion.div
      layout
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
      className={styles.cart_container}
    >
      {cartItems.length > 0 ? (
        <>
          <p>total items: {totalQty}</p>
          <AnimatePresence>
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
                  exit={{
                    opacity: 0,
                    y: -100,
                    transition: { duration: 0.5 },
                  }}
                  className={styles.cart_item_container}
                  key={item.product.id}
                >
                  <div className={styles.cart_item}>
                    <img
                      src={`http://localhost:5000/static/${item.product.media[0].file_name}`}
                      alt="product"
                    />
                    <div className={styles.cart_item_details}>
                      <p>{item.product.name}</p>
                      <p>{`R ${item.product.price.toFixed(2)}`}</p>
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
                    {`R ${(item.product.price * item.orderQty).toFixed(2)}`}
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
                      <path d="M10.8933 11L38.8933 39" />
                      <path d="M10.8933 39L38.8933 11" />
                    </svg>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div className={styles.totals_container}>
            <p className={styles.subtotal}>subtotal</p>
            <p className={styles.total_price}>{`R ${totalPrice.toFixed(2)}`}</p>
          </div>
        </>
      ) : (
        <div className={styles.no_cart_container}>
          <div
            style={{
              height: "fit-content",
              overflow: "hidden",
              marginBottom: "1rem",
            }}
          >
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              No products in cart
            </motion.p>
          </div>
          <Link to="/products">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              className={styles.continue_shopping}
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
