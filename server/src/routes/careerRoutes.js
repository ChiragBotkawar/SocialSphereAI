const express = require('express');
const {
  getCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/careerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCareers);
router.get('/:slug', getCareer);
router.post('/', protect, authorize('admin'), createCareer);
router.put('/:id', protect, authorize('admin'), updateCareer);
router.delete('/:id', protect, authorize('admin'), deleteCareer);

module.exports = router;
