
const Razorpay = require("razorpay");
const crypto = require("crypto");


const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// verify payments
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully"
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };



