import { useState } from 'react';
import { books, categories } from '../data/books';

function BookList() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks =
    selectedCategory === 'All'
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <section className="books-section" id="books">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Popular picks</p>
          <h2>Trending books</h2>
        </div>
        <button className="btn btn-light">View All</button>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="book-grid">
        {filteredBooks.map((book) => (
          <article className="book-card" key={book.id}>
            <div className="book-image-wrap">
              <span className="book-badge">{book.badge}</span>
              <img src={book.image} alt={book.title} />
            </div>

            <div className="book-info">
              <p className="book-category">{book.category}</p>
              <h3>{book.title}</h3>
              <p className="book-author">by {book.author}</p>

              <div className="book-meta">
                <span>⭐ {book.rating}</span>
                <strong>$ {book.price.toFixed(2)}</strong>
              </div>

              <button className="btn btn-primary full">Add to Cart</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BookList;
