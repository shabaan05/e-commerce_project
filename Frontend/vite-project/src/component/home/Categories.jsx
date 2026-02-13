import { useContext } from "react";
import CategoryCard from "./CategoryCard";
import { CategoryContext } from "../../context/CategoryContext";

const Categories = () => {
  const { categories, loading, error } = useContext(CategoryContext);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

return (
  <section className="bg-white py-8">
    <div className="max-w-6xl mx-auto px-6 space-y-2">

      {/* Scroll Container */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">

        {categories.map((cat) => (
          <div key={cat._id} className="min-w-[200px] flex-shrink-0">
            <CategoryCard
              name={cat.name}
              link={`/shop?category=${cat._id}`}
            />
          </div>
        ))}

      </div>

    </div>
  </section>
);


};

export default Categories;
