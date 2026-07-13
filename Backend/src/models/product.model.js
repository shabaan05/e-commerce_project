const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: "" },
  images: [{ type: String }], // array of image URLs
  countInStock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

}, { timestamps: true });

productSchema.index({ name: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });


module.exports = mongoose.model("Product", productSchema);
