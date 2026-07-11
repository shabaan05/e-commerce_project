/**
 * ProductDetailSkeleton – mirrors the layout of ProductDetailsContainer.
 */
const ProductDetailSkeleton = () => (
  <div className="bg-gray-50 min-h-screen py-16">
    <div className="max-w-7xl mx-auto px-6 space-y-12 animate-pulse">

      {/* Top section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Image placeholder */}
          <div className="w-full md:w-1/2 aspect-square bg-gray-200 rounded-xl" />

          {/* Info placeholder */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-12 bg-gray-200 rounded w-40 mt-4" />
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-32" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>

    </div>
  </div>
);

export default ProductDetailSkeleton;
