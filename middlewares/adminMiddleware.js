const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ msg: 'Admin privileges required' });
  }
  next();
};

module.exports = adminMiddleware;
