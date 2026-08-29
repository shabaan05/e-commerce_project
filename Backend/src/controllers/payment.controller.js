const crypto = require("crypto");
const Order = require("../models/order.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const {
  getRazorpayInstance,
  getRazorpayKeyId,
} = require("../config/razorpay");

const createOrder = asyncHandler(async (req, res) => {
  const razorpay = getRazorpayInstance();
  const { amount } = req.body;

  const numericAmount = Number(amount);
  if (!numericAmount || numericAmount <= 0) {
    throw new AppError("Invalid payment amount", 400);
  }

  const order = await razorpay.orders.create({
    amount: Math.round(numericAmount * 100),
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });

  res.status(200).json({
    success: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: getRazorpayKeyId(),
  });
});

// Verify payment
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new AppError("Missing Razorpay payment details", 400);
  }

  if (!orderId) {
    throw new AppError("Missing ShopCart order ID", 400);
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new AppError("Razorpay secret is not configured", 500);
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    console.error("Razorpay signature mismatch for order:", orderId);
    return res.status(400).json({
      success: false,
      message: "Payment verification failed. Invalid signature.",
    });
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paymentStatus: "paid",
    },
    { new: true }
  );

  if (!updatedOrder) {
    throw new AppError("ShopCart order not found", 404);
  }

  return res.json({
    success: true,
    message: "Payment verified and order updated",
    orderId: updatedOrder._id,
  });
});

const createOrderInDB = asyncHandler(async (req, res) => {
  const { items, totalAmount, shippingAddress } = req.body;

  const order = await Order.create({
    user: req.user.id,
    items,
    totalAmount,
    shippingAddress,
    paymentStatus: "pending",
  });

  res.status(201).json(order);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order not found", 404);

  order.orderStatus = status;
  await order.save();

  res.json({
    success: true,
    message: "Order status updated",
    order,
  });
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});

module.exports = {
  createOrder,
  verifyPayment,
  createOrderInDB,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
};
