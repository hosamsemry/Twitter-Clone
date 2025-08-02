const Tweet = require('../models/Tweet');
const extractHashtags = require('../utils/extractHashtags')
const Notification = require('../models/Notification')

exports.createTweet = async (req, res) => {
  try {

    const { content, media } = req.body;
    const hashtags = extractHashtags(content);

    const tweet = await Tweet.create({
      author: req.userId,
      content,
      media,
      hashtags
    });
    res.status(201).json(tweet);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar', '');
    res.json(tweets);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTweetById = async (req, res) => {
  try {
    const tweet = await Tweet.findOne({_id:req.params.id, isDeleted:false})
  .populate('author', 'username avatar')
  .populate({
    path: 'replies',
    match: { isDeleted: false },
    populate: { path: 'author', select: 'username avatar' },
    options: { sort: { createdAt: -1 } }
  })
  .populate({
    path: 'retweetOf',
    populate: { path: 'author', select: 'username avatar' }
  })
  .populate('bookmarkCount');

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

    tweet.isDeleted = true;
    await tweet.save()
    res.json({ msg: 'Tweet deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: 'Tweet not found' });

    const userId = req.userId;
    const alreadyLiked = tweet.likes.includes(userId);

    if (alreadyLiked) {
      tweet.likes.pull(userId);
    } else {
      tweet.likes.push(userId);
      await Notification.create({
          type: 'like',
          sender: req.userId,
          receiver: tweet.author,
          tweet: tweet._id
        });
    }

    tweet.likesCount = tweet.likes.length;
    await tweet.save();

    res.json({ msg: alreadyLiked ? 'Unliked' : 'Liked' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


exports.toggleRetweet = async (req, res) => {
  try {
    let originalTweet = await Tweet.findById(req.params.id);
    if (!originalTweet) return res.status(404).json({ msg: 'Tweet not found' });

    if (originalTweet.retweetOf) {
      originalTweet = await Tweet.findById(originalTweet.retweetOf);
      if (!originalTweet) return res.status(404).json({ msg: 'Original tweet not found' });
    }

    const existingRetweet = await Tweet.findOne({
      author: req.userId,
      retweetOf: originalTweet._id
    });

    if (existingRetweet) {
      await existingRetweet.deleteOne();
      return res.json({ msg: 'Retweet removed.' });
    }

    const retweet = new Tweet({
      author: req.userId,
      retweetOf: originalTweet._id
    });

    await retweet.save();

    await retweet.populate({
    path: 'retweetOf',
    populate: {
      path: 'author',
      select: 'username avatar'
    }
  })

  await Notification.create({
          type: 'retweet',
          sender: req.userId,
          receiver: originalTweet.author,
          tweet: originalTweet._id
        });

    res.status(201).json(retweet);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.quotetweet = async (req, res) => {
  try {
    const originalTweet = await Tweet.findById(req.params.id);
    if (!originalTweet) return res.status(404).json({ msg: 'Original tweet not found.' });

    const { content, media } = req.body;
    const hashtags = extractHashtags(content);
    if (!content || content.trim() === '') {
      return res.status(400).json({ msg: 'Quote content is required.' });
    }

    const quote = new Tweet({
      author: req.userId,
      content,
      hashtags,
      retweetOf: originalTweet._id
    });

    await quote.save();
    await Notification.create({
          type: 'quote',
          sender: req.userId,
          receiver: originalTweet.author,
          tweet: originalTweet._id
        });
    res.status(201).json({ msg: 'Quote retweet posted.', quote });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.replyToTweet = async (req, res) => {
  try {
    const originalTweet = await Tweet.findById(req.params.id);
    if (!originalTweet) return res.status(404).json({ msg: 'Original tweet not found.' });

    const { content, media } = req.body;
    const hashtags = extractHashtags(content);
    if (!content || content.trim() === '') {
      return res.status(400).json({ msg: 'Reply content is required.' });
    }

    const reply = new Tweet({
      author: req.userId,
      content,
      media,
      hashtags,
      retweetOf: originalTweet._id,
      replies: []
    }); 
    await reply.save();
    originalTweet.replies.push(reply._id);
    await originalTweet.save();
    await reply.populate('author', 'username avatar');
    res.status(201).json({ msg: 'Reply posted.', reply });

    await Notification.create({
          type: 'reply',
          sender: req.userId,
          receiver: originalTweet.author,
          tweet: originalTweet._id
        });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
