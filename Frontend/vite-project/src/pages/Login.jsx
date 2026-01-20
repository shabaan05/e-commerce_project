import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
  const [formData, setFormData] = useState({
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
      const data = await login({
  email: formData.email,
  password: formData.password,
});

      // store token (temporary, context comes later)
      localStorage.setItem("token", data.token);

      setSuccess("Login successful");
      setUser(data.user); // from context
      console.log("Logged in user:", data);
//..logout
      const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};

    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-96 border p-6 rounded-md shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="text-green-600 text-sm mb-2">
            {success}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
