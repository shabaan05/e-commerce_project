const Filters = ({ setSelectedCategory }) => {
  return (
    <div className="w-1/4 space-y-4">
      <button onClick={() => setSelectedCategory("All")}>All</button>
      <button onClick={() => setSelectedCategory("Men")}>Men</button>
      <button onClick={() => setSelectedCategory("Women")}>Women</button>
      <button onClick={() => setSelectedCategory("Electronics")}>
        Electronics
      </button>
    </div>
  );
};

export default Filters;
