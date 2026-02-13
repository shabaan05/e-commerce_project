import React from "react";
import { Link } from "react-router-dom";


const CartSummary = ({ subtotal }) => (
  <div className="space-y-6">

    {/* Subtotal */}
    <div className="flex justify-between items-center text-lg">
      <span className="text-gray-600">Subtotal</span>
      <span className="font-semibold text-blue-600">
        ₹{subtotal}
      </span>
    </div>

    {/* Divider */}
    <div className="border-t border-gray-200"></div>

    {/* Checkout Button */}
    <Link to="/checkout">
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition duration-300">
        Proceed to Checkout
      </button>
    </Link>

  </div>
);

export default CartSummary;
