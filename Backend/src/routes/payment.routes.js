const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { protect } = require("../middlewares/auth.middleware");

// Initiate payment
router.post("/initiate", protect, paymentController.initiatePayment);

// Confirm payment (success/failure)
router.post("/confirm", protect, paymentController.confirmPayment);

module.exports = router;
