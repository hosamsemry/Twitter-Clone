const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false },
  bio:      { type: String, default: '' },
  avatar:   { type: String, default: 'https://www.freepik.com/free-vector/illustration-businessman_2606517.htm#fromView=search&page=1&position=19&uuid=4fb07192-05b5-4eb7-b075-6b77b71fcabd&query=default+profile+image' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
