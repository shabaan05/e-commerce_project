
const { default: mongoose } = require("mongoose");
const app = require("./app");
require("dotenv").config({ path: "../.env" });

const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
connectDB();  // connect DB first
console.log("Connected to DB:", mongoose.connection.name);
console.log(process.env.RAZORPAY_KEY_ID);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
