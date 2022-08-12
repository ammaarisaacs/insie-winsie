import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import useForm from "../hooks/useForm";
import validate from "../validations/validateForm";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: {
    value: "",
    required: true,
    specialCharacters: false,
  },
  lastName: {
    value: "",
    required: true,
  },
  email: {
    value: "",
    required: true,
    email: true,
    maxLength: 100,
  },
  cellphone: {
    value: "",
    required: true,
    // numeric: true,
    maxLength: 20,
  },
  street: {
    value: "",
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  area: {
    value: "",
    required: true,
  },
  city: {
    value: "",
    required: true,
    minLength: 1,
    maxLength: 50,
  },
  province: {
    value: "",
    required: true,
    within: ["NL", "WP", "GT", "LP", "NC", "NW", "FS", "EC"],
    maxLength: 2,
  },
  zipcode: {
    value: "",
    required: true,
    numeric: true,
  },
};

const Context = createContext();
export const useStateContext = () => useContext(Context);
export const StateContext = ({ children }) => {
  const [orderQty, setOrderQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useLocalStorage("total price", 0);
  const [totalQty, setTotalQty] = useLocalStorage("total quantity", 0);
  const [cartItems, setCartItems] = useLocalStorage("shopping cart", []);
  const [shippingRate, setShippingRate] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const shippingForm = useForm(initialState, validate);
  const billingForm = useForm(initialState, validate);
  const navigate = useNavigate();

  let foundCartItem;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

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
    const { id, price, stock_qty } = product;
    const productIsInCart = cartItems.find((item) => item.product.id === id);
    const cartOrderQty = productIsInCart?.orderQty;
    if (stock_qty < cartOrderQty + orderQty) {
      showToast("Not enough stock");
      return;
    }
    if (stock_qty < 1) {
      showToast("Out of stock");
      return;
    }
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
    showToast("Added to cart successfully!");
  };

  const handleBuyNow = (product) => {
    const { stock_qty } = product;
    if (stock_qty < 1) {
      showToast("Out of stock");
      return;
    }
    addToCart(product);
    navigate("../checkout");
  };

  const incQty = (maxStock) => {
    setOrderQuantity((prevQ) => {
      if (prevQ + 1 > maxStock) return prevQ;
      return prevQ + 1;
    });
  };

  const decQty = () => {
    setOrderQuantity((prevQ) => {
      if (prevQ - 1 < 1) return 1;
      return prevQ - 1;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQty(0);
    setTotalQty(0);
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
        shippingRate,
        setShippingRate,
        toastMessage,
        showToast,
        clearCart,
        shippingForm,
        billingForm,
        handleBuyNow,
      }}
    >
      {children}
    </Context.Provider>
  );
};
