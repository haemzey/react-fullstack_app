import { testimonials } from '../data/books';

function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="section-heading center">
        <p className="eyebrow">Loved by readers</p>
        <h2>Customer reviews</h2>
      </div>

      <div className="reviews-grid">
        {testimonials.map((review) => (
          <div className="review-card" key={review.name}>
            <div className="stars">★★★★★</div>
            <p>“{review.text}”</p>
            <strong>{review.name}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
