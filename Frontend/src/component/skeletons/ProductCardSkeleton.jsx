/**
 * ProductCardSkeleton – mirrors the exact layout of ProductCard.
 * Uses Tailwind animate-pulse for the shimmer effect.
 */
const ProductCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm animate-pulse">
    {/* Image placeholder */}
    <div className="aspect-square rounded-lg bg-gray-200 mb-4" />

    {/* Category line */}
    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />

    {/* Product name */}
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />

    {/* Price */}
    <div className="h-5 bg-gray-200 rounded w-1/4" />
  </div>
);

export default ProductCardSkeleton;
