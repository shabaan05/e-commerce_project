import { useContext, useState } from "react";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import { ProductContext } from "../../context/ProductContext";

const ShopContainer = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, loading, error } = useContext(ProductContext);

if (loading)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-lg">Loading products...</p>
    </div>
  );

if (error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-red-600 text-lg font-medium">{error}</p>
    </div>
  );

return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-7xl mx-auto px-6 space-y-10">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        Shop
      </h1>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-10">
        <Filters setSelectedCategory={setSelectedCategory} />
        <ProductGrid products={products} />
      </div>

    </div>
  </div>
);

};

export default ShopContainer;
