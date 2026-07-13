const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { protect, admin } = require("../middlewares/auth.middleware");
const productController = require("../controllers/product.controller");
const upload = require("../middlewares/upload");

// Dashboard stats
router.get(
  "/dashboard",
  protect,
  admin,
  adminController.getDashboardStats
);
// Products
router.get("/products", protect, admin, productController.getAllProducts);
router.post("/products", protect, admin, upload.single("image"), productController.createProduct);
router.put("/products/:id", protect, admin, productController.updateProduct);
router.delete("/products/:id", protect, admin, productController.deleteProduct);

// Users
router.get("/users", protect, admin, adminController.getAllUsers);

// Orders
router.get("/orders", protect, admin, adminController.getAllOrders);

module.exports = router;
