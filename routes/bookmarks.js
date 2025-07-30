const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  toggleBookmark,
  getBookmarks
} = require('../controllers/bookmarkController');

router.post('/bookmarks/:id/bookmark', auth, toggleBookmark);
router.get('/bookmarks', auth, getBookmarks);

module.exports = router;
