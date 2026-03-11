const express = require('express');
const { body } = require('express-validator');
const {
  createVisitRequest,
  getVisitRequests,
  updateVisitRequestStatus,
} = require('../controllers/visitRequestController');
const { protect, authorize } = require('../middleware/auth');
const { formRateLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

const visitRequestValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required').isLength({ max: 50 }),
  body('lastName').trim().notEmpty().withMessage('Last name is required').isLength({ max: 50 }),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('profession').trim().notEmpty().withMessage('Profession is required').isLength({ max: 100 }),
  body('chapterId').notEmpty().isMongoId().withMessage('Valid chapter ID is required'),
  body('message').optional().trim().isLength({ max: 1000 }),
];

router.post('/', formRateLimiter, visitRequestValidation, createVisitRequest);
router.get('/', protect, authorize('admin', 'chapter_leader'), getVisitRequests);
router.patch('/:id/status', protect, authorize('admin', 'chapter_leader'), updateVisitRequestStatus);

module.exports = router;
