const Country = require('../models/Country');
const Chapter = require('../models/Chapter');

// ─────────────────────────────────────────
// @desc    Get all countries
// @route   GET /api/countries
// @access  Public
// ─────────────────────────────────────────
exports.getCountries = async (req, res, next) => {
  try {
    const { region, featured, active = 'true' } = req.query;

    const query = {};
    if (active !== undefined) query.isActive = active === 'true';
    if (region) query.region = region;
    if (featured === 'true') query.isFeatured = true;

    const countries = await Country.find(query).sort({ name: 1 }).lean();

    res.status(200).json({ success: true, data: countries });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get country by slug with chapters
// @route   GET /api/countries/:slug
// @access  Public
// ─────────────────────────────────────────
exports.getCountry = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const country = await Country.findOne({
      $or: [{ slug }, { code: slug.toUpperCase() }],
      isActive: true,
    });

    if (!country) {
      return res.status(404).json({ success: false, message: 'Country not found' });
    }

    // Fetch chapters for this country
    const chapters = await Chapter.find({ country: country._id, isActive: true })
      .sort({ isFeatured: -1, name: 1 })
      .select('name city slug meetingSchedule contactPerson memberCount isFeatured')
      .lean();

    // Update chapter count
    country.chapterCount = chapters.length;

    res.status(200).json({
      success: true,
      data: {
        ...country.toObject(),
        chapters,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create country (admin only)
// @route   POST /api/countries
// @access  Private/Admin
// ─────────────────────────────────────────
exports.createCountry = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json({ success: true, data: country });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update country
// @route   PUT /api/countries/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.updateCountry = async (req, res, next) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!country) {
      return res.status(404).json({ success: false, message: 'Country not found' });
    }

    res.status(200).json({ success: true, data: country });
  } catch (error) {
    next(error);
  }
};
