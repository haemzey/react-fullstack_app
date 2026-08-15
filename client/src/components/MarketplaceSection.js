function MarketplaceSection({ books, onBuy, onReserve }) {
  return (
    <section className="feature-panel" id="buy">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Marketplace</p>
          <h2>Buy books</h2>
        </div>
      </div>

      <div className="book-grid">
        {books.map((book) => (
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

              <div className="buy-actions">
                <button className="btn btn-primary" onClick={() => onBuy(book)}>
                  Buy Now
                </button>
                <button className="btn btn-light" onClick={() => onReserve(book)}>
                  Reserve
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MarketplaceSection;
