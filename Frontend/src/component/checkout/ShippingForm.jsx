import { useState } from "react";
import { useCart } from "../../context/CartContext";

const emptyForm = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
};

const ShippingForm = ({ onSaved, onCancel }) => {
  const { setShippingAddress } = useCart();
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    if (
      !formData.fullName ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.phone
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (onSaved) {
        await onSaved(formData);
      } else {
        setShippingAddress(formData);
      }
    } catch (err) {
      setError("Failed to save address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600";

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-500 mb-2">Full Name *</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">Phone *</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">Pincode *</label>
          <input
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-500 mb-2">
            Street Address *
          </label>
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">City *</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">State *</label>
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-2">Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <input
            type="checkbox"
            id="isDefault"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          />
          <label htmlFor="isDefault" className="text-sm text-gray-600">
            Set as default address
          </label>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition duration-300"
        >
          {saving ? "Saving…" : "Save Address"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-gray-500 hover:text-red-600 transition px-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ShippingForm;
