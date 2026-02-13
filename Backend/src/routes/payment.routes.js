const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middlewares/auth.middleware");

const {
  createOrder,
  verifyPayment,
  createOrderInDB,
  getUserOrders,
  updateOrderStatus,
  getAllOrders
} = require("../controllers/payment.controller");

// Create Razorpay order
router.post("/create-order", createOrder);

// Verify payment
router.post("/verify-payment", verifyPayment);

// Create DB order
router.post("/create-db-order", protect, createOrderInDB);

// Get user orders
router.get("/my-orders", protect, getUserOrders);

// Admin: Update order status
router.put(
  "/admin/update-status/:orderId",
  protect,
  admin,
  updateOrderStatus
);

// Admin: Get all orders
router.get(
  "/admin/orders",
  protect,
  admin,
  getAllOrders
);

module.exports = router;
