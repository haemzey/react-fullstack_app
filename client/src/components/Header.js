function Header() {
  return (
    <header className="topbar">
      <div className="brand-wrap">
        <div className="brand-icon">B</div>
        <div>
          <p className="brand-name">BookNest</p>
          <span className="brand-tag">Library Shop</span>
        </div>
      </div>

      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#books">Books</a>
        <a href="#collections">Collections</a>
        <a href="#reviews">Reviews</a>
      </nav>

      <div className="nav-actions">
        <button className="btn btn-light">Sign In</button>
        <button className="btn btn-primary">Cart (2)</button>
      </div>
    </header>
  );
}

export default Header;
