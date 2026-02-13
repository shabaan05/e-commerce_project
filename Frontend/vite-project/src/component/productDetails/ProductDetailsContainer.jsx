import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import { getProductById } from "../../services/productService";

const ProductDetailsContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
//         const data = await getProductById(id);
// setProduct(data.product || data.data || data);
// console.log("API RESPONSE:", data);
const data = await getProductById(id);
console.log("Fetched Product:", data);
setProduct(data);


      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
console.log("DETAIL PAGE PRODUCT:", product);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <ProductInfo
          product={product}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <ProductTabs description={product.description} />
    </div>
  );
};

export default ProductDetailsContainer;
