const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 280 },
  media: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);
