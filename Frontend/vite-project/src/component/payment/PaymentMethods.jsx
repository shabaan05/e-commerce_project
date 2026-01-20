import { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";

const PaymentMethods = () => {
  const { method, setMethod } = useContext(PaymentContext);

  const handleSelect = (m) => setMethod(m);

  return (
    <div className="flex gap-4">
      {["COD", "Card", "UPI"].map((m) => (
        <button
          key={m}
          onClick={() => handleSelect(m)}
          className={`px-4 py-2 border rounded ${
            method === m ? "bg-black text-white" : ""
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
};

export default PaymentMethods;

