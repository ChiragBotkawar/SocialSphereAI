const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    authorName: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      maxlength: 100,
    },
    authorTitle: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    authorCompany: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    authorPhoto: {
      type: String,
      default: null,
    },
    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
      trim: true,
      maxlength: [1000, 'Testimonial cannot exceed 1000 characters'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    category: {
      type: String,
      enum: ['Member Success', 'Chapter Growth', 'Business Referral', 'Leadership', 'Networking'],
      default: 'Member Success',
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      default: null,
    },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      default: null,
    },
    businessRevenue: {
      type: String, // e.g., "$50,000+"
      trim: true,
    },
    yearsAsMember: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

testimonialSchema.index({ isFeatured: 1, isActive: 1 });
testimonialSchema.index({ country: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
