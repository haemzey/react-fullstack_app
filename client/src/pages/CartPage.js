function CartPage({ cartItems, onIncrease, onDecrease, onRemove, onCheckout }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Your basket</p>
        <h2>Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state large">Your cart is empty. Add some books to continue.</div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>
                  <strong>$ {item.price.toFixed(2)}</strong>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => onDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onIncrease(item.id)}>+</button>
                </div>

                <button className="btn btn-light" onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items</span>
              <strong>{totalItems}</strong>
            </div>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>$ {subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <strong>$ {subtotal.toFixed(2)}</strong>
            </div>
            <button className="btn btn-primary full" onClick={onCheckout}>Proceed to Checkout</button>
          </aside>
        </div>
      )}
    </section>
  );
}

export default CartPage;
