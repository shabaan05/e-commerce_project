const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
connectDB();  // connect DB first

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
