const express = require('express');
const {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
} = require('../controllers/countryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCountries);
router.get('/:slug', getCountry);
router.post('/', protect, authorize('admin'), createCountry);
router.put('/:id', protect, authorize('admin'), updateCountry);

module.exports = router;
