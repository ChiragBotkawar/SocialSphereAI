const express = require('express');
const { body } = require('express-validator');
const {
  submitContact,
  getContactMessages,
  updateContactStatus,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const { formRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 200 }),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 5000 }),
];

router.post('/', formRateLimiter, contactValidation, submitContact);
router.get('/', protect, authorize('admin'), getContactMessages);
router.patch('/:id', protect, authorize('admin'), updateContactStatus);

module.exports = router;
