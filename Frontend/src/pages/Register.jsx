import { useState } from "react";
import { register } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const data = await register(formData);
      setSuccess("Registration successful. You can now login.");
      console.log("Registered user:", data);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-6"
    >

      {/* Title */}
      <h2 className="text-3xl font-semibold text-gray-900 text-center">
        Create Account
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm text-gray-500 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm text-gray-500 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-gray-500 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}

      {/* Success */}
      {success && (
        <p className="text-green-600 text-sm">
          {success}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition duration-300 disabled:opacity-70"
      >
        {loading ? "Registering..." : "Register"}
      </button>

    </form>

  </div>
);

};

export default Register;
