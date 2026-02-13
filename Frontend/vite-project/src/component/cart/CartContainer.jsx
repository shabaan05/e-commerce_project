// components/cart/CartContainer.jsx
import React from "react";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import { useCart } from "../../context/CartContext";

const CartContainer = () => {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();

return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-6xl mx-auto px-6 space-y-10">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        My Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Cart Items Section */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <CartItemList
            items={cartItems}
            removeItem={removeFromCart}
            updateQty={updateQty}
          />
        </div>

        {/* Cart Summary Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit">
          <CartSummary subtotal={subtotal} />
        </div>

      </div>

    </div>
  </div>
);

};

export default CartContainer;
