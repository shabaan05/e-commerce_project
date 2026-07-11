// components/cart/CartItem.jsx
import React from "react";

const CartItem = ({ item, removeItem, updateQty }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-200 py-6">

    {/* Left Section - Name + Price */}
    <div className="space-y-1">
      <h3 className="text-lg font-medium text-gray-900">
        {item.name}
      </h3>
      <p className="text-sm text-gray-500">
        ₹{item.price}
      </p>
    </div>

    {/* Quantity Input */}
    <div className="flex items-center gap-4">
      <input
        type="number"
        value={item.qty}
        min="1"
        onChange={(e) => updateQty(item.id, +e.target.value)}
        className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      {/* Item Total */}
      <p className="text-lg font-semibold text-blue-600 min-w-[80px] text-right">
        ₹{item.price * item.qty}
      </p>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id)}
        className="text-sm font-medium text-red-600 hover:text-red-700 transition"
      >
        Remove
      </button>
    </div>

  </div>
);


export default CartItem;
