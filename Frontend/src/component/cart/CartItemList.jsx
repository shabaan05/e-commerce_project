// components/cart/CartItemList.jsx
import React from "react";
import CartItem from "./CartItem";

const CartItemList = ({ items, removeItem, updateQty }) => (
  <div className="space-y-6">

    {items.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg text-gray-500">
          Your cart is empty
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Add some products to get started.
        </p>
      </div>
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
