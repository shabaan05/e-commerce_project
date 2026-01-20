import { useContext } from "react";
import CategoryCard from "./CategoryCard";
import { CategoryContext } from "../../context/CategoryContext";

const Categories = () => {
  const { categories, loading, error } = useContext(CategoryContext);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Categories
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {categories.map((cat) => (
          <CategoryCard key={cat._id} name={cat.name} 
            link={`/shop?category=${cat._id}`}
/>
        ))}
      </div>
    </div>
  );
};

export default Categories;
