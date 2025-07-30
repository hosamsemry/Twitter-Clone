const express = require('express');
const router = express.Router();
const { trendingHashtags, getTweetsByHashtag } = require('../controllers/trendingController');


router.get('/trending', trendingHashtags);
router.get('/hashtags/:tag', getTweetsByHashtag);

module.exports = router;
