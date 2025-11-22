require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 4000;

// Basic security middlewares
app.use(helmet());
app.use(express.json());

// rate limiter (protect endpoints)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
});
app.use(limiter);

// CORS - allow your frontend origin. Allow credentials if using cookies.
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5500',
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
