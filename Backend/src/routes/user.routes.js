const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);

router.post("/address", protect, userController.addAddress);
router.put("/address/:addressId", protect, userController.updateAddress);
router.delete("/address/:addressId", protect, userController.deleteAddress);

module.exports = router;
