/**
 * asyncHandler – wraps async route handlers to eliminate repetitive try-catch blocks.
 * Any thrown error is forwarded to Express's next() for centralized handling.
 *
 * Usage:
 *   exports.myController = asyncHandler(async (req, res, next) => { ... });
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
