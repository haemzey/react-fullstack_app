import { Link } from 'react-router-dom';

function Header({ user, cartCount }) {
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
        <Link to="/">Home</Link>
        <a href="/#books">Books</a>
        <a href="/#collections">Collections</a>
        <a href="/#reviews">Reviews</a>
      </nav>

      <div className="nav-actions">
        <Link to="/login" className="btn btn-light link-btn">
          {user ? user.name || 'Account' : 'Sign In'}
        </Link>
        <Link to="/cart" className="btn btn-primary link-btn">
          Cart ({cartCount})
        </Link>
      </div>
    </header>
  );
}

export default Header;
