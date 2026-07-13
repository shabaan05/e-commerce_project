import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
];

const OrdersPieChart = ({ data = [] }) => {

  const chartData = data.map((item) => ({
    name: item._id || "Unknown",
    value: item.value,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-bold text-gray-800">
        Orders by Status
      </h2>

      <p className="text-gray-500 text-sm mb-5">
        Distribution of current order statuses
      </p>

      <ResponsiveContainer width="100%" height={330}>
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={95}
            innerRadius={55}
            paddingAngle={3}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default OrdersPieChart;