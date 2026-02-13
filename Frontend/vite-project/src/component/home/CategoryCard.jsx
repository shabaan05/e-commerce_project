
const CategoryCard = ({ name }) => {
 return (
  <div className="bg-white border border-gray-200 rounded-xl p-6 text-center font-medium text-gray-800 cursor-pointer shadow-sm hover:shadow-md hover:border-blue-600 hover:text-blue-600 transition duration-300">
    {name}
  </div>
);

};

export default CategoryCard;
