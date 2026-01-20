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
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
