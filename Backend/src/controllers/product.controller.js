const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// GET all products + category filter
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
    sort,
  } = req.query;

  // Build query dynamically
  const query = {};

  // 1️⃣ Search by name
  if (search) {
    query.name = { $regex: search, $options: "i" }; // case-insensitive
  }
  if (category) {
    query.category = category;
  }
  // 3️⃣ Filter by price range
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // 2️⃣ Build sort object
  let sortObj = {};
  if (sort) {
    switch (sort) {
      case "price_asc":
        sortObj.price = 1;
        break;
      case "price_desc":
        sortObj.price = -1;
        break;
      case "name":
        sortObj.name = 1;
        break;
      case "date":
        sortObj.createdAt = -1;
        break;
      default:
        sortObj.createdAt = -1; // default: latest first
    }
  } else {
    sortObj.createdAt = -1; // default: latest first
  }

  // 3️⃣ Pagination calculations
  const skip = (Number(page) - 1) * Number(limit);

  // 4️⃣ Fetch products from DB
  const products = await Product.find(query)
    .populate("category", "name")
    .sort(sortObj)
    .skip(skip)
    .limit(Number(limit));

  // 5️⃣ Total count for frontend pagination
  const totalProducts = await Product.countDocuments(query);
  console.log("products are: ", products);

  // 6️⃣ Return response
  res.status(200).json({
    page: Number(page),
    limit: Number(limit),
    totalProducts,
    products,
  });
});

// GET product by id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) throw new AppError("Product not found", 404);

  res.status(200).json(product);
});

// POST create product (admin only)
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, countInStock, description } = req.body;

  if (!name || !price || !category || countInStock === undefined) {
    throw new AppError("Name, price, category & stock are required", 400);
  }

  const product = await Product.create({
    name,
    price,
    category,
    countInStock,
    description: description || "",
    images: req.file ? [req.file.path] : [],
  });

  res.status(201).json(product);
});

// UPDATE product (admin)
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) throw new AppError("Product not found", 404);

  res.status(200).json(product);
});

// DELETE product (admin)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) throw new AppError("Product not found", 404);

  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
