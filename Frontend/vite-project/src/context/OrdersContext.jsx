import React, { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create Context
const OrdersContext = createContext();

// 2️⃣ Provider component
export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem("orders");
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  // Save to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // Optional: function to add new order
  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

// 3️⃣ Custom hook for easy usage
export const useOrders = () => useContext(OrdersContext);
