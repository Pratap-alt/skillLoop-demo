// lib/mongoose.js

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectToDatabase() {

  // If already connected
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection
  if (!cached.promise) {

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

  }

  cached.conn = await cached.promise;

  return cached.conn;
}

module.exports = connectToDatabase;