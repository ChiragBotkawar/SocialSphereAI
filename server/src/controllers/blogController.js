const BlogPost = require('../models/BlogPost');
const { validationResult } = require('express-validator');

// ─────────────────────────────────────────
// @desc    Get all blog posts (published)
// @route   GET /api/blog
// @access  Public
// ─────────────────────────────────────────
exports.getBlogPosts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      tag,
      country,
      featured,
      page = 1,
      limit = 9,
      sort = '-publishedAt',
    } = req.query;

    const query = { status: 'published' };
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(30, Math.max(1, parseInt(limit)));
    const skip = (pageNum - 1) * limitNum;

    if (search) query.$text = { $search: search };
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag.toLowerCase()] };
    if (country) query.country = country;
    if (featured === 'true') query.isFeatured = true;

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate('author', 'firstName lastName avatar')
        .select('-content -relatedPosts')
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: posts,
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
// @desc    Get blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
// ─────────────────────────────────────────
exports.getBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'firstName lastName avatar profession')
      .populate('country', 'name slug')
      .populate({
        path: 'relatedPosts',
        match: { status: 'published' },
        select: 'title slug excerpt coverImage category publishedAt readTime',
        populate: { path: 'author', select: 'firstName lastName' },
      });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    // Increment view count (fire and forget)
    BlogPost.findByIdAndUpdate(post._id, { $inc: { viewCount: 1 } }).exec();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Create blog post (admin only)
// @route   POST /api/blog
// @access  Private/Admin
// ─────────────────────────────────────────
exports.createBlogPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const post = await BlogPost.create({ ...req.body, author: req.user.id });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.updateBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
// ─────────────────────────────────────────
exports.deleteBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { status: 'archived' },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.status(200).json({ success: true, message: 'Blog post archived' });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────
// @desc    Get blog categories with counts
// @route   GET /api/blog/categories
// @access  Public
// ─────────────────────────────────────────
exports.getBlogCategories = async (req, res, next) => {
  try {
    const categories = await BlogPost.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};
