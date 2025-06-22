const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

router.post(
  '/',
  protect,
  adminOnly,
  upload.single('image'),
  (req, res) => {
    res.send({
      imageUrl: `/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;
