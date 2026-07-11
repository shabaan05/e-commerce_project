const express = require("express");
const upload = require("../middlewares/upload");
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
router.post(
  "/",
  protect,
  admin,
  upload.single("image"),
  createProduct
);
module.exports = router;
