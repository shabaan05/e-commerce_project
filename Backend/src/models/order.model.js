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
    orderStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "shipped", "delivered"], // ✅ restrict to allowed values
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed"], // ✅ restrict to allowed values
    },
    paymentMethod: {
      type: String,
      enum: ["card", "UPI", "mock"], // optional: restrict payment methods
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
