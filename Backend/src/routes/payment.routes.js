const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth.middleware");
const { createOrder, verifyPayment } = require("../controllers/payment.controller");



router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);


module.exports = router;
