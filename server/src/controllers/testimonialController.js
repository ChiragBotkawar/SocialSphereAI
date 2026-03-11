const Testimonial = require('../models/Testimonial');

// ─────────────────────────────────────────
// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
// ─────────────────────────────────────────
exports.getTestimonials = async (req, res, next) => {
  try {
    const { featured, country, category, limit = 10 } = req.query;

    const query = { isActive: true };
    if (featured === 'true') query.isFeatured = true;
    if (country) query.country = country;
    if (category) query.category = category;

    const testimonials = await Testimonial.find(query)
      .sort({ order: 1, createdAt: -1 })
      .limit(Math.min(50, parseInt(limit)))
      .populate('country', 'name code flag')
      .populate('chapter', 'name city')
      .lean();

    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create testimonial (admin only)
// @route   POST /api/testimonials
// @access  Private/Admin
// ─────────────────────────────────────────
exports.createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ success: true, message: 'Testimonial removed' });
  } catch (error) {
    next(error);
  }
};
