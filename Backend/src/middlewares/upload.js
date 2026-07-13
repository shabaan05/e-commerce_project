const multer = require("multer");

// Use memory storage — we upload the buffer to Cloudinary manually in the controller.
// This avoids the multer-storage-cloudinary v4 / multer v2 compatibility issue.
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB cap
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, jpeg, png, webp images are allowed"), false);
    }
  },
});

module.exports = upload;
