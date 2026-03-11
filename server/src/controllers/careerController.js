const Career = require('../models/Career');

// ─────────────────────────────────────────
// @desc    Get all open careers
// @route   GET /api/careers
// @access  Public
// ─────────────────────────────────────────
exports.getCareers = async (req, res, next) => {
  try {
    const { department, employmentType, remote } = req.query;

    const query = { status: 'open' };
    if (department) query.department = department;
    if (employmentType) query.employmentType = employmentType;
    if (remote === 'true') query['location.isRemote'] = true;

    const careers = await Career.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get career by slug
// @route   GET /api/careers/:slug
// @access  Public
// ─────────────────────────────────────────
exports.getCareer = async (req, res, next) => {
  try {
    const career = await Career.findOne({ slug: req.params.slug, status: 'open' });

    if (!career) {
      return res.status(404).json({ success: false, message: 'Career listing not found' });
    }

    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create career listing (admin)
// @route   POST /api/careers
// @access  Private/Admin
// ─────────────────────────────────────────
exports.createCareer = async (req, res, next) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update career
// @route   PUT /api/careers/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!career) {
      return res.status(404).json({ success: false, message: 'Career not found' });
    }

    res.status(200).json({ success: true, data: career });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete career
// @route   DELETE /api/careers/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.deleteCareer = async (req, res, next) => {
  try {
    await Career.findByIdAndUpdate(req.params.id, { status: 'closed' });
    res.status(200).json({ success: true, message: 'Career listing closed' });
  } catch (error) {
    next(error);
  }
};
