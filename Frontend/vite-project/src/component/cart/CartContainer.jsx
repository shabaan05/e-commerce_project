// components/cart/CartContainer.jsx
import React from "react";
import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import { useCart } from "../../context/CartContext";

const CartContainer = () => {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      <CartItemList
        items={cartItems}
        removeItem={removeFromCart}
        updateQty={updateQty}
      />
      <CartSummary subtotal={subtotal} />
    </div>
  );
};

export default CartContainer;
