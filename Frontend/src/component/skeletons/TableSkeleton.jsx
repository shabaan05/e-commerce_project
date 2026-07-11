/**
 * TableSkeleton – generic table row skeleton.
 * @param {number} rows   - number of skeleton rows to render (default 5)
 * @param {number} cols   - number of columns (default 5)
 */
const TableSkeleton = ({ rows = 5, cols = 5 }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto animate-pulse">
    <table className="min-w-full text-sm text-left">
      {/* Header */}
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} className="px-6 py-4">
              <div className="h-3 bg-gray-200 rounded w-20" />
            </th>
          ))}
        </tr>
      </thead>

      {/* Body */}
      <tbody>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <tr key={rowIdx} className="border-b border-gray-100">
            {Array.from({ length: cols }).map((_, colIdx) => (
              <td key={colIdx} className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded w-full max-w-[120px]" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TableSkeleton;
