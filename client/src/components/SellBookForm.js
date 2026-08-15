function SellBookForm({ onSell }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const book = {
      title: form.get('title'),
      author: form.get('author'),
      price: Number(form.get('price')),
      condition: form.get('condition'),
      category: form.get('category')
    };

    if (book.title && book.author && book.price) {
      onSell(book);
      e.target.reset();
    }
  };

  return (
    <section className="feature-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Sell</p>
          <h2>Sell your books</h2>
        </div>
      </div>

      <form className="sell-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Book title
            <input type="text" name="title" placeholder="e.g. Deep Work" required />
          </label>

          <label>
            Author
            <input type="text" name="author" placeholder="Author name" required />
          </label>

          <label>
            Price
            <input type="number" name="price" placeholder="25.00" min="1" step="0.01" required />
          </label>

          <label>
            Condition
            <select name="condition" defaultValue="Good">
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </label>

          <label>
            Category
            <select name="category" defaultValue="Technology">
              <option>Fiction</option>
              <option>Self Growth</option>
              <option>Technology</option>
              <option>Classic</option>
              <option>Finance</option>
              <option>Inspiration</option>
            </select>
          </label>
        </div>

        <button className="btn btn-primary" type="submit">List Book for Sale</button>
      </form>
    </section>
  );
}

export default SellBookForm;
