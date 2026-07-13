import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-500",
    },
    {
      title: "Products",
      value: stats?.totalProducts || 0,
      icon: Package,
      color: "text-green-600",
      bg: "bg-green-100",
      border: "border-green-500",
    },
    {
      title: "Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "text-orange-600",
      bg: "bg-orange-100",
      border: "border-orange-500",
    },
    {
      title: "Revenue",
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: IndianRupee,
      color: "text-purple-600",
      bg: "bg-purple-100",
      border: "border-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className={`
              bg-white
              rounded-xl
              shadow-md
              border-l-4
              ${card.border}
              p-6
              transition-all
              duration-300
              hover:shadow-xl
              hover:-translate-y-1
            `}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-gray-800">
                  {card.value}
                </h2>

                <div className="flex items-center mt-4 text-green-600 text-sm">
                  <TrendingUp size={16} />
                  <span className="ml-1">
                    Live Data
                  </span>
                </div>

              </div>

              <div
                className={`
                  ${card.bg}
                  p-4
                  rounded-full
                `}
              >
                <Icon
                  className={card.color}
                  size={34}
                />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;