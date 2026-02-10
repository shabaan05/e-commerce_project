const express = require("express");
const router = express.Router();
const {createOrder} = require("../controllers/payment.controller")
const { protect } = require("../middlewares/auth.middleware");
router.post("/create-order", createOrder);


module.exports = router;
