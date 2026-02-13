import { useCart } from "../../context/CartContext";

const SavedAddress = ({ onUseAddress }) => {
  const { shippingAddress } = useCart();

  if (!shippingAddress) return null;

return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">

    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-900">
      Saved Address
    </h3>

    {/* Address Info */}
    <div className="text-sm text-gray-600 space-y-1">
      <p>{shippingAddress.street}</p>
      <p>
        {shippingAddress.city}, {shippingAddress.country}
      </p>
      <p>Phone: {shippingAddress.phone}</p>
    </div>

    {/* Action Button */}
    <button
      onClick={() => onUseAddress(shippingAddress)}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-sm transition duration-300"
    >
      Use this address
    </button>

  </div>
);

};

export default SavedAddress;
