/**
 * DashboardStatsSkeleton – mirrors the 3-card stats grid in AdminDashboard.
 */
const DashboardStatsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-3"
      >
        <div className="h-3 bg-gray-200 rounded w-16" />
        <div className="h-8 bg-gray-200 rounded w-20" />
      </div>
    ))}
  </div>
);

export default DashboardStatsSkeleton;
