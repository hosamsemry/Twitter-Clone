const express = require('express');
const router = express.Router();
const { getUserFeed } = require('../controllers/feedController');
const auth = require('../middlewares/authMiddleware');

router.get('/feed', auth, getUserFeed);

module.exports = router;
