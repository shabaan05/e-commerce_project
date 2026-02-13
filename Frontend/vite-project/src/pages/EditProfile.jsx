import { useState } from "react";
import { useAuth } from "../context/AuthContext";
const EditProfile = ({ onCancel }) => {
  const { user, updateProfile } = useAuth();

  const [phone, setPhone] = useState(user.phone || "");
const [street, setStreet] = useState(user.address?.street || "");
const [country, setCountry] = useState(user.address?.country || "");
const [phoneError, setPhoneError] = useState("");

  const handleSave = () => {
      if (!/^\d{10}$/.test(phone)) {
    setPhoneError("Phone number must be 10 digits");
    return;
  }

  setPhoneError(""); 
  updateProfile({
    address: {
      street,
      country,
    },
  });
  onCancel();
};



return (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">

    {/* Phone */}
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        Phone
      </label>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {phoneError && (
        <p className="text-red-600 text-sm mt-2">
          {phoneError}
        </p>
      )}
    </div>

    {/* Street */}
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        Street
      </label>
      <input
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    {/* Country */}
    <div>
      <label className="block text-sm text-gray-500 mb-2">
        Country
      </label>
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>

    {/* Buttons */}
    <div className="flex gap-4 pt-4">

      <button
        onClick={handleSave}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition duration-300"
      >
        Save
      </button>

      <button
        onClick={onCancel}
        className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
      >
        Cancel
      </button>

    </div>

  </div>
);

};

export default EditProfile;
