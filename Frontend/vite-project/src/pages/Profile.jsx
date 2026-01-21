import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 border rounded-md p-6 shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Profile
        </h2>

        {/* User Info */}
        <div className="mb-4 text-center">
          <p className="font-semibold">Logged in</p>
          <p className="text-sm text-gray-600">
            Token-based session
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
