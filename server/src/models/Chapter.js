const mongoose = require('mongoose');

const meetingScheduleSchema = new mongoose.Schema(
  {
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    time: {
      type: String, // e.g. "7:00 AM"
      required: true,
    },
    frequency: {
      type: String,
      enum: ['Weekly', 'Bi-weekly', 'Monthly'],
      default: 'Weekly',
    },
    venue: {
      type: String,
      trim: true,
    },
    venueAddress: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Chapter name is required'],
      trim: true,
      maxlength: [100, 'Chapter name cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Country',
      required: [true, 'Country is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    meetingSchedule: meetingScheduleSchema,
    contactPerson: {
      name: { type: String, trim: true },
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
    },
    website: {
      type: String,
      trim: true,
    },
    memberCount: {
      type: Number,
      default: 0,
    },
    foundedYear: {
      type: Number,
    },
    category: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      default: null,
    },
    coverImage: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    tags: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Geospatial index for location-based searches
chapterSchema.index({ location: '2dsphere' });
chapterSchema.index({ city: 1 });
chapterSchema.index({ country: 1 });
chapterSchema.index({ name: 'text', city: 'text', description: 'text' });

// Auto-generate slug before saving
chapterSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();
  const slugify = require('slugify');
  const baseSlug = slugify(this.name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;
  while (await mongoose.model('Chapter').findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${count++}`;
  }
  this.slug = slug;
  next();
});

module.exports = mongoose.model('Chapter', chapterSchema);
