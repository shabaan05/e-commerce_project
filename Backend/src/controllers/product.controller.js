const Product = require("../models/product.model");

// GET all products + category filter (Day 13)
const getAllProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, page = 1,
      limit = 10,
      sort } = req.query;

    // build query dynamically
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
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    // 5️⃣ Optional: total count for frontend pagination
    const totalProducts = await Product.countDocuments(query);

    // 6️⃣ Return response
    res.status(200).json({
      page: Number(page),
      limit: Number(limit),
      totalProducts,
      products
    });
    //....
    // const products = await Product.find(query);
    // res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// GET product by id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// POST create product admin only
const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price)
      return res.status(400).json({ message: "Name & price required" });

    const product = await Product.create({ name, price, category });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};
