import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import { getProductById } from "../../services/productService";
import ProductDetailSkeleton from "../skeletons/ProductDetailSkeleton";

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

if (loading) return <ProductDetailSkeleton />;

if (error)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-red-600 text-lg font-medium">{error}</p>
    </div>
  );

return (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-7xl mx-auto px-6 space-y-12">

      {/* Top Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 border border-gray-200">
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <ProductTabs description={product.description} />
      </div>

    </div>
  </div>
);

};

export default ProductDetailsContainer;
