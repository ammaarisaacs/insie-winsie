import { Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../dashboard.module.css";

const ProductsDashboard = () => {
  return (
    <>
      <div className={styles.product_dashboard_heading_container}>
        <motion.div
          // whileHover={{ backgroundColor: "rgb(49, 141, 191)" }}
          onTap={{ backgroundColor: "rgb(49, 141, 191)" }}
        >
          <Link to="">View Products</Link>
        </motion.div>
        <motion.div
          // whileHover={{ backgroundColor: "rgb(49, 141, 191)" }}
          onTap={{ backgroundColor: "rgb(49, 141, 191)" }}
        >
          <Link to="create">Add a product</Link>
        </motion.div>
        <motion.div
          whileHover={{ backgroundColor: "rgb(49, 141, 191)" }}
          onTap={{ backgroundColor: "rgb(49, 141, 191)" }}
        >
          <Link to="update">Update a product</Link>
        </motion.div>
        <motion.div
          whileHover={{ backgroundColor: "rgb(49, 141, 191)" }}
          onTap={{ backgroundColor: "rgb(49, 141, 191)" }}
        >
          <Link to="delete">Delete a product</Link>
        </motion.div>
      </div>

      <Outlet />
    </>
  );
};

export default ProductsDashboard;
