import { useStateContext } from "../../context/StateContext";
import styles from "./cart.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { randify } from "../../utils/costing";
import NoCart from "./NoCart/NoCart";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

// line between heading and table must be drawn accross slowly
// all other words must fade in slowly
// svg splashes that morph when either hovered or pressed on for quantity selector and remove
const staticUrl = "http://localhost:5000/static/";

const Cart = () => {
  const { cartItems, totalPrice, totalQty, updateCartQty, removeCartItem } =
    useStateContext();

  return (
    <motion.main
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "tween" }}
      className={styles.cart_container}
    >
      {cartItems.length > 0 ? (
        <>
          <p>total items: {totalQty}</p>
          {cartItems.map((item, i) => {
            const { product, orderQty } = item;
            const { id, name, price, media } = product;
            const fileName = media[0].file_name;
            const alt_text = media[0].alt_text;
            return (
              // <CartItem
              //   item={item}
              //   i={i}
              //   key={item.product.id}
              //   updateCartQty={updateCartQty}
              //   removeCartItem={removeCartItem}
              // />
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
                key={id}
              >
                <div className={styles.cart_item}>
                  <motion.img src={`${staticUrl}${fileName}`} alt={alt_text} />
                  <div className={styles.cart_item_details}>
                    <p>{name}</p>
                    <p>{randify(price)}</p>
                  </div>
                </div>

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
                  <svg
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.8933 11L38.8933 39" />
                    <path d="M10.8933 39L38.8933 11" />
                  </svg>
                </button>
              </motion.article>
            );
          })}
          <div className={styles.totals_container}>
            <p className={styles.subtotal}>subtotal</p>
            <p className={styles.total_price}>{randify(totalPrice)}</p>
          </div>
        </>
      ) : (
        <NoCart />
      )}
    </motion.main>
  );
};

export default Cart;
