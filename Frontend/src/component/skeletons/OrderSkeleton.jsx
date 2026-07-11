/**
 * OrderSkeleton – mirrors the exact layout of OrderItem.
 */
const OrderSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6 animate-pulse">
    {/* Top row */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-16" />
        <div className="h-4 bg-gray-200 rounded w-48" />
      </div>
      <div className="sm:text-right space-y-2">
        <div className="h-3 bg-gray-200 rounded w-12 sm:ml-auto" />
        <div className="h-5 bg-gray-200 rounded w-20 sm:ml-auto" />
      </div>
    </div>

    {/* Status row */}
    <div className="flex gap-6">
      <div className="h-4 bg-gray-200 rounded w-36" />
      <div className="h-4 bg-gray-200 rounded w-36" />
    </div>

    {/* Items */}
    <div className="space-y-2">
      <div className="h-3 bg-gray-200 rounded w-12 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-32" />
      <div className="h-4 bg-gray-200 rounded w-28" />
    </div>
  </div>
);

export default OrderSkeleton;
