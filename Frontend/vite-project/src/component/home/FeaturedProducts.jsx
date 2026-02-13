import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import ProductCard from "../product/ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]); // ✅ Always array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(); // Axios call
        console.log("Featured products fetched:", data); // ✅ debug
        setProducts(data.data || data); // ensure it's an array
      } catch (err) {
        console.error("Failed to load featured products:", err);
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Loading & error states
  if (loading) return <p>Loading featured products...</p>;
  if (error) return <p>{error}</p>;
return (
  <section className="bg-gray-50 py-20">
    <div className="max-w-7xl mx-auto px-6 space-y-12">

      {/* Section Header */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-semibold text-gray-900">
          Featured Products
        </h2>
        <p className="text-gray-500 text-sm">
          Discover our most popular picks
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  </section>
);

};

export default FeaturedProducts;
