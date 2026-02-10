import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import CheckoutActions from "./CheckoutActions";

const OrderSummary = () => {
  const { cartItems, subtotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="border p-4">
      <h3 className="text-lg font-semibold mb-4">
        Order Summary
      </h3>

      {/* Items */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between mb-2"
        >
          <span>
            {item.name} × {item.qty}
          </span>
          <span>₹{item.price * item.qty}</span>
        </div>
      ))}

      <hr className="my-3" />

      {/* Price breakdown */}
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Shipping</span>
        <span>₹0</span>
      </div>

      <div className="flex justify-between font-bold mt-2">
        <span>Total</span>
        <span>₹{subtotal}</span>
      </div>

      {/* Action */}
      <CheckoutActions />
    </div>
  );
};

export default OrderSummary;
