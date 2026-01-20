import React from "react";
import { Link } from "react-router-dom";

const CartSummary = ({ subtotal }) => (
  <div className="cart-summary">
    <h3>Subtotal: ₹{subtotal}</h3>

    <Link to="/checkout">
      <button className="mt-3 px-4 py-2 bg-black text-white rounded">
        Checkout
      </button>
    </Link>
  </div>
);

export default CartSummary;
