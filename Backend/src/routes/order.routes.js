const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const { protect, admin } = require("../middlewares/auth.middleware");

// User routes
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

// Admin routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;
