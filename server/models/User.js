const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'BookNest User',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      default: 'demo-password',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
