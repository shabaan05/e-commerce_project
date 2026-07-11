import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../../services/adminApi";
import TableSkeleton from "../../component/skeletons/TableSkeleton";
import Spinner from "../../component/skeletons/Spinner";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
      setDeletingId(id);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
    } finally {
      setDeletingId(null);
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

if (loading)
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <TableSkeleton rows={6} cols={5} />
      </div>
    </div>
  );

return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-7xl mx-auto px-6 space-y-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          Manage Products
        </h1>

        <Link to="/admin/products/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm transition duration-300">
            Add Product
          </button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">

        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-gray-600 uppercase text-xs tracking-wide">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {product.category?.name}
                </td>

                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handlePriceChange(
                        product._id,
                        Number(e.target.value)
                      )
                    }
                    className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {product.countInStock}
                </td>

                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition disabled:opacity-50 flex items-center gap-1"
                  >
                    {deletingId === product._id ? (
                      <>
                        <Spinner size="sm" color="border-red-600" />
                        Deleting…
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  </div>
);

};

export default ManageProducts;
