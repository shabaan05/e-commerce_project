import { useCart } from "../../context/CartContext";

const OrderSummary = () => {
  const { cartItems, subtotal } = useCart();

  return (
    <div className="border p-4 rounded">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between text-sm mb-2">
          <span>
            {item.title} × {item.qty}
          </span>
          <span>₹{item.price * item.qty}</span>
        </div>
      ))}

      <hr className="my-3" />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>₹{subtotal}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
