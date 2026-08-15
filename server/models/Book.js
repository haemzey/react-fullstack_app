const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      default: 'General',
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    },
    badge: {
      type: String,
      default: 'Listed',
    },
    condition: {
      type: String,
      default: 'Good',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
