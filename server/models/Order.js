const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    bank: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    items: [
      {
        title: String,
        author: String,
        price: Number,
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
