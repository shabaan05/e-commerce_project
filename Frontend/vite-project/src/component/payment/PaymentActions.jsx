// import { useContext } from "react";
// import { PaymentContext } from "../../context/PaymentContext";
// import { createPaymentOrder } from "../../services/paymentService";
// import { useCart } from "../../context/CartContext";
// import api from "../../services/api";


import { useContext } from "react";
import { PaymentContext } from "../../context/PaymentContext";
import { createPaymentOrder } from "../../services/paymentService";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
const PaymentActions = () => {
  const { method, setStatus } = useContext(PaymentContext);
  const { subtotal, cartItems,clearCart } = useCart();
  const navigate = useNavigate();


  const handlePayNow = async () => {
    // if (!method) {
    //   alert("Please select a payment method!");
    //   return;
    // }
if (!cartItems.length || subtotal <= 0) {
  alert("Your cart is empty.");
  return;
}

    try {
      console.log("Cart Items:", cartItems);

      // 1️⃣ Create DB order first
      const orderRes = await api.post("/payment/create-db-order", {

items: cartItems.map(item => ({
  product: item.id,      // ✅ correct field
  quantity: item.qty,    // ✅ correct field
  price: item.price
}))

,

        totalAmount: subtotal,
        // userId: user._id
      });

      const dbOrderId = orderRes.data._id;

      // 2️⃣ Create Razorpay order
      const data = await createPaymentOrder(subtotal);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "My Store",
        description: "Order Payment",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            const verifyResponse = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: dbOrderId
            });

            // if (verifyResponse.data.success) {
            //   alert("Payment Verified Successfully");
            // } else {
            //   alert("Payment Verification Failed");
            // }

            //..
            if (verifyResponse.data.success) {
  clearCart();                 // optional but recommended
  navigate("/order-success");  // redirect
} else {
  navigate("/order-failure");
}


          } catch (error) {
            console.error(error);
            alert("Verification Error");
          }
        }
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
