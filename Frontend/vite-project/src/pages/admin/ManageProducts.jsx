import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../../services/adminApi";


const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data.products); // ✅ FIX
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
    }
  };

  const handlePriceChange = async (id, price) => {
    try {
      await updateProduct(id, { price });
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, price } : p
        )
      );
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h1>Manage Products</h1>

<Link to="/admin/products/create">
  <button>Add Product</button>
</Link>

      <table border="1" cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category?.name}</td>
              <td>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    handlePriceChange(
                      product._id,
                      Number(e.target.value)
                    )
                  }
                />
              </td>
              <td>{product.countInStock}</td>
              <td>
                <button onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
