const Tweet = require('../models/Tweet');


exports.createTweet = async (req, res) => {
  try {
    const tweet = await Tweet.create({
      author: req.userId,
      content: req.body.content,
      media: req.body.media
    });
    res.status(201).json(tweet);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar', '');
    res.json(tweets);
    console.log(tweets)
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTweetById = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
      .populate('author', 'username avatar');
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });
    res.json(tweet);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });
    if (tweet.author.toString() !== req.userId)
      return res.status(403).json({ msg: 'Not authorized' });

    await tweet.deleteOne();
    res.json({ msg: 'Tweet deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });

    const liked = tweet.likes.includes(req.userId);
    if (liked) {
      tweet.likes.pull(req.userId);
        tweet.likesCount = Math.max(0, tweet.likesCount - 1);
    } else {
      tweet.likes.push(req.userId);
        tweet.likesCount += 1;
    }

    await tweet.save();
    res.json({ liked: !liked, likesCount: tweet.likes.length });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
