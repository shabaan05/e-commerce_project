import { useCart } from "../../context/CartContext";

const ShippingForm = () => {
  const { shippingAddress, setShippingAddress } = useCart();

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="border p-4 rounded">
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={shippingAddress?.name || ""}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <textarea
        name="address"
        placeholder="Address"
        value={shippingAddress?.address || ""}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={shippingAddress?.phone || ""}
        onChange={handleChange}
        className="w-full border p-2"
      />
    </div>
  );
};

export default ShippingForm;
