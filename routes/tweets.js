const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware')
const {
  createTweet,
  getAllTweets,
  getTweetById,
  deleteTweet,
  toggleLike,
  toggleRetweet,
  quotetweet,
  replyToTweet,
  getDeletedTweets,
  getDeletedTweetById
} = require('../controllers/tweetController');

router.post('/', auth, createTweet);
router.get('/', getAllTweets);
router.get('/:id', getTweetById);
router.delete('/:id', auth, deleteTweet);
router.post('/:id/like', auth, toggleLike);
router.post('/:id/retweet', auth, toggleRetweet);
router.post('/:id/quote', auth, quotetweet);
router.post('/:id/reply', auth, replyToTweet);
router.post('/deleted', auth, admin, getDeletedTweets);
router.post('/deleted/:id', auth, admin, getDeletedTweetById);

module.exports = router;
