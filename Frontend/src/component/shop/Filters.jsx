import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";

const Filters = ({ selectedCategory, onSelectCategory }) => {
  const { categories, loading, error } = useContext(CategoryContext);

  return (
    <div className="w-full md:w-1/4 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4 self-start sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900">Categories</h3>

      {error && (
        <p className="text-xs text-red-500">Failed to load categories</p>
      )}

      <div className="space-y-1">
        {/* All Categories */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-50 hover:text-blue-600 text-gray-700"
          }`}
        >
          All Categories
        </button>

        {/* Dynamic categories from DB */}
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-9 rounded-lg bg-gray-100 animate-pulse"
              />
            ))
          : categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => onSelectCategory(cat._id)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedCategory === cat._id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
      </div>
    </div>
  );
};

export default Filters;
