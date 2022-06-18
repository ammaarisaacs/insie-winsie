import { useState } from "react";
import styles from "../../dashboard.module.css";

const ProductDescription = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <>
      <div
        onPointerEnter={() => {
          setShowDescription(true);
        }}
        onPointerLeave={() => {
          setShowDescription(false);
        }}
        className={showDescription ? styles.show : styles.hide}
      >
        {product.description}
      </div>
    </>
  );
};

export default ProductDescription;
