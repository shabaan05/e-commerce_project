const Order = require("../models/order.model");
const Cart = require("../models/cart");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// PLACE ORDER
exports.placeOrder = asyncHandler(async (req, res) => {
  // Fetch cart and populate products
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "products.product"
  );

  if (!cart || cart.products.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  // Map cart items to order items
  const orderItems = cart.products.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  // Calculate total
  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Create order
  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    totalAmount,
  });

  // Clear cart
  cart.products = [];
  await cart.save();

  res.status(201).json({
    message: "Order placed successfully",
    order,
  });
});

// GET LOGGED-IN USER ORDERS
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate(
    "items.product"
  );

  res.json(orders);
});

// GET ALL ORDERS (ADMIN)
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user items.product");
  res.json(orders);
});

// UPDATE ORDER STATUS (ADMIN)
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) throw new AppError("Order not found", 404);

  order.orderStatus = status;
  await order.save();

  res.json({
    message: "Order status updated",
    order,
  });
});
