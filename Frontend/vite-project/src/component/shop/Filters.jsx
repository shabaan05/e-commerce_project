const Filters = ({ setSelectedCategory }) => {
return (
  <div className="w-full md:w-1/4 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">

    <h3 className="text-lg font-semibold text-gray-900">
      Categories
    </h3>

    <div className="space-y-2">

      <button
        onClick={() => setSelectedCategory("All")}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
      >
        All
      </button>

      <button
        onClick={() => setSelectedCategory("Men")}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
      >
        Men
      </button>

      <button
        onClick={() => setSelectedCategory("Women")}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
      >
        Women
      </button>

      <button
        onClick={() => setSelectedCategory("Electronics")}
        className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
      >
        Electronics
      </button>

    </div>

  </div>
);

};

export default Filters;
