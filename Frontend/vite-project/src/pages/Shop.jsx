import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../component/product/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProducts(); // fetch all products
      console.log("SHOP PRODUCTS:", data);
      setProducts(data);
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
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  </div>
);

};

export default Shop;
