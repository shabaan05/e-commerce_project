import ShippingForm from "./ShippingForm";

const AddNewAddress = ({ onClose }) => {
  return (
    <div className="border p-4">
      <h3 className="font-semibold mb-2">Add New Address</h3>

      <ShippingForm />

      <button
        onClick={onClose}
        className="mt-2 text-sm underline"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddNewAddress;
