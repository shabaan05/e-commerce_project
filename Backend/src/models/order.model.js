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
    shippingAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
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
      enum: ["pending", "paid", "failed"], 
    },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1 });

orderSchema.index({ createdAt: -1 });

orderSchema.index({ orderStatus: 1 });

module.exports = mongoose.model("Order", orderSchema);
