import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6",
];

const CategoryBarChart = ({ data = [] }) => {
  const chartData =
    data.length > 0
      ? data.map((item) => ({
          category: item._id?.name || item._id || "Unknown",
          products: item.value,
        }))
      : [
          { category: "Electronics", products: 0 },
          { category: "Clothing", products: 0 },
          { category: "Books", products: 0 },
        ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Products by Category
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Number of products available in each category
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="category" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="products"
            radius={[8, 8, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default CategoryBarChart;