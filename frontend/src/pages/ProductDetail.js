import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(1, product.id, quantity);
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!product) return <div style={styles.loading}>Product not found</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <div style={styles.card}>
        <img
          src={product.imageUrl || 'https://via.placeholder.com/400'}
          alt={product.name}
          style={styles.image}
        />
        <div style={styles.info}>
          <h1 style={styles.name}>{product.name}</h1>
          {product.category && (
            <span style={styles.category}>{product.category.name}</span>
          )}
          <p style={styles.price}>₹{product.price?.toLocaleString()}</p>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.stock}>
            {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
          </p>

          <div style={styles.quantity}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={styles.qtyButton}>-</button>
            <span style={styles.qtyValue}>{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              style={styles.qtyButton}>+</button>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              ...styles.addButton,
              backgroundColor: product.stock > 0 ? '#e94560' : '#ccc',
            }}
            disabled={product.stock === 0}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  },
  back: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    marginBottom: '1.5rem',
    fontSize: '1rem',
  },
  card: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  info: {
    padding: '2rem',
  },
  name: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    color: '#1a1a2e',
  },
  category: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    display: 'inline-block',
    marginBottom: '1rem',
  },
  price: {
    fontSize: '2rem',
    color: '#e94560',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  description: {
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  stock: {
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  qtyButton: {
    width: '35px',
    height: '35px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
  },
  qtyValue: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    minWidth: '30px',
    textAlign: 'center',
  },
  addButton: {
    width: '100%',
    padding: '1rem',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
  },
};

export default ProductDetail;