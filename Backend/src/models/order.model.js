const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    razorpayOrderId: String,
  razorpayPaymentId: String,
   orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed"], // ✅ restrict to allowed values
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
