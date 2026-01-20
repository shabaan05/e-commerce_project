// context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

// 1️⃣ Create Context
const CartContext = createContext();

// 2️⃣ Provider component
export const CartProvider = ({ children }) => {

//....
const [cartItems, setCartItems] = useState(() => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
});
useEffect(() => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}, [cartItems]);
 const [shippingAddress, setShippingAddress] = useState(() => {
  const storedAddress = localStorage.getItem("shippingAddress");
  return storedAddress ? JSON.parse(storedAddress) : null;
});

useEffect(() => {
  if (shippingAddress) {
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(shippingAddress)
    );
  }
}, [shippingAddress]);

const clearCart = () => {
  setCartItems([]);
  setShippingAddress(null);
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
};

//...

  // Add item to cart
  const addToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQty = (id, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: qty } : item
      )
    );
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, subtotal ,shippingAddress,
    setShippingAddress,
    clearCart,}}
    >
      {children}
    </CartContext.Provider>
  );
};

// 3️⃣ Custom hook for easy use
export const useCart = () => useContext(CartContext);
