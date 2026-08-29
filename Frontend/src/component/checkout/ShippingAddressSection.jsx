import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { getProfile, addAddress } from "../../services/userService";
import ShippingForm from "./ShippingForm";

const formatAddressLine = (address) => {
  if (!address) return null;

  const parts = [
    address.fullName,
    address.street,
    [address.city, address.state].filter(Boolean).join(", "),
    address.pincode,
    address.country,
    address.phone ? `Phone: ${address.phone}` : null,
  ].filter(Boolean);

  return parts;
};

const ShippingAddressSection = ({ compact = false }) => {
  const { shippingAddress, setShippingAddress } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const profile = await getProfile();
      const saved = profile.addresses || [];
      setAddresses(saved);

      if (!shippingAddress && saved.length > 0) {
        const defaultAddress =
          saved.find((addr) => addr.isDefault) || saved[0];
        setShippingAddress(defaultAddress);
      }
    } catch (err) {
      setError("Unable to load saved addresses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setShippingAddress(address);
    setShowSelector(false);
  };

  const handleSaveNewAddress = async (formData) => {
    const response = await addAddress(formData);
    const updatedAddresses = response.addresses || [];
    setAddresses(updatedAddresses);

    const newAddress =
      updatedAddresses.find((addr) => addr.isDefault) ||
      updatedAddresses[updatedAddresses.length - 1];

    setShippingAddress(newAddress);
    setShowNewForm(false);
    setShowSelector(false);
  };

  const addressLines = formatAddressLine(shippingAddress);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl shadow-sm ${
        compact ? "p-5" : "p-6"
      } space-y-4`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Shipping Address
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            This address will be used for your order delivery.
          </p>
        </div>
        {shippingAddress && (
          <span className="shrink-0 text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-200">
            Selected
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!loading && !error && shippingAddress && addressLines && (
        <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 text-sm text-gray-700 space-y-1">
          {addressLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      )}

      {!loading && !error && !shippingAddress && addresses.length === 0 && (
        <p className="text-sm text-gray-500">
          No saved address yet. Add one to continue checkout.
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {addresses.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setShowSelector((prev) => !prev);
              setShowNewForm(false);
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
          >
            {showSelector ? "Hide addresses" : "Change Address"}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setShowNewForm((prev) => !prev);
            setShowSelector(false);
          }}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          {showNewForm ? "Cancel" : "+ Add New Address"}
        </button>
      </div>

      {showSelector && addresses.length > 1 && (
        <div className="space-y-2 border-t border-gray-100 pt-4">
          {addresses.map((address) => {
            const isSelected = shippingAddress?._id === address._id;
            const lines = formatAddressLine(address);

            return (
              <button
                key={address._id}
                type="button"
                onClick={() => handleSelectAddress(address)}
                className={`w-full text-left rounded-lg border p-4 transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {address.fullName || "Saved Address"}
                  </span>
                  {address.isDefault && (
                    <span className="text-xs text-gray-500">Default</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 space-y-0.5">
                  {lines?.slice(1).map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {showNewForm && (
        <div className="border-t border-gray-100 pt-4">
          <ShippingForm
            onSaved={handleSaveNewAddress}
            onCancel={() => setShowNewForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ShippingAddressSection;
