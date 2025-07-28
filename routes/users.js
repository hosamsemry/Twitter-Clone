const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { toggleFollow, getUserById, getAllUsers, createUser, getCurrentUserProfile,updateProfile, updateUser, deleteUser } = require('../controllers/userController');
const User = require('../models/User');
const admin = require('../middlewares/adminMiddleware')

router.get('/', auth, admin, getAllUsers);

router.get('/profile', auth, getCurrentUserProfile);

router.put('/profile', auth, updateProfile);

router.post('/', auth, admin, createUser)

router.get('/:id', auth,admin, getUserById);

router.put('/:id', auth,admin, updateUser);

router.delete('/:id', auth,admin, deleteUser);

router.post('/:id/follow', auth, toggleFollow);

module.exports = router;
