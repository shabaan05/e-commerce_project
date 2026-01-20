const ProductTabs = ({ description }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Description</h2>
      <p>{description}</p>
    </div>
  );
};

export default ProductTabs;
