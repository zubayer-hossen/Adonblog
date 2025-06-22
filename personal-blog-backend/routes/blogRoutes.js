const express = require('express');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Admin protected routes
router.post('/', protect, adminOnly, createBlog);
router.put('/:id', protect, adminOnly, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

module.exports = router;
