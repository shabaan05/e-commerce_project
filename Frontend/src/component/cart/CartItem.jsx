import { Link } from "react-router-dom";
import { formatPrice } from "../../lib/formatPrice";

const CartItem = ({ item, removeItem, updateQty }) => {
  const imageSrc =
    item.image || item.images?.[0] || "/placeholder.png";

  const handleDecrease = () => {
    if (item.qty > 1) {
      updateQty(item.id, item.qty - 1);
    }
  };

  const handleIncrease = () => {
    updateQty(item.id, item.qty + 1);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 border-b border-gray-100 last:border-b-0">
      <Link
        to={`/product/${item.id}`}
        className="shrink-0 w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
      >
        <img
          src={imageSrc}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <Link
            to={`/product/${item.id}`}
            className="text-lg font-medium text-gray-900 hover:text-blue-600 transition line-clamp-2"
          >
            {item.name}
          </Link>
          <p className="text-sm text-gray-500">
            Unit price: {formatPrice(item.price)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={item.qty <= 1}
              className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-10 text-center text-sm font-medium text-gray-900">
              {item.qty}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <p className="text-lg font-semibold text-blue-600 min-w-[90px] text-right">
            {formatPrice(item.price * item.qty)}
          </p>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
