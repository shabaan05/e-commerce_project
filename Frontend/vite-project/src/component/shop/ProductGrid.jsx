import ProductCard from "../product/ProductCard";

const ProductGrid = ({ products }) => {
 return (
  <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}

  </div>
);

};

export default ProductGrid;
