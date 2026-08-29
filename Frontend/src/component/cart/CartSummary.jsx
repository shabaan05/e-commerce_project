import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/formatPrice";

const SHIPPING_COST = 0;

const CartSummary = ({ subtotal, itemCount }) => {
  const total = subtotal + SHIPPING_COST;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Items ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {SHIPPING_COST === 0 ? "Free" : formatPrice(SHIPPING_COST)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <Link to="/checkout" className="block">
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-lg shadow-sm transition duration-300"
          >
            Proceed to Checkout
          </button>
        </Link>

        <Link
          to="/shop"
          className="block w-full text-center text-sm font-medium text-gray-600 hover:text-blue-600 transition py-2"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 text-xs text-gray-500 space-y-1">
        <p className="font-medium text-gray-700">Shipping Information</p>
        <p>Free standard delivery on all orders.</p>
        <p>Estimated delivery: 3–7 business days.</p>
      </div>
    </div>
  );
};

export default CartSummary;
