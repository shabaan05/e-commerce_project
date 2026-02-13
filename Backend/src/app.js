const express = require("express");
const productRoutes = require("./routes/product.routes");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");
const app = express();
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

// Allow frontend running on port 3000 (React/Vite)
app.use(cors({ origin: "http://localhost:5173" }));

// middleware to parse JSON
app.use(express.json());
// logger middleware
app.use(logger);
// health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
//..
app.use("/api/categories", categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);
module.exports = app;
