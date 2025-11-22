// api/auth/signup.js
const connectToDatabase = require('../../lib/mongoose');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

// Minimal User model definition inside file (works for serverless)
// You could also move models to /models/User.js and import them.
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true, index: true },
  passwordHash: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true'; // set true in production with HTTPS

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { firstName, lastName, email, password } = req.body || {};

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check duplicate
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      passwordHash: hash
    });
    await user.save();

    const token = createToken({ id: user._id, email: user.email });

    // Set HttpOnly cookie
    const cookieStr = cookie.serialize('token', token, {
      httpOnly: true,
      secure: COOKIE_SECURE,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    res.setHeader('Set-Cookie', cookieStr);

    // respond with safe user info
    res.status(201).json({ user: { id: user._id, email: user.email, firstName: user.firstName } });
  } catch (err) {
    console.error('signup error', err);
    // Duplicate key might throw, but we handled above; still catch
    res.status(500).json({ error: 'Server error' });
  }
};
