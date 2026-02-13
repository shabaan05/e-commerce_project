import { createPaymentOrder } from "../../services/paymentService";

const PaymentAction = ({ totalAmount }) => {

  const handlePayment = async () => {
    try {
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
          /*
            response contains:
            - razorpay_payment_id
            - razorpay_order_id
            - razorpay_signature
          */
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
    }
  };

 return (
  <button
    onClick={handlePayment}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition duration-300"
  >
    Proceed to Payment
  </button>
);

};

export default PaymentAction;
