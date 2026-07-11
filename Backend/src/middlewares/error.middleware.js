const AppError = require("../utils/AppError");

/**
 * Centralized error handling middleware.
 * Must be registered LAST in app.js after all routes.
 *
 * Handles:
 *  - AppError (operational errors with a known statusCode)
 *  - Mongoose ValidationError  → 400
 *  - Mongoose CastError        → 400 (bad ObjectId)
 *  - Mongoose duplicate key    → 400 (code 11000)
 *  - JWT JsonWebTokenError     → 401
 *  - JWT TokenExpiredError     → 401
 *  - Unknown errors            → 500 (message hidden in production)
 */
const errorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // --- Mongoose: bad ObjectId (e.g. findById with malformed id) ---
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // --- Mongoose: validation error ---
  if (err.name === "ValidationError") {
    statusCode = 400;
    const errors = Object.values(err.errors).map((e) => e.message);
    message = `Validation failed: ${errors.join(", ")}`;
  }

  // --- Mongoose: duplicate key error ---
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value for ${field}. Please use a different value.`;
  }

  // --- JWT: invalid token ---
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  }

  // --- JWT: expired token ---
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  }

  // Log stack trace for non-operational / unknown errors
  if (!err.isOperational) {
    console.error("UNHANDLED ERROR:", err);
  }

  // Build response — hide internal details in production
  const response = { message };

  if (process.env.NODE_ENV !== "production" && !err.isOperational) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
