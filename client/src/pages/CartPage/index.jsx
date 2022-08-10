import styles from "./cart.module.css";
import CartItem from "./CartItem/CartItem";
import NoCart from "./NoCart/NoCart";
import { useStateContext } from "../../context/StateContext";
import { randify } from "../../utils/costing";
import { motion } from "framer-motion";

// line between heading and table must be drawn accross slowly
// all other words must fade in slowly
// svg splashes that morph when either hovered or pressed on for quantity selector and remove

const Cart = () => {
  const { cartItems, totalPrice, totalQty } = useStateContext();

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
          {cartItems.map((item, i) => (
            <CartItem item={item} i={i} key={item.product.id} />
          ))}
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
