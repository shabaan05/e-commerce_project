const Cart = require("../models/cart");
const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// Add product to cart
exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new AppError("Product and quantity required", 400);
  }

  const product = await Product.findById(productId);
  if (!product) throw new AppError("Product not found", 404);

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({
      user: req.user.id,
      products: [{ product: productId, quantity, price: product.price }],
    });
  } else {
    const itemIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity, price: product.price });
    }
  }

  await cart.save();
  res.status(200).json(cart);
});

// Remove product from cart
exports.removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) throw new AppError("Cart not found", 404);

  cart.products = cart.products.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.status(200).json(cart);
});

// Update product quantity
exports.updateCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) throw new AppError("Cart not found", 404);

  const itemIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex === -1) throw new AppError("Product not in cart", 404);

  cart.products[itemIndex].quantity = quantity;

  await cart.save();
  res.status(200).json(cart);
});

// Get user cart
exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "products.product"
  );
  if (!cart) throw new AppError("Cart not found", 404);

  res.status(200).json(cart);
});
