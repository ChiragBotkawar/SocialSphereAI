const express = require('express');
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogCategories,
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/categories', getBlogCategories);
router.get('/', getBlogPosts);
router.get('/:slug', getBlogPost);
router.post('/', protect, authorize('admin'), createBlogPost);
router.put('/:id', protect, authorize('admin'), updateBlogPost);
router.delete('/:id', protect, authorize('admin'), deleteBlogPost);

module.exports = router;
