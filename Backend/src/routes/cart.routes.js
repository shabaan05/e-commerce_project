const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Destructure protect from auth.middleware
const { protect } = require('../middlewares/auth.middleware');

// Add product to cart
router.post('/', protect, cartController.addToCart);

// Remove product from cart
router.delete('/:productId', protect, cartController.removeFromCart);

// Update product quantity
router.put('/', protect, cartController.updateCart);
    
// Get user cart
router.get('/', protect, cartController.getCart);

module.exports = router;
