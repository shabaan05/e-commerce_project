/**
 * CategorySkeleton – mirrors the exact layout of CategoryCard.
 */
const CategorySkeleton = () => (
  <div className="min-w-[200px] flex-shrink-0">
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto" />
    </div>
  </div>
);

export default CategorySkeleton;
