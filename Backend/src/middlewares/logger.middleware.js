const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next(); // move to next middleware/controller
};

module.exports = logger;
