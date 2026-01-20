const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { protect, admin } = require("../middlewares/auth.middleware");

// Dashboard stats
router.get("/dashboard", protect, admin, adminController.getDashboardStats);

// Users
router.get("/users", protect, admin, adminController.getAllUsers);

// Orders
router.get("/orders", protect, admin, adminController.getAllOrders);
router.put("/orders/:id", protect, admin, adminController.updateOrderStatus);

module.exports = router;
