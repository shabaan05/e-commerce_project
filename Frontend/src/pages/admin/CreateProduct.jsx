import { useState } from "react";
import { createProduct } from "../../services/adminApi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../../component/skeletons/Spinner";

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
  const [loading, setLoading] = useState(false);

useEffect(() => {
  const savedForm = localStorage.getItem("createProductForm");

  if (savedForm) {
    const parsed = JSON.parse(savedForm);

    setForm((prev) => ({
      ...prev,
      ...parsed,
      image: "", 
    }));
  }
}, []);
const handleChange = (e) => {
  const { name, value, files } = e.target;

  const updatedForm = {
    ...form,
    [name]: files ? files[0] : value,
  };

  setForm(updatedForm);

  // Save only text fields
  if (!files) {
    const { image, ...dataToSave } = updatedForm;

    localStorage.setItem(
      "createProductForm",
      JSON.stringify(dataToSave)
    );
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("countInStock", form.countInStock);
    formData.append("description", form.description);

    if (form.image) {
      formData.append("image", form.image);
    }
console.log(form);
console.log(formData)
    await createProduct(formData);

    alert("Product created successfully");
    localStorage.removeItem("createProductForm");
    navigate("/admin/products");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to create product");
  } finally {
    setLoading(false);
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
    Product Image
  </label>

  <input
    name="image"
    type="file"
    accept="image/*"
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
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner size="sm" color="border-white" />
                Creating…
              </>
            ) : (
              "Create Product"
            )}
          </button>

        </form>
      </div>

    </div>
  </div>
);

};

export default CreateProduct;
