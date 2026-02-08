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
    <div>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category ID"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="countInStock"
          placeholder="Stock Quantity"
          value={form.countInStock}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
