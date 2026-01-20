const ProductImage = ({ image }) => {
  return (
    <div className="w-1/2">
      <img src={Product.images[0]} alt="Product" className="w-full rounded" />
    </div>
  );
};

export default ProductImage;
