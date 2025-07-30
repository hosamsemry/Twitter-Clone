const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ receiver: req.userId })
      .populate('sender', 'username avatar')
      .populate('tweet', 'content')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, receiver: req.userId },
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ msg: 'Notification not found' });
    res.json({ msg: 'Notification marked as read', notification });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update notification' });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ receiver: req.userId, isRead: false }, { isRead: true });
    res.json({ msg: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to mark all as read' });
  }
};
