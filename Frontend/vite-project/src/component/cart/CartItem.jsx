// components/cart/CartItem.jsx
import React from "react";

const CartItem = ({ item, removeItem, updateQty }) => (
  <div className="cart-item">
    <p>{item.name}</p>
    <input
      type="number"
      value={item.qty}
      min="1"
      onChange={(e) => updateQty(item.id, +e.target.value)}
    />
    <p>₹{item.price * item.qty}</p>
    <button onClick={() => removeItem(item.id)}>Remove</button>
  </div>
);

export default CartItem;
