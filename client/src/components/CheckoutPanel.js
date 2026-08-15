function CheckoutPanel({ selectedBook, onPayment }) {
  if (!selectedBook) {
    return (
      <section className="feature-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Payment</p>
            <h2>Checkout</h2>
          </div>
        </div>

        <div className="empty-state">
          Select a book to buy or reserve to continue.
        </div>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const payment = {
      bank: form.get('bank'),
      cardNumber: form.get('cardNumber'),
      name: form.get('name')
    };

    onPayment({ ...selectedBook, ...payment });
  };

  return (
    <section className="feature-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Secure payment</p>
          <h2>Checkout</h2>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-summary">
          <h3>{selectedBook.title}</h3>
          <p>{selectedBook.author}</p>
          <strong>$ {selectedBook.price.toFixed(2)}</strong>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <label>
            Bank
            <select name="bank" defaultValue="HBL">
              <option>HBL</option>
              <option>MCB</option>
              <option>Bank Alfalah</option>
              <option>Standard Chartered</option>
            </select>
          </label>

          <label>
            Card holder name
            <input type="text" name="name" placeholder="John Doe" required />
          </label>

          <label>
            Card number
            <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" required />
          </label>

          <button className="btn btn-primary full" type="submit">Pay securely</button>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPanel;
