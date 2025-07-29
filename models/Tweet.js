const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: {type: String,  maxlength: 280,  required: function () {return !this.retweetOf;}},
  media: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
  retweetOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);
