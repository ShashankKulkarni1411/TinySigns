const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: '' }, // Optional for OAuth users
  stakeholder: { type: String, default: 'student' },
  loggedIn: { type: Boolean, default: false },
  googleId: { type: String, default: null }, // Google OAuth ID
  profilePicture: { type: String, default: '' }, // Profile picture URL from Google
  authProvider: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' }, // Track auth method
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


