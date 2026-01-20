const User = require("../models/user.model");

// GET PROFILE
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const { name, phone } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name, phone },
    { new: true }
  ).select("-password");

  res.json({ message: "Profile updated", user });
};

// ADD ADDRESS
exports.addAddress = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (req.body.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  user.addresses.push(req.body);
  await user.save();

  res.json({ message: "Address added", addresses: user.addresses });
};

// UPDATE ADDRESS
exports.updateAddress = async (req, res) => {
  const user = await User.findById(req.user.id);
  const address = user.addresses.id(req.params.addressId);

  if (!address)
    return res.status(404).json({ message: "Address not found" });

  if (req.body.isDefault) {
    user.addresses.forEach(addr => addr.isDefault = false);
  }

  Object.assign(address, req.body);
  await user.save();

  res.json({ message: "Address updated", addresses: user.addresses });
};

// DELETE ADDRESS
exports.deleteAddress = async (req, res) => {
  const user = await User.findById(req.user.id);

  user.addresses = user.addresses.filter(
    addr => addr._id.toString() !== req.params.addressId
  );

  await user.save();
  res.json({ message: "Address deleted", addresses: user.addresses });
};
