import CartItemList from "./CartItemList";
import CartSummary from "./CartSummary";
import ShippingAddressSection from "../checkout/ShippingAddressSection";
import { useCart } from "../../context/CartContext";

const CartContainer = () => {
  const { cartItems, removeFromCart, updateQty, subtotal } = useCart();
  const itemCount = cartItems.reduce((count, item) => count + item.qty, 0);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="bg-gray-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">Shopping Cart</h1>
          {!isEmpty && (
            <p className="text-sm text-gray-500">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
              <CartItemList
                items={cartItems}
                removeItem={removeFromCart}
                updateQty={updateQty}
              />
            </div>

            {!isEmpty && <ShippingAddressSection compact />}
          </div>

          {!isEmpty && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 h-fit xl:sticky xl:top-24">
              <CartSummary subtotal={subtotal} itemCount={itemCount} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
