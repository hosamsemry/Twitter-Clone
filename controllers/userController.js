const User = require("../models/User");
const Tweet = require("../models/Tweet");
const Notification = require('../models/Notification')
exports.toggleFollow = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.userId;

    if (targetUserId === currentUserId)
      return res.status(400).json({ msg: "You can't follow yourself." });

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) return res.status(404).json({ msg: "User not found." });

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    await Notification.create({
      type: 'follow',
      sender: req.userId,
      receiver: tweet.author,
      tweet: tweet._id
    });


    res.json({
      following: !isFollowing,
      followersCount: targetUser.followers.length,
      followingCount: currentUser.following.length,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // hide password
    if (!user) return res.status(404).json({ msg: "User not found." });

    const followersCount = user.followers.length;
    const followingCount = user.following.length;

    res.json({
      ...user.toObject(),
      followersCount,
      followingCount,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: "Invalid ID or data." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found." });
    
    user.isDeleted = true;
    user.save()
    res.json({ msg: 'User account soft-deleted' });
  } catch (err) {
    res.status(400).json({ msg: "Invalid ID or data." });
  }
};

exports.getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found.' });

    const followersCount = user.followers.length;
    const followingCount = user.following.length;

    const tweets = await Tweet.find({ author: req.userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'retweetOf',
        populate: {
          path: 'author',
          select: 'username avatar'
        }
      })
      .populate('author', 'username profilePicture');

    res.json({
      ...user.toObject(),
      followersCount,
      followingCount,
      tweets
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    const { username, bio, avatar } = req.body;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;
    await user.save();
    res.json({
      msg: "Profile updated successfully",
      user: {
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
        followersCount: user.followers.length,
        followingCount: user.following.length,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
