const User = require('../models/User');
const Tweet = require('../models/Tweet');

exports.toggleBookmark = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const user = await User.findById(req.userId);

    const index = user.bookmarks.indexOf(tweetId);

    if (index === -1) {
      user.bookmarks.push(tweetId);
      await user.save();
      return res.status(200).json({ msg: 'Tweet bookmarked', bookmarked: true });
    } else {
      user.bookmarks.splice(index, 1);
      await user.save();
      return res.status(200).json({ msg: 'Bookmark removed', bookmarked: false });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'bookmarks',
      populate: { path: 'author', select: 'username avatar' }
    });

    res.json(user.bookmarks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
