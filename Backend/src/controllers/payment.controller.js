
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/order.model");


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
      razorpay_signature,
      orderId // our DB order ID
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

      await Order.findByIdAndUpdate(orderId, {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus: "paid"
      });

      return res.json({
        success: true,
        message: "Payment verified and order updated"
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

//..

const createOrderInDB = async (req, res) => {
  try {
    const { items, totalAmount, userId } = req.body;

    const order = await Order.create({
      user: req.user.id,   // 🔥 safer

      items,
      totalAmount,
      paymentStatus: "pending"
    });
console.log("Incoming body:", req.body);

    res.status(201).json(order);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};
//..
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
};
//..
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order" });
  }
};
//..
const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};


module.exports = { createOrder, verifyPayment, createOrderInDB, getUserOrders,updateOrderStatus,getAllOrders };



