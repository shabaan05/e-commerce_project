import { Link } from "react-router-dom";
import CartItem from "./CartItem";

const CartItemList = ({ items, removeItem, updateQty }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          Your cart is empty
        </h2>
        <p className="text-sm text-gray-500 mt-2 max-w-sm">
          Looks like you haven&apos;t added anything yet. Browse our collection
          and find something you love.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="hidden sm:grid grid-cols-[1fr_auto] gap-4 pb-3 border-b border-gray-200 text-xs font-medium uppercase tracking-wide text-gray-500">
        <span>Product</span>
        <span className="text-right pr-24">Subtotal</span>
      </div>

      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          updateQty={updateQty}
        />
      ))}
    </div>
  );
};

export default CartItemList;
