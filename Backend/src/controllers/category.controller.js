const Category = require("../models/category.model");
const categories = require("../data/categories");
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);

  } catch (error) {
    next(error);
  }
};
//..
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
//..
exports.getCategories = (req, res) => {
  res.status(200).json(categories);
};
module.exports = {
  createCategory,
  getAllCategories
};
