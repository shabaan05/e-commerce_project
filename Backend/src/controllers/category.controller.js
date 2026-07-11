const Category = require("../models/category.model");
const categories = require("../data/categories");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) throw new AppError("Category name is required", 400);

  const existing = await Category.findOne({ name });
  if (existing) throw new AppError("Category already exists", 400);

  const category = await Category.create({ name });
  res.status(201).json(category);
});

const getAllCategories = asyncHandler(async (req, res) => {
  const cats = await Category.find();
  res.status(200).json(cats);
});

// Static data endpoint (preserved from original)
const getCategories = (req, res) => {
  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategories,
};
