import { useState } from "react";
import { useCart } from "../../context/CartContext";

const ShippingForm = ({ onSaved }) => {
  const { setShippingAddress } = useCart();

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // basic validation
    if (!formData.street || !formData.phone) return;

    setShippingAddress(formData); // ✅ saved in CartContext + localStorage
    onSaved(); // close form / show saved address
  };

  return (
    <div className="border p-4">
      <input
        name="street"
        placeholder="Street"
        value={formData.street}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />

      {/* ✅ SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2"
      >
        Save Address
      </button>
    </div>
  );
};

export default ShippingForm;
