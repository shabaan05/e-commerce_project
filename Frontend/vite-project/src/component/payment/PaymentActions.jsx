import { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";

const PaymentActions = () => {
  const { method, setStatus } = useContext(PaymentContext);

  const handlePayNow = () => {
    if (!method) {
      alert("Please select a payment method!");
      return;
    }

    // Simulate payment success/failure
    const success = Math.random() > 0.3;
    setStatus(success ? "Success" : "Failed");
  };

  return (
    <button
      onClick={handlePayNow}
      className="mt-4 px-6 py-2 bg-green-600 text-white rounded"
    >
      Pay Now
    </button>
  );
};

export default PaymentActions;
