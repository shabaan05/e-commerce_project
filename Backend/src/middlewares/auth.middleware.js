const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Protect middleware – verifies token and attaches full user to req.user
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    // Decode token to get user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch full user from DB (includes role, name, email, etc.)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user object to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin middleware – allows only admin users
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // user is admin, allow access
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { protect, admin };
