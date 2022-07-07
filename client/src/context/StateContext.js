import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Context = createContext();

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [orderQty, setOrderQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useLocalStorage("total price", 0);
  const [totalQty, setTotalQty] = useLocalStorage("total quantity", 0);
  const [cartItems, setCartItems] = useLocalStorage("shopping cart", []);
  const [shippingData, setShippingData] = useState({
    firstname: "",
    lastname: "",
    cellphone: "",
    email: "",
    street: "",
    area: "",
    city: "",
    province: "",
    zipcode: "",
  });
  const [shippingRate, setShippingRate] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  let foundCartItem;

  const removeCartItem = (id) => {
    foundCartItem = cartItems.find((item) => item.product.id === id);

    const { product, orderQty } = foundCartItem;
    const { price } = product;

    const filteredCartItems = cartItems.filter(
      (item) => item.product.id !== id
    );

    // either use reduce to get all the quantities and prices

    setCartItems(filteredCartItems);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - price * orderQty);

    setTotalQty((prevTotalQty) => prevTotalQty - orderQty);
  };

  const updateCartQty = (id, change) => {
    foundCartItem = cartItems.find((item) => item.product.id === id);

    const { orderQty, product } = foundCartItem;
    const { stock_qty, price } = product;

    if (change === "inc" && orderQty < stock_qty) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === id
            ? { ...item, orderQty: item.orderQty + 1 }
            : item
        )
      );

      setTotalQty((prevTotalQty) => prevTotalQty + 1);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
    } else if (change === "dec" && orderQty > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === id
            ? { ...item, orderQty: item.orderQty - 1 }
            : item
        )
      );

      setTotalQty((prevTotalQty) => prevTotalQty - 1);

      setTotalPrice((prevTotalPrice) => prevTotalPrice - price);
    }
  };

  const addToCart = (product) => {
    const { id, price } = product;

    const productIsInCart = cartItems.find((item) => item.product.id === id);

    // if (product.stock_qty < totalQty) return

    setTotalPrice((prevTotalPrice) => prevTotalPrice + price * orderQty);

    setTotalQty((prevTotalQty) => prevTotalQty + orderQty);

    setOrderQuantity(1);

    if (productIsInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.product.id === product.id) {
          return { ...cartItem, orderQty: cartItem.orderQty + orderQty };
        } else {
          return cartItem;
        }
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => {
        return [...prevCartItems, { product, orderQty }];
      });
    }
  };

  const incQty = (maxStock) => {
    setOrderQuantity((prevQ) => {
      if (prevQ + 1 > maxStock) return maxStock;
      return prevQ + 1;
    });
  };

  const decQty = () => {
    setOrderQuantity((prevQ) => {
      if (prevQ - 1 < 1) return 1;
      return prevQ - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalPrice,
        orderQty,
        incQty,
        decQty,
        addToCart,
        totalQty,
        setTotalQty,
        updateCartQty,
        removeCartItem,
        shippingData,
        setShippingData,
        shippingRate,
        setShippingRate,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </Context.Provider>
  );
};
