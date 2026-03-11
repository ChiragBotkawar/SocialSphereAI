const ContactMessage = require('../models/ContactMessage');
const { validationResult } = require('express-validator');
const emailConfig = require('../config/email');

// ─────────────────────────────────────────
// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
// ─────────────────────────────────────────
exports.submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, subject, message, inquiryType, country } = req.body;

    const contactMsg = await ContactMessage.create({
      name,
      email: email.toLowerCase(),
      phone,
      subject,
      message,
      inquiryType: inquiryType || 'General',
      country,
      ipAddress: req.ip,
    });

    // Send acknowledgement email (non-blocking)
    try {
      await emailConfig.sendContactAcknowledgement({ name, email, subject });
      contactMsg.acknowledgementSent = true;
      await contactMsg.save({ validateBeforeSave: false });
    } catch (emailErr) {
      console.error('Contact acknowledgement email failed:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you within 2 business days.',
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get all contact messages (admin only)
// @route   GET /api/contact
// @access  Private/Admin
// ─────────────────────────────────────────
exports.getContactMessages = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (status) query.status = status;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [messages, total] = await Promise.all([
      ContactMessage.find(query)
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNum)
        .lean(),
      ContactMessage.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: messages,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update contact message status
// @route   PATCH /api/contact/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status, ...(adminNotes && { adminNotes }), ...(req.user && { assignedTo: req.user.id }) },
      { new: true }
    );

    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({ success: true, data: msg });
  } catch (error) {
    next(error);
  }
};
