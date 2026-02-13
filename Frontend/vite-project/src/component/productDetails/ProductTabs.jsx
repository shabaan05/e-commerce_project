const ProductTabs = ({ description }) => {
  return (
  <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Description
    </h2>

    <p className="text-gray-600 leading-relaxed">
      {description}
    </p>

  </div>
);

};

export default ProductTabs;
