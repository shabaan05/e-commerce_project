import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton";
import { getProducts } from "../../services/productService";

const ShopContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || null;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts(categoryId);
      setProducts(data);
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory, fetchProducts]);

  const handleSelectCategory = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">Shop</h1>
          <p className="text-sm text-gray-500">
            {loading ? "Loading…" : `${products.length} products`}
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <Filters
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {loading ? (
            <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="w-full md:w-3/4 flex flex-col items-center justify-center py-24 text-center">
              <p className="text-2xl font-medium text-gray-400">
                No products found
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try selecting a different category.
              </p>
              <button
                onClick={() => handleSelectCategory(null)}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                View all products
              </button>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopContainer;
