import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    const userId = 1; // We'll improve this later
    await addToCart(userId, product.id, 1);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={styles.card}>
      <img
        src={product.imageUrl || 'https://via.placeholder.com/200'}
        alt={product.name}
        style={styles.image}
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>₹{product.price?.toLocaleString()}</p>
        <p style={styles.stock}>
          {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
        </p>
        <button
          onClick={handleAddToCart}
          style={{
            ...styles.button,
            backgroundColor: product.stock > 0 ? '#e94560' : '#ccc',
          }}
          disabled={product.stock === 0}>
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  info: {
    padding: '1rem',
  },
  name: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  price: {
    fontSize: '1.2rem',
    color: '#e94560',
    fontWeight: 'bold',
    marginBottom: '0.3rem',
  },
  stock: {
    fontSize: '0.8rem',
    color: '#666',
    marginBottom: '0.8rem',
  },
  button: {
    width: '100%',
    padding: '0.7rem',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '0.9rem',
  },
};

export default ProductCard;