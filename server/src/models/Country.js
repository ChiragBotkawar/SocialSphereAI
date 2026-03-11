const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Country name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    code: {
      type: String, // ISO 3166-1 alpha-2 (e.g., "IN", "US", "GB")
      required: true,
      uppercase: true,
      trim: true,
      maxlength: 3,
    },
    flag: {
      type: String, // URL or emoji
      trim: true,
    },
    region: {
      type: String,
      enum: ['Asia Pacific', 'Europe', 'North America', 'Latin America', 'Middle East & Africa', 'South Asia'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    heroImage: {
      type: String,
      default: null,
    },
    chapterCount: {
      type: Number,
      default: 0,
    },
    memberCount: {
      type: Number,
      default: 0,
    },
    nationalDirector: {
      name: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      photo: { type: String },
    },
    website: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    stats: {
      totalReferrals: { type: Number, default: 0 },
      totalRevenue: { type: String, default: '0' },
      yearsActive: { type: Number, default: 0 },
    },
    socialLinks: {
      facebook: { type: String, trim: true },
      twitter: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      instagram: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

countrySchema.index({ code: 1 });
countrySchema.index({ name: 'text' });

module.exports = mongoose.model('Country', countrySchema);
