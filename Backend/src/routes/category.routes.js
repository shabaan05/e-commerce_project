const express = require("express");
const { getAllCategories, createCategory } = require("../controllers/category.controller");
const { protect, admin } = require("../middlewares/auth.middleware");


const router = express.Router();

router.get("/", getAllCategories);
router.post("/", protect, admin, createCategory);


module.exports = router;
