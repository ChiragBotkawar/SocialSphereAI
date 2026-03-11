const VisitRequest = require('../models/VisitRequest');
const Chapter = require('../models/Chapter');
const { validationResult } = require('express-validator');
const emailConfig = require('../config/email');

// ─────────────────────────────────────────
// @desc    Submit a visit request
// @route   POST /api/visit-requests
// @access  Public
// ─────────────────────────────────────────
exports.createVisitRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { firstName, lastName, email, phone, profession, company, city, message, chapterId, preferredDate } = req.body;

    // Verify chapter exists
    const chapter = await Chapter.findOne({ _id: chapterId, isActive: true })
      .populate('country', 'name');

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    // Check for duplicate requests (same email + chapter within 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const duplicate = await VisitRequest.findOne({
      email: email.toLowerCase(),
      chapter: chapterId,
      createdAt: { $gte: sevenDaysAgo },
    });

    if (duplicate) {
      return res.status(429).json({
        success: false,
        message: 'You have already submitted a visit request for this chapter recently.',
      });
    }

    // Create visit request
    const visitRequest = await VisitRequest.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      profession,
      company,
      city,
      message,
      chapter: chapterId,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      ipAddress: req.ip,
    });

    // Send emails (non-blocking — failures won't reject the request)
    try {
      await emailConfig.sendVisitRequestConfirmation({
        visitorEmail: email,
        visitorName: `${firstName} ${lastName}`,
        chapterName: chapter.name,
        meetingDate: preferredDate,
      });
      visitRequest.visitorEmailSent = true;
    } catch (emailErr) {
      console.error('Visitor confirmation email failed:', emailErr.message);
    }

    if (chapter.contactPerson?.email) {
      try {
        await emailConfig.sendVisitRequestToChapterLeader({
          leaderEmail: chapter.contactPerson.email,
          leaderName: chapter.contactPerson.name || 'Chapter Leader',
          visitorName: `${firstName} ${lastName}`,
          visitorEmail: email,
          visitorPhone: phone,
          visitorProfession: profession,
          chapterName: chapter.name,
          message,
        });
        visitRequest.leaderEmailSent = true;
      } catch (emailErr) {
        console.error('Chapter leader email failed:', emailErr.message);
      }
    }

    await visitRequest.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: 'Visit request submitted successfully! Check your email for confirmation.',
      data: {
        id: visitRequest._id,
        chapterName: chapter.name,
        status: visitRequest.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get visit requests (admin/chapter leader)
// @route   GET /api/visit-requests
// @access  Private/Admin
// ─────────────────────────────────────────
exports.getVisitRequests = async (req, res, next) => {
  try {
    const { chapter, status, page = 1, limit = 20 } = req.query;

    const query = {};
    if (chapter) query.chapter = chapter;
    if (status) query.status = status;

    // Chapter leaders can only see their own chapter's requests
    if (req.user.role === 'chapter_leader' && req.user.chapter) {
      query.chapter = req.user.chapter;
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [requests, total] = await Promise.all([
      VisitRequest.find(query)
        .sort('-createdAt')
        .skip(skip)
        .limit(limitNum)
        .populate('chapter', 'name city'),
      VisitRequest.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: requests,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update visit request status
// @route   PATCH /api/visit-requests/:id/status
// @access  Private/Admin or Chapter Leader
// ─────────────────────────────────────────
exports.updateVisitRequestStatus = async (req, res, next) => {
  try {
    const { status, chapterNotes } = req.body;

    const allowedStatuses = ['pending', 'confirmed', 'declined', 'attended', 'no_show'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const visitRequest = await VisitRequest.findByIdAndUpdate(
      req.params.id,
      { status, ...(chapterNotes && { chapterNotes }) },
      { new: true }
    ).populate('chapter', 'name city');

    if (!visitRequest) {
      return res.status(404).json({ success: false, message: 'Visit request not found' });
    }

    res.status(200).json({ success: true, data: visitRequest });
  } catch (error) {
    next(error);
  }
};
