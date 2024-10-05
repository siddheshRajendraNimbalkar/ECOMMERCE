import React from 'react';
import './Card.css';

interface Product {
  name: string;
  description: string;
  price: number;
  rating: number;
  images: { product_URL: string }[];
}

const generateRandomProduct = (): Product => ({
  name: `Product ${Math.floor(Math.random() * 1000)}`,
  description: 'This is a random product description.',
  price: Math.floor(Math.random() * 10000) / 100,
  rating: Math.floor(Math.random() * 50) / 10,
  images: [{ product_URL: "https://images.unsplash.com/photo-1590770357970-ec6480b368c0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }],
});

const ProductCard: React.FC = () => {
  const product = generateRandomProduct();

  return (
    <div className="card">
      <img 
        src={product.images[0].product_URL} 
        alt={product.name} 
        className="card-image"
      />
      <div className="card-content">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <RatingDisplay rating={product.rating} />
        <PriceDisplay price={product.price} />
      </div>
    </div>
  );
};

const PriceDisplay: React.FC<{ price: number }> = ({ price }) => (
  <span className="price-tag">
    Rs.{price.toFixed(2)}
  </span>
);

const RatingDisplay: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="rating-display">
    <div className="stars" style={{ '--rating': rating } as React.CSSProperties}></div>
    <span className="rating-value">{rating.toFixed(1)}</span>
  </div>
);

export default ProductCard;