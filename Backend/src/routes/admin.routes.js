const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { protect, admin } = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");

// Dashboard stats
router.get("/dashboard", protect, admin, adminController.getDashboardStats);
// Admin create product
router.post(
  "/products",
  protect,
  admin,
  productController.createProduct
);

// Users
router.get("/users", protect, admin, adminController.getAllUsers);

// Orders
router.get("/orders", protect, admin, adminController.getAllOrders);
// router.put("/orders/:id", protect, admin, adminController.updateOrderStatus);
// ✅ ADD THIS
router.get("/products", protect, admin, productController.getAllProducts);
router.post("/products", protect, admin, productController.createProduct);
router.put("/products/:id", protect, admin, productController.updateProduct);
router.delete("/products/:id", protect, admin, productController.deleteProduct);
module.exports = router;
