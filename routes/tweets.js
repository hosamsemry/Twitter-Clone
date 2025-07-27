const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const {
  createTweet,
  getAllTweets,
  getTweetById,
  deleteTweet,
  toggleLike
} = require('../controllers/tweetController');

router.post('/', auth, createTweet);
router.get('/', getAllTweets);
router.get('/:id', getTweetById);
router.delete('/:id', auth, deleteTweet);
router.post('/:id/like', auth, toggleLike);

module.exports = router;
