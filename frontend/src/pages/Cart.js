import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import api from '../api/axios';

const Cart = () => {
  const { user } = useAuth();
  const { cart, fetchCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const userId = 1; // We'll improve this later

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart(userId);
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!cart || cart.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    try {
      const orderItems = cart.items.map(item => ({
        product: { id: item.productId },
        quantity: item.quantity,
      }));
      await api.post(`/orders/user/${userId}`, orderItems);
      await clearCart(userId);
      alert('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your cart is empty 🛒</h2>
        <button onClick={() => navigate('/')} style={styles.shopButton}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart 🛒</h1>
      <div style={styles.layout}>
        <div style={styles.items}>
          {cart.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.productName}</h3>
                <p style={styles.itemPrice}>₹{item.productPrice?.toLocaleString()}</p>
                <p style={styles.itemQty}>Quantity: {item.quantity}</p>
              </div>
              <div style={styles.itemRight}>
                <p style={styles.subtotal}>₹{item.subtotal?.toLocaleString()}</p>
                <button
                  onClick={() => removeFromCart(userId, item.productId)}
                  style={styles.removeButton}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Items ({cart.items.length})</span>
            <span>₹{cart.totalPrice?.toLocaleString()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Delivery</span>
            <span style={{ color: 'green' }}>FREE</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.total}>
            <span>Total</span>
            <span>₹{cart.totalPrice?.toLocaleString()}</span>
          </div>
          <button onClick={handlePlaceOrder} style={styles.orderButton}>
            Place Order
          </button>
          <button
            onClick={() => clearCart(userId)}
            style={styles.clearButton}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#1a1a2e',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  item: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: '1.1rem',
    marginBottom: '0.3rem',
    color: '#1a1a2e',
  },
  itemPrice: {
    color: '#666',
    marginBottom: '0.3rem',
  },
  itemQty: {
    color: '#666',
    fontSize: '0.9rem',
  },
  itemRight: {
    textAlign: 'right',
  },
  subtotal: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: '0.5rem',
  },
  removeButton: {
    backgroundColor: 'transparent',
    border: '1px solid #e94560',
    color: '#e94560',
    padding: '0.4rem 0.8rem',
    borderRadius: '5px',
    fontSize: '0.9rem',
  },
  summary: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: 'fit-content',
  },
  summaryTitle: {
    fontSize: '1.3rem',
    marginBottom: '1.5rem',
    color: '#1a1a2e',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    color: '#666',
  },
  divider: {
    height: '1px',
    backgroundColor: '#eee',
    margin: '1rem 0',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#1a1a2e',
  },
  orderButton: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  clearButton: {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: 'transparent',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '0.9rem',
  },
  empty: {
    textAlign: 'center',
    padding: '5rem',
  },
  shopButton: {
    marginTop: '1rem',
    padding: '0.8rem 2rem',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
  },
};

export default Cart;