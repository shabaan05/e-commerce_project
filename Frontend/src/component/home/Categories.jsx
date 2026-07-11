import { useContext } from "react";
import CategoryCard from "./CategoryCard";
import { CategoryContext } from "../../context/CategoryContext";
import CategorySkeleton from "../skeletons/CategorySkeleton";

const Categories = () => {
  const { categories, loading, error } = useContext(CategoryContext);

  if (error) return <p>{error}</p>;

return (
  <section className="bg-white py-8">
    <div className="max-w-6xl mx-auto px-6 space-y-2">

      {/* Scroll Container */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide">

        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))
          : categories.map((cat) => (
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
