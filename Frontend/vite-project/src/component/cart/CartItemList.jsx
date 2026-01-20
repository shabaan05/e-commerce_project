// components/cart/CartItemList.jsx
import React from "react";
import CartItem from "./CartItem";

const CartItemList = ({ items, removeItem, updateQty }) => (
  <div>
    {items.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeItem={removeItem}
          updateQty={updateQty}
        />
      ))
    )}
  </div>
);

export default CartItemList;
