import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/formatPrice";
import PaymentActions from "../payment/PaymentActions";

const SHIPPING_COST = 0;

const OrderSummary = () => {
  const { cartItems, subtotal } = useCart();
  const total = subtotal + SHIPPING_COST;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>

      <div className="space-y-3 text-sm max-h-64 overflow-y-auto pr-1">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-4 text-gray-600"
          >
            <span className="line-clamp-2">
              {item.name} × {item.qty}
            </span>
            <span className="shrink-0">
              {formatPrice(item.price * item.qty)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{SHIPPING_COST === 0 ? "Free" : formatPrice(SHIPPING_COST)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span className="text-blue-600">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="pt-2">
        <PaymentActions />
      </div>
    </div>
  );
};

export default OrderSummary;
