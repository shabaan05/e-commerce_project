import { useCart } from "../../context/CartContext";

const SavedAddress = ({ onUseAddress }) => {
  const { shippingAddress } = useCart();

  if (!shippingAddress) return null;

  return (
    <div className="border p-4 mb-4">
      <h3 className="font-semibold mb-2">Saved Address</h3>

      <p>{shippingAddress.street}</p>
      <p>{shippingAddress.city}, {shippingAddress.country}</p>
      <p>Phone: {shippingAddress.phone}</p>

      <button
        onClick={() => onUseAddress(shippingAddress)}
        className="mt-2 bg-black text-white px-3 py-1"
      >
        Use this address
      </button>
    </div>
  );
};

export default SavedAddress;
