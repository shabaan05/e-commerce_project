import { useState } from "react";
import { createProduct } from "../../services/adminApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    countInStock: "",
    description: "",
    image: "",
  });

useEffect(() => {
  const savedForm = localStorage.getItem("createProductForm");
  if (savedForm) {
    setForm(JSON.parse(savedForm));
  }
}, []);

 const handleChange = (e) => {
  const updatedForm = {
    ...form,
    [e.target.name]: e.target.value,
  };

  setForm(updatedForm);
  localStorage.setItem(
    "createProductForm",
    JSON.stringify(updatedForm)
  );
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(form);
      alert("Product created successfully");
      navigate("/admin/products"); // go back to list
        localStorage.removeItem("createProductForm"); // ✅ clear draft

    } catch (error) {
      alert("Failed to create product");
      console.error(error);
    }
  };

 return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-3xl mx-auto px-6 space-y-10">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        Create Product
      </h1>

      {/* Form Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Category ID
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Stock Quantity
            </label>
            <input
              type="number"
              name="countInStock"
              value={form.countInStock}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Image URL
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-500 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition duration-300"
          >
            Create Product
          </button>

        </form>
      </div>

    </div>
  </div>
);

};

export default CreateProduct;
