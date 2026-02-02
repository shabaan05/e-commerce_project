import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {!isEditing ? (
        <>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone || "Not added"}</p>
<p><b>Address:</b></p>
<p>{user.address?.street || "Not added"}</p>
<p>{user.address?.country || ""}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <EditProfile onCancel={() => setIsEditing(false)} />
      )}
    </div>
  );
};

export default Profile;
