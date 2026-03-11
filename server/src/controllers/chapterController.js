const Chapter = require('../models/Chapter');
const { validationResult } = require('express-validator');

// ─────────────────────────────────────────
// @desc    Get all chapters (with search & filter)
// @route   GET /api/chapters
// @access  Public
// ─────────────────────────────────────────
exports.getChapters = async (req, res, next) => {
  try {
    const {
      search,
      city,
      country,
      zipCode,
      lat,
      lng,
      radius = 50, // km
      page = 1,
      limit = 12,
      sort = '-createdAt',
      featured,
    } = req.query;

    const query = { isActive: true };
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // City filter
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    // Country filter (by ObjectId or slug)
    if (country) {
      // Assume it could be an ObjectId or country name - handle both
      const Country = require('../models/Country');
      const countryDoc = await Country.findOne({
        $or: [{ slug: country.toLowerCase() }, { code: country.toUpperCase() }],
      });
      if (countryDoc) query.country = countryDoc._id;
    }

    // Zip code filter
    if (zipCode) {
      query.zipCode = { $regex: zipCode, $options: 'i' };
    }

    // Featured filter
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Geospatial search (near coordinates)
    let chaptersQuery;
    if (lat && lng) {
      chaptersQuery = Chapter.find({
        ...query,
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
            $maxDistance: parseFloat(radius) * 1000, // convert km to meters
          },
        },
      });
    } else {
      chaptersQuery = Chapter.find(query).sort(sort);
    }

    const [chapters, total] = await Promise.all([
      chaptersQuery
        .skip(skip)
        .limit(limitNum)
        .populate('country', 'name code flag slug')
        .select('-members')
        .lean(),
      Chapter.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: chapters,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get single chapter by ID or slug
// @route   GET /api/chapters/:id
// @access  Public
// ─────────────────────────────────────────
exports.getChapter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);

    const chapter = await Chapter.findOne(
      isObjectId ? { _id: id, isActive: true } : { slug: id, isActive: true }
    )
      .populate('country', 'name code flag slug')
      .populate('members', 'firstName lastName profession company avatar');

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    res.status(200).json({ success: true, data: chapter });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create chapter (admin only)
// @route   POST /api/chapters
// @access  Private/Admin
// ─────────────────────────────────────────
exports.createChapter = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const chapter = await Chapter.create(req.body);
    await chapter.populate('country', 'name code flag slug');

    res.status(201).json({ success: true, data: chapter });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update chapter
// @route   PUT /api/chapters/:id
// @access  Private/Admin or Chapter Leader
// ─────────────────────────────────────────
exports.updateChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('country', 'name code flag slug');

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    res.status(200).json({ success: true, data: chapter });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete chapter
// @route   DELETE /api/chapters/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.deleteChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }
    // Soft delete
    chapter.isActive = false;
    await chapter.save();

    res.status(200).json({ success: true, message: 'Chapter deactivated successfully' });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get featured chapters
// @route   GET /api/chapters/featured
// @access  Public
// ─────────────────────────────────────────
exports.getFeaturedChapters = async (req, res, next) => {
  try {
    const chapters = await Chapter.find({ isActive: true, isFeatured: true })
      .limit(6)
      .populate('country', 'name code flag slug')
      .select('-members')
      .lean();

    res.status(200).json({ success: true, data: chapters });
  } catch (error) {
    next(error);
  }
};
