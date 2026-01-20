import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductImage from "./ProductImage";
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
        const data = await getProductById(id);
        setProduct(data.data || data);
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <div className="flex gap-6">
        <ProductImage image={product.image} />
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
