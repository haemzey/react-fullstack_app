const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const books = [
  {
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 19.99,
    category: 'Fiction',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    badge: 'Bestseller'
  },
  {
    id: 2,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 24.5,
    category: 'Self Growth',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80',
    badge: 'Popular'
  },
  {
    id: 3,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    price: 29.0,
    category: 'Technology',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    badge: 'Top Rated'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 16.75,
    category: 'Classic',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
    badge: 'Classic'
  },
  {
    id: 5,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 21.25,
    category: 'Finance',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    badge: 'New'
  },
  {
    id: 6,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 18.5,
    category: 'Inspiration',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80',
    badge: 'Editor Pick'
  }
];

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'BookNest API is running' });
});

app.get('/api/books', (req, res) => {
  res.json({ success: true, data: books });
});

app.post('/api/books', (req, res) => {
  const { title, author, price, category, condition } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({ success: false, message: 'Title, author and price are required' });
  }

  const newBook = {
    id: Date.now(),
    title,
    author,
    price: Number(price),
    category: category || 'General',
    condition: condition || 'Good',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    badge: 'Listed'
  };

  books.unshift(newBook);

  return res.status(201).json({ success: true, message: 'Book listed successfully', data: newBook });
});

app.post('/api/login', (req, res) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  return res.json({
    success: true,
    message: 'Login successful',
    user: {
      name: name || 'BookNest User',
      email
    }
  });
});

app.post('/api/orders', (req, res) => {
  const { items, bank, cardNumber, name, total } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  return res.json({
    success: true,
    message: `Payment successful via ${bank} for $${Number(total).toFixed(2)}`,
    order: {
      bank,
      cardNumber: cardNumber ? '**** **** **** ' + cardNumber.slice(-4) : 'N/A',
      name,
      total: Number(total),
      itemsCount: items.length
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
