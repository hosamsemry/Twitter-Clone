const Tweet = require('../models/Tweet');
const User = require('../models/User');

exports.getUserFeed = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: 'User not found.' });

    const following = [...user.following, user._id]; 

    const tweets = await Tweet.find({ author: { $in: following },isDeleted:false })
      .sort({ createdAt: -1 })
      .select('content likes likesCount createdAt author') 
      .populate('author', 'username profilePicture') 
      .limit(50);

    res.json(tweets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

