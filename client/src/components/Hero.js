function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow">Curated reads for curious minds</p>
        <h1>Find your next favorite book at BookNest.</h1>
        <p className="hero-text">
          Discover bestselling novels, productivity guides, timeless classics, and more — all in one beautiful library shop.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary large">Shop Now</button>
          <button className="btn btn-outline large">Browse Collections</button>
        </div>

        <div className="stats-row">
          <div>
            <strong>12k+</strong>
            <span>Readers</span>
          </div>
          <div>
            <strong>3.5k+</strong>
            <span>Books</span>
          </div>
          <div>
            <strong>4.9/5</strong>
            <span>Rating</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="book-card card-main">
          <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80" alt="Featured book" />
          <div className="mini-panel">
            <span>Featured</span>
            <strong>The Midnight Library</strong>
            <small>$19.99</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
