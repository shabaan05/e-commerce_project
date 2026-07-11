import { useState } from "react";
import { createPaymentOrder } from "../../services/paymentService";
import Spinner from "../skeletons/Spinner";

const PaymentAction = ({ totalAmount }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      // 1️⃣ Create order in backend
      const data = await createPaymentOrder(totalAmount);

      const { orderId, amount, currency } = data;

      // 2️⃣ Open Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "My Store",
        description: "Order Payment",
        order_id: orderId,

        handler: function (response) {
          console.log("Payment Success:", response);
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error("Payment error:", error);
      alert("Unable to start payment");
    } finally {
      setLoading(false);
    }
  };

 return (
  <button
    onClick={handlePayment}
    disabled={loading}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
  >
    {loading ? (
      <>
        <Spinner size="sm" color="border-white" />
        Processing…
      </>
    ) : (
      "Proceed to Payment"
    )}
  </button>
);

};

export default PaymentAction;
