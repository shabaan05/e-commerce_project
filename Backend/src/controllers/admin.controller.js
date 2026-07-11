const User = require("../models/user.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// DASHBOARD STATS
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({});
  const totalOrders = await Order.countDocuments({});
  const totalProducts = await Product.countDocuments({});

  const revenue = await Order.aggregate([
    { $match: { paymentStatus: "paid" } },
    { $group: { _id: null, total: { $sum: "$totalAmount" } } },
  ]);

  res.json({
    users: totalUsers,
    orders: totalOrders,
    products: totalProducts,
  });
});

// GET ALL USERS
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// GET ALL ORDERS
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("items.product", "name price");

  res.json(orders);
});

// UPDATE ORDER STATUS
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError("Order not found", 404);

  order.orderStatus = status;
  await order.save();

  res.json({ message: "Order status updated", order });
});

// GET all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate("category", "name")
    .sort({ createdAt: -1 });

  res.json(products);
});

// DELETE product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) throw new AppError("Product not found", 404);

  await product.deleteOne();
  res.json({ message: "Product deleted" });
});

// UPDATE product (basic fields)
exports.updateProduct = asyncHandler(async (req, res) => {
  const { name, price, countInStock } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError("Product not found", 404);

  product.name = name ?? product.name;
  product.price = price ?? product.price;
  product.countInStock = countInStock ?? product.countInStock;

  await product.save();
  res.json({ message: "Product updated" });
});
