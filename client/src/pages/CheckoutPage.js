function CheckoutPage({ cartItems, onConfirmPayment }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    onConfirmPayment({
      bank: form.get('bank'),
      cardNumber: form.get('cardNumber'),
      name: form.get('name'),
      total: subtotal
    });
  };

  return (
    <section className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Secure checkout</p>
        <h2>Checkout</h2>
      </div>

      <div className="checkout-layout page-checkout">
        <div className="checkout-summary">
          <h3>Order details</h3>
          {cartItems.map((item) => (
            <div className="summary-line" key={item.id}>
              <span>
                {item.title} x {item.quantity}
              </span>
              <strong>$ {(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}

          <div className="summary-row total-row">
            <span>Total</span>
            <strong>$ {subtotal.toFixed(2)}</strong>
          </div>
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
            Cardholder Name
            <input type="text" name="name" placeholder="John Doe" required />
          </label>

          <label>
            Card Number
            <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" required />
          </label>

          <button className="btn btn-primary full" type="submit">Pay $ {subtotal.toFixed(2)}</button>
        </form>
      </div>
    </section>
  );
}

export default CheckoutPage;
