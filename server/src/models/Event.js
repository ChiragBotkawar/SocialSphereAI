const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    coverImage: {
      type: String,
      default: null,
    },
    eventType: {
      type: String,
      enum: ['Global Conference', 'Local Event', 'Training Event', 'Webinar', 'Workshop', 'Networking'],
      required: true,
    },
    format: {
      type: String,
      enum: ['In-Person', 'Online', 'Hybrid'],
      required: true,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    registrationDeadline: {
      type: Date,
    },
    venue: {
      name: { type: String, trim: true },
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      country: { type: String, trim: true },
      onlineLink: { type: String, trim: true },
    },
    capacity: {
      type: Number,
      default: null,
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    price: {
      amount: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
      isFree: { type: Boolean, default: true },
    },
    speakers: [
      {
        name: { type: String, trim: true },
        title: { type: String, trim: true },
        bio: { type: String, trim: true },
        photo: { type: String },
      },
    ],
    agenda: [
      {
        time: { type: String, trim: true },
        title: { type: String, trim: true },
        description: { type: String, trim: true },
        speaker: { type: String, trim: true },
      },
    ],
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
    tags: [String],
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    registrationUrl: {
      type: String,
      trim: true,
    },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.index({ startDate: 1, status: 1 });
eventSchema.index({ eventType: 1 });
eventSchema.index({ title: 'text', description: 'text' });

// Auto-generate slug
eventSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();
  const slugify = require('slugify');
  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;
  while (await mongoose.model('Event').findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${count++}`;
  }
  this.slug = slug;
  next();
});

module.exports = mongoose.model('Event', eventSchema);
