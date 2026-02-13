import ShippingForm from "./ShippingForm";

const AddNewAddress = ({ onClose }) => {
 return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

    {/* Title */}
    <h3 className="text-lg font-semibold text-gray-900">
      Add New Address
    </h3>

    {/* Form */}
    <ShippingForm />

    {/* Cancel Button */}
    <button
      onClick={onClose}
      className="text-sm font-medium text-gray-500 hover:text-red-600 transition"
    >
      Cancel
    </button>

  </div>
);

};

export default AddNewAddress;
