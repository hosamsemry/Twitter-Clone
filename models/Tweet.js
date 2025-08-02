const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: {type: String,  maxlength: 280,  required: function () {return !this.retweetOf;}},
  media: { type: String },
  hashtags: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  retweetOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    default: null,
  },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

tweetSchema.virtual('bookmarkCount', {
  ref: 'User',
  localField: '_id',
  foreignField: 'bookmarks',
  count: true
});

tweetSchema.set('toObject', { virtuals: true });
tweetSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Tweet', tweetSchema);
