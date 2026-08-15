function Collections() {
  const collectionCards = [
    {
      title: 'Best Sellers',
      count: '120 titles',
      accent: 'pink'
    },
    {
      title: 'Award Winners',
      count: '85 titles',
      accent: 'gold'
    },
    {
      title: 'New Arrivals',
      count: '40 titles',
      accent: 'green'
    }
  ];

  return (
    <section className="collections-section" id="collections">
      <div className="section-heading center">
        <p className="eyebrow">Browse by shelf</p>
        <h2>Featured collections</h2>
      </div>

      <div className="collection-grid">
        {collectionCards.map((item) => (
          <div key={item.title} className={`collection-card ${item.accent}`}>
            <div className="collection-icon">✦</div>
            <h3>{item.title}</h3>
            <p>{item.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Collections;
