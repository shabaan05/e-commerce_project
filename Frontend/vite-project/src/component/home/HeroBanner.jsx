import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div className="bg-gray-100 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Big Sale Up To 50% Off
      </h1>

      <p className="text-gray-600 mb-8 text-lg">
        Best quality products at affordable prices
      </p>

      <Link
        to="/products"
        className="inline-block bg-black text-white px-8 py-3 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Shop Now
      </Link>
    </div>
  );
};

export default HeroBanner;
