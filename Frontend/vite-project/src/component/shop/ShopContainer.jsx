import { useContext, useState } from "react";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import { ProductContext } from "../../context/ProductContext";

const ShopContainer = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, loading, error } = useContext(ProductContext);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex gap-6 p-6">
      <Filters setSelectedCategory={setSelectedCategory} />
      <ProductGrid products={products} />
    </div>
  );
};

export default ShopContainer;
