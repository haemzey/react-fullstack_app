import Header from './components/Header';
import Hero from './components/Hero';
import BookList from './components/BookList';
import Collections from './components/Collections';
import Reviews from './components/Reviews';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <BookList />
        <Collections />
        <Reviews />
      </main>
    </div>
  );
}

export default App;
