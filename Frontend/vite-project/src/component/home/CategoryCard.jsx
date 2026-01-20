
const CategoryCard = ({ name }) => {
  return (
     <div className="border rounded-md p-6 text-center font-semibold cursor-pointer hover:bg-black hover:text-white transition">
      {name}
    </div>
  
  );
};

export default CategoryCard;
