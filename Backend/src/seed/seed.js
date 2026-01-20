const mongoose = require("mongoose");
const Category = require("../models/category.model");
const Product = require("../models/product.model");
require("dotenv").config({ path: "../.env" });

const categoriesData = require("./categories.json");
const productsData = require("./product.json");

const seedDB = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // 2️⃣ Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Old data cleared");

    // 3️⃣ Insert categories
    const categories = await Category.insertMany(categoriesData);
    console.log("Categories inserted");

    // 4️⃣ Create category name → _id map
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // 5️⃣ Attach category _id to products
    const productsWithCategory = productsData.map((product) => ({
      name: product.name,
      price: product.price,
      category: categoryMap[product.categoryName],
    }));

    // 6️⃣ Insert products
    await Product.insertMany(productsWithCategory);
    console.log("Products inserted");

    // 7️⃣ Exit process
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
