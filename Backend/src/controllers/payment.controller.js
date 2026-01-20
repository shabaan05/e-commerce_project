const Order = require("../models/order.model");

// INITIATE PAYMENT
exports.initiatePayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    if (!orderId)
      return res.status(400).json({ message: "Order ID is required" });

    const order = await Order.findOne({ _id: orderId, user: req.user.id });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    if (order.paymentStatus === "paid")
      return res.status(400).json({ message: "Order already paid" });

    // For mock payment, we just return a success token
    res.json({
      message: "Payment initiated",
      orderId: order._id,
      amount: order.totalAmount,
      paymentMethod: paymentMethod || "mock",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CONFIRM PAYMENT (MOCK)
exports.confirmPayment = async (req, res) => {
  try {
    const { orderId, success, paymentMethod } = req.body;

    if (!orderId)
      return res.status(400).json({ message: "Order ID is required" });

    const order = await Order.findOne({ _id: orderId, user: req.user.id });

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    if (success) {
      order.paymentStatus = "paid";
      order.paymentMethod = paymentMethod || "mock";
      await order.save();
      return res.json({ message: "Payment successful", order });
    } else {
      order.paymentStatus = "failed";
      await order.save();
      return res.json({ message: "Payment failed", order });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
