import { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";

const PaymentStatus = () => {
  const { status } = useContext(PaymentContext);

  if (!status) return null;

  return (
    <div className={`mt-4 p-2 rounded ${
      status === "Success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
    }`}>
      Payment {status}
    </div>
  );
};

export default PaymentStatus;
