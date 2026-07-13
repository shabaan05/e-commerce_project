import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const monthNames = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const RevenueChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    month: monthNames[item._id],
    revenue: item.revenue,
  }));

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Monthly Revenue
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Revenue generated every month
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `₹${value.toLocaleString()}`,
              "Revenue",
            ]}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;