const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

const getDashboardStats = async () => {
  // KPI Cards
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  // Revenue
  const revenueResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalPrice" },
      },
    },
  ]);

  const totalRevenue =
    revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  // Monthly Sales
  const monthlySales = await Order.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        revenue: { $sum: "$totalPrice" },
      },
    },
    {
      $sort: { "_id": 1 },
    },
  ]);

  // Orders by Status
  const ordersByStatus = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        value: { $sum: 1 },
      },
    },
  ]);

  // Products by Category
  const productsByCategory = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        value: { $sum: 1 },
      },
    },
  ]);

  // Recent Orders
  const recentOrders = await Order.find()
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  // Low Stock Products
  const lowStockProducts = await Product.find({
    countInStock: { $lte: 5 },
  })
    .select("name countInStock")
    .limit(5);

  // Top Rated Products
  const topProducts = await Product.find()
    .sort({ rating: -1 })
    .select("name rating")
    .limit(5);

  return {
    stats: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
    },
    monthlySales,
    ordersByStatus,
    productsByCategory,
    recentOrders,
    lowStockProducts,
    topProducts,
  };
};

module.exports = {
  getDashboardStats,
};