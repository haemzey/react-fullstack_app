require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Book = require('./models/Book');
const User = require('./models/User');
const Order = require('./models/Order');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'BookNest API is running' });
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/books', async (req, res) => {
  const { title, author, price, category, condition } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({ success: false, message: 'Title, author and price are required' });
  }

  try {
    const newBook = await Book.create({
      title,
      author,
      price: Number(price),
      category: category || 'General',
      condition: condition || 'Good',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
      badge: 'Listed'
    });

    return res.status(201).json({ success: true, message: 'Book listed successfully', data: newBook });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const newUser = await User.create({
        name: name || 'BookNest User',
        email,
        password: 'demo-password'
      });

      return res.json({ success: true, message: 'Login successful', user: newUser });
    }

    return res.json({ success: true, message: 'Login successful', user: existingUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  const { items, bank, cardNumber, name, total } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  try {
    const newOrder = await Order.create({
      bank,
      cardNumber,
      name,
      total: Number(total),
      items: items.map((item) => ({
        title: item.title,
        author: item.author,
        price: item.price,
        quantity: item.quantity || 1,
      }))
    });

    return res.json({
      success: true,
      message: `Payment successful via ${bank} for $${Number(total).toFixed(2)}`,
      order: newOrder
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
