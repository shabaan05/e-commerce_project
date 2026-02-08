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
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
