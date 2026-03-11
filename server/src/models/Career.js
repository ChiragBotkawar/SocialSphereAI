const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: 150,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    department: {
      type: String,
      required: true,
      enum: ['Technology', 'Marketing', 'Operations', 'Finance', 'Human Resources', 'Sales', 'Training', 'Executive'],
    },
    location: {
      city: { type: String, trim: true },
      country: { type: String, trim: true },
      isRemote: { type: Boolean, default: false },
    },
    employmentType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
      default: 'Full-Time',
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    responsibilities: [String],
    requirements: [String],
    niceToHave: [String],
    benefits: [String],
    salary: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'USD' },
      isPublic: { type: Boolean, default: false },
    },
    applicationDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'on_hold'],
      default: 'open',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    applicationEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    applicationUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

careerSchema.index({ status: 1, department: 1 });

// Auto-generate slug
careerSchema.pre('save', async function (next) {
  if (!this.isModified('title')) return next();
  const slugify = require('slugify');
  const baseSlug = slugify(this.title, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;
  while (await mongoose.model('Career').findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${baseSlug}-${count++}`;
  }
  this.slug = slug;
  next();
});

module.exports = mongoose.model('Career', careerSchema);
