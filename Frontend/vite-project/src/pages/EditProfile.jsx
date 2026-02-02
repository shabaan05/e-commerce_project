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
    <div>
      <label className="block mt-2">Phone</label>
      <input
        className="border p-2 w-full"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
{phoneError && (
  <p className="text-red-500 text-sm mt-1">
    {phoneError}
  </p>
)}
      <label className="block mt-2">Address</label>
      <input
  value={street}
  onChange={(e) => setStreet(e.target.value)}
/>

<input
  value={country}
  onChange={(e) => setCountry(e.target.value)}
/>


      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="border px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
