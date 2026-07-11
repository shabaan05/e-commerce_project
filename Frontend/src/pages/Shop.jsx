import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../component/product/ProductCard";
import ProductCardSkeleton from "../component/skeletons/ProductCardSkeleton";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        console.log("SHOP PRODUCTS:", data);
        setProducts(data);
      } catch (err) {
        console.error("Failed to load shop products:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

 return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-7xl mx-auto px-6 space-y-10">

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-900">
        Shop
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>

    </div>
  </div>
);

};

export default Shop;
