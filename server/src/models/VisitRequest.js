const mongoose = require('mongoose');

const visitRequestSchema = new mongoose.Schema(
  {
    // Visitor info
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format'],
    },
    phone: {
      type: String,
      trim: true,
    },
    profession: {
      type: String,
      required: [true, 'Profession is required'],
      trim: true,
      maxlength: 100,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    city: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    // Chapter reference
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter',
      required: [true, 'Chapter is required'],
    },
    // Preferred visit date
    preferredDate: {
      type: Date,
      default: null,
    },
    // Request status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'declined', 'attended', 'no_show'],
      default: 'pending',
    },
    // Notes from chapter leader
    chapterNotes: {
      type: String,
      trim: true,
    },
    // IP address for rate limiting / spam detection
    ipAddress: {
      type: String,
    },
    // Notification tracking
    visitorEmailSent: {
      type: Boolean,
      default: false,
    },
    leaderEmailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: full name
visitRequestSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

visitRequestSchema.index({ chapter: 1, status: 1 });
visitRequestSchema.index({ email: 1 });
visitRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model('VisitRequest', visitRequestSchema);
