import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [orderQty, setOrderQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  // will display totalQty in cart emblem

  let foundCartItem;

  const removeCartItem = (id) => {
    foundCartItem = cartItems.find((item) => item.product.id === id);
    const filteredCartItems = cartItems.filter(
      (item) => item.product.id !== id
    );
    // either use reduce to get all the quantities and prices

    setCartItems(filteredCartItems);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundCartItem.product.price * foundCartItem.orderQty
    );

    setTotalQty((prevTotalQty) => prevTotalQty - foundCartItem.orderQty);
  };

  const updateCartQty = (id, change) => {
    foundCartItem = cartItems.find((item) => item.product.id === id);

    if (
      change === "inc" &&
      foundCartItem.orderQty < foundCartItem.product.stockQty
    ) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === id
            ? { ...item, orderQty: item.orderQty + 1 }
            : item
        )
      );
      setTotalQty((prevTotalQty) => prevTotalQty + 1);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + foundCartItem.product.price
      );
    } else if (change === "dec" && foundCartItem.orderQty > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === id
            ? { ...item, orderQty: item.orderQty - 1 }
            : item
        )
      );
      setTotalQty((prevTotalQty) => prevTotalQty - 1);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice - foundCartItem.product.price
      );
    }
  };

  const addToCart = (product) => {
    const productIsInCart = cartItems.find(
      (item) => item.product.id === product.id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * orderQty
    );

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
