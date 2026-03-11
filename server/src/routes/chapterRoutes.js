const express = require('express');
const {
  getChapters,
  getChapter,
  createChapter,
  updateChapter,
  deleteChapter,
  getFeaturedChapters,
} = require('../controllers/chapterController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/featured', getFeaturedChapters);
router.get('/', getChapters);
router.get('/:id', getChapter);
router.post('/', protect, authorize('admin'), createChapter);
router.put('/:id', protect, authorize('admin', 'chapter_leader'), updateChapter);
router.delete('/:id', protect, authorize('admin'), deleteChapter);

module.exports = router;
