import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import EditProfile from "./EditProfile";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-2xl mx-auto px-6">

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6">

        <h2 className="text-3xl font-semibold text-gray-900">
          My Profile
        </h2>

        {!isEditing ? (
          <div className="space-y-4 text-gray-700">

            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium text-gray-900">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-900 capitalize">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium text-gray-900">
                {user.phone || "Not added"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium text-gray-900">
                {user.address?.street || "Not added"}
              </p>
              <p className="font-medium text-gray-900">
                {user.address?.country || ""}
              </p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm transition duration-300 font-medium"
            >
              Edit Profile
            </button>

          </div>
        ) : (
          <EditProfile onCancel={() => setIsEditing(false)} />
        )}

      </div>
    </div>
  </div>
);

};

export default Profile;
