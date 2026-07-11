import { createContext, useState, useEffect } from "react";

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [method, setMethod] = useState(() => {
    return localStorage.getItem("paymentMethod") || "";
  });

  const [status, setStatus] = useState(() => {
    return localStorage.getItem("paymentStatus") || "";
  });

  useEffect(() => {
    localStorage.setItem("paymentMethod", method);
  }, [method]);

  useEffect(() => {
    localStorage.setItem("paymentStatus", status);
  }, [status]);

  return (
    <PaymentContext.Provider
      value={{ method, setMethod, status, setStatus }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
