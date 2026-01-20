import ProductCard from "../product/ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="w-3/4 grid grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
