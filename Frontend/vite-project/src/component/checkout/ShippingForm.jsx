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
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

    {/* Street */}
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        Street
      </label>
      <input
        name="street"
        value={formData.street}
        onChange={handleChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    {/* City */}
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        City
      </label>
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    {/* Country */}
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        Country
      </label>
      <input
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        Phone
      </label>
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    {/* Save Button */}
    <button
      onClick={handleSave}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition duration-300"
    >
      Save Address
    </button>

  </div>
);

};

export default ShippingForm;
