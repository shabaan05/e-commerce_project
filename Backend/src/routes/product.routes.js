const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct
} = require("../controllers/product.controller");
const { protect,admin } = require("../middlewares/auth.middleware"); // import middleware

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
// PROTECTED route → only logged-in users
router.post("/", protect,admin, createProduct);

module.exports = router;
