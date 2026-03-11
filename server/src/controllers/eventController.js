const Event = require('../models/Event');
const { validationResult } = require('express-validator');

// ─────────────────────────────────────────
// @desc    Get all events
// @route   GET /api/events
// @access  Public
// ─────────────────────────────────────────
exports.getEvents = async (req, res, next) => {
  try {
    const {
      type,
      format,
      country,
      featured,
      status = 'upcoming',
      page = 1,
      limit = 9,
      sort = 'startDate',
    } = req.query;

    const query = {};
    if (status) query.status = status;
    if (type) query.eventType = type;
    if (format) query.format = format;
    if (country) query.country = country;
    if (featured === 'true') query.isFeatured = true;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(30, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [events, total] = await Promise.all([
      Event.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate('country', 'name code flag slug')
        .select('-agenda -speakers')
        .lean(),
      Event.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: events,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get single event
// @route   GET /api/events/:slug
// @access  Public
// ─────────────────────────────────────────
exports.getEvent = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);

    const event = await Event.findOne(
      isObjectId ? { _id: slug } : { slug }
    )
      .populate('country', 'name code flag slug')
      .populate('chapter', 'name city');

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create event
// @route   POST /api/events
// @access  Private/Admin
// ─────────────────────────────────────────
exports.createEvent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.deleteEvent = async (req, res, next) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.status(200).json({ success: true, message: 'Event cancelled' });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get featured upcoming events
// @route   GET /api/events/featured
// @access  Public
// ─────────────────────────────────────────
exports.getFeaturedEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ isFeatured: true, status: 'upcoming' })
      .sort('startDate')
      .limit(6)
      .populate('country', 'name code flag')
      .lean();

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};
