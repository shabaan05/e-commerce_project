import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
// import CheckoutActions from "./CheckoutActions";
import PaymentActions from "../payment/PaymentActions";
const OrderSummary = () => {
  const { cartItems, subtotal } = useCart();
  const navigate = useNavigate();

  return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

    {/* Title */}
    <h3 className="text-xl font-semibold text-gray-900">
      Order Summary
    </h3>

    {/* Items */}
    <div className="space-y-3 text-sm">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between text-gray-600"
        >
          <span>
            {item.name} × {item.qty}
          </span>
          <span>
            ₹{item.price * item.qty}
          </span>
        </div>
      ))}
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200"></div>

    {/* Price Breakdown */}
    <div className="space-y-2 text-sm">

      <div className="flex justify-between text-gray-600">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Shipping</span>
        <span>₹0</span>
      </div>

      <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-semibold text-gray-900">
        <span>Total</span>
        <span className="text-blue-600">₹{subtotal}</span>
      </div>

    </div>

    {/* Payment Action */}
    <div className="pt-2">
      <PaymentActions />
    </div>

  </div>
);


};

export default OrderSummary;
