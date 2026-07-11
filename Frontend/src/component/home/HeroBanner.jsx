import { Link } from "react-router-dom";

const HeroBanner = () => {
return (
  <section className="relative h-[600px] flex items-center justify-center text-center overflow-hidden">

  {/* Background Image */}
  <img
    src="/image.png"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 max-w-3xl px-6 space-y-6">
    <h1 className="text-4xl sm:text-5xl font-semibold text-white">
      Big Sale Up To 50% Off
    </h1>

    <p className="text-lg text-gray-200">
      Discover premium quality products at affordable prices.
    </p>

    <Link
      to="/shop"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-medium shadow-lg transition duration-300"
    >
      Shop Now
    </Link>
  </div>

</section>

);


};

export default HeroBanner;
