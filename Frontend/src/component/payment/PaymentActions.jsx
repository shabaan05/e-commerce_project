import { useContext, useState } from "react";
import { PaymentContext } from "../../context/PaymentContext";
import { createPaymentOrder } from "../../services/paymentService";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Spinner from "../skeletons/Spinner";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const PaymentActions = () => {
  const { setStatus } = useContext(PaymentContext);
  const { subtotal, cartItems, clearCart, shippingAddress } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    if (!cartItems.length || subtotal <= 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!shippingAddress) {
      alert("Please select or add a shipping address before paying.");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay checkout failed to load. Please refresh and try again.");
      return;
    }

    try {
      setLoading(true);

      const orderRes = await api.post("/payment/create-db-order", {
        items: cartItems.map((item) => ({
          product: item.id,
          quantity: item.qty,
          price: item.price,
        })),
        totalAmount: subtotal,
        shippingAddress,
      });

      const dbOrderId = orderRes.data._id;
      const razorpayOrder = await createPaymentOrder(subtotal);

      const razorpayKey =
        razorpayOrder.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        throw new Error(
          "Razorpay key is missing. Configure VITE_RAZORPAY_KEY_ID or backend RAZORPAY_KEY_ID."
        );
      }

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "ShopCart",
        description: "Order Payment",
        order_id: razorpayOrder.orderId,
        prefill: {
          name: user?.name || shippingAddress.fullName || "",
          email: user?.email || "",
          contact: shippingAddress.phone || "",
        },
        theme: {
          color: "#2563eb",
        },
        handler: async function (response) {
          try {
            const verifyResponse = await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: dbOrderId,
            });

            if (verifyResponse.data.success) {
              clearCart();
              navigate("/order-success");
            } else {
              navigate("/order-failure");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert(getErrorMessage(error, "Payment verification failed."));
            navigate("/order-failure");
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("Cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Razorpay payment failed:", response.error);
        alert(
          response.error?.description ||
            "Test payment failed. Please try again."
        );
        setStatus("Failed");
        navigate("/order-failure");
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setStatus("Failed");
      alert(getErrorMessage(error, "Unable to start payment. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayNow}
      disabled={loading}
      className="w-full mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-70 flex items-center justify-center gap-2 transition"
    >
      {loading ? (
        <>
          <Spinner size="sm" color="border-white" />
          Processing…
        </>
      ) : (
        "Pay Now"
      )}
    </button>
  );
};

export default PaymentActions;
