/**
 * AppError – represents an operational (expected) error.
 * Only instances of this class are considered "known" errors;
 * everything else is treated as a programming/unknown error.
 *
 * Usage:
 *   throw new AppError("User not found", 404);
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // distinguishes AppError from unexpected errors

    // Capture a clean stack trace that excludes this constructor frame
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
