import { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";
import { createPaymentOrder } from "../../services/paymentService";
import { useCart } from "../../context/CartContext";
import api from "../../services/api";
const PaymentActions = ({ totalAmount }) => {
  const { method, setStatus } = useContext(PaymentContext);
const {subtotal} = useCart("0");


  const handlePayNow = async () => {
    if (!method) {
      alert("Please select a payment method!");
      return;
    }

    try {
      // console.log("Total Amount:", totalAmount);

      const data = await createPaymentOrder(subtotal);
      console.log("Backend Response:", data);


      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        // key:"rzp_test_SE4f69uswOPqhE",
        amount: data.amount,
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.orderId,

        // handler: function (response) {
        //   console.log("Payment Success:", response);
        //   setStatus("Success");
        // },
        handler: async function (response) {
  try {
    const verifyResponse = await api.post("/payment/verify-payment", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature
    });

    if (verifyResponse.data.success) {
      alert("Payment Verified Successfully");
    } else {
      alert("Payment Verification Failed");
    }

  } catch (error) {
    console.error(error);
    alert("Verification Error");
  }
},

      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error(error);
      setStatus("Failed");
    }
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
