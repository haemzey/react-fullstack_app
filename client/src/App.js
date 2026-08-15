import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import BookList from './components/BookList';
import Collections from './components/Collections';
import Reviews from './components/Reviews';
import MarketplaceSection from './components/MarketplaceSection';
import SellBookForm from './components/SellBookForm';
import CheckoutPanel from './components/CheckoutPanel';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AuthPage from './pages/AuthPage';
import { createBook, createOrder, fetchBooks, loginUser } from './services/api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [notice, setNotice] = useState('');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      price: 19.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 24.5,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80'
    }
  ]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      const serverBooks = await fetchBooks();
      setBooks(serverBooks);
    };

    loadBooks();
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const addToCart = (book) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          quantity: 1,
          image: book.image
        }
      ];
    });

    setNotice(`${book.title} added to cart.`);
  };

  const handleBuyBook = (book) => {
    setSelectedBook(book);
    addToCart(book);
    setNotice(`You selected ${book.title} for purchase.`);
  };

  const handleReserveBook = (book) => {
    setSelectedBook(book);
    setNotice(`${book.title} has been reserved for you.`);
  };

  const handleSellBook = async (newBook) => {
    const result = await createBook(newBook);

    if (result.success) {
      setBooks((prev) => [result.data, ...prev]);
      setNotice(`${newBook.title} has been listed for sale.`);
    } else {
      setNotice(result.message || 'Could not list the book.');
    }
  };

  const handlePayment = async (paymentInfo) => {
    const result = await createOrder({
      items: [paymentInfo],
      bank: paymentInfo.bank,
      cardNumber: paymentInfo.cardNumber,
      name: paymentInfo.name,
      total: paymentInfo.price
    });

    if (result.success) {
      setNotice(result.message);
    } else {
      setNotice(result.message || 'Payment failed.');
    }
  };

  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogin = async (currentUser) => {
    const result = await loginUser(currentUser);

    if (result.success) {
      setUser(result.user);
      setNotice(`Welcome, ${result.user.name || result.user.email}!`);
    } else {
      setNotice(result.message || 'Login failed.');
    }
  };

  const HomePage = () => (
    <>
      <Hero />
      <BookList />
      <MarketplaceSection books={books} onBuy={handleBuyBook} onReserve={handleReserveBook} />
      <SellBookForm onSell={handleSellBook} />
      <CheckoutPanel selectedBook={selectedBook} onPayment={handlePayment} />
      <Collections />
      <Reviews />
    </>
  );

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header user={user} cartCount={cartCount} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                  onCheckout={() => setNotice('Proceeding to checkout.')}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  cartItems={cartItems}
                  onConfirmPayment={async (payment) => {
                    const total = cartItems.reduce(
                      (sum, item) => sum + item.price * item.quantity,
                      0
                    );

                    const result = await createOrder({
                      items: cartItems,
                      bank: payment.bank,
                      cardNumber: payment.cardNumber,
                      name: payment.name,
                      total
                    });

                    if (result.success) {
                      setNotice(result.message);
                    } else {
                      setNotice(result.message || 'Payment failed.');
                    }
                  }}
                />
              }
            />
            <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {notice && <div className="status-banner">{notice}</div>}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
