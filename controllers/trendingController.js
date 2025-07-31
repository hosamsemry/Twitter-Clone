const Tweet = require('../models/Tweet');

exports.trendingHashtags = async (req, res) => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const trends = await Tweet.aggregate([
      { $match: { createdAt: { $gte: oneDayAgo } } },
      { $unwind: "$hashtags" },
      { $group: { _id: "$hashtags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trends" });
  }
};

exports.getTweetsByHashtag = async (req, res) => {
  try {
    const tag = req.params.tag;
    
    const tweets = await Tweet.find({ hashtags: { $regex: tag, $options: 'i' } })
      .populate('author', 'username avatar bio')
      .sort({ createdAt: -1 });

    res.json(tweets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tweets for hashtag" });
  }
};