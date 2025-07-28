const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { toggleFollow, getUserById, getAllUsers, createUser, getCurrentUserProfile,updateProfile, updateUser, deleteUser } = require('../controllers/userController');
const User = require('../models/User');

router.get('/', auth ,getAllUsers);

router.get('/profile', auth, getCurrentUserProfile);

router.put('/profile', auth, updateProfile);

router.post('/', auth, createUser)

router.get('/:id', auth, getUserById);

router.put('/:id', auth, updateUser);

router.delete('/:id', auth, deleteUser);

router.post('/:id/follow', auth, toggleFollow);

module.exports = router;
