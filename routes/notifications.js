const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  getNotifications,
  markAsRead,
  markAllAsRead
} = require('../controllers/notificationController');


router.get('/notifications', auth, getNotifications);
router.patch('/:id/read', auth, markAsRead);
router.patch('/read-all', auth, markAllAsRead);

module.exports = router;
