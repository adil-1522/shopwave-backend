import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/user/${userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#f39c12',
      CONFIRMED: '#3498db',
      SHIPPED: '#9b59b6',
      DELIVERED: '#2ecc71',
      CANCELLED: '#e74c3c',
    };
    return colors[status] || '#666';
  };

  if (loading) return <div style={styles.loading}>Loading orders...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Orders 📦</h1>
      {orders.length === 0 ? (
        <div style={styles.empty}>
          <h2>No orders yet!</h2>
          <button onClick={() => navigate('/')} style={styles.shopButton}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div style={styles.orders}>
          {orders.map((order) => (
            <div key={order.id} style={styles.order}>
              <div style={styles.orderHeader}>
                <div>
                  <h3 style={styles.orderId}>Order #{order.id}</h3>
                  <p style={styles.orderDate}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div style={styles.orderRight}>
                  <span style={{
                    ...styles.status,
                    backgroundColor: getStatusColor(order.status),
                  }}>
                    {order.status}
                  </span>
                  <p style={styles.orderTotal}>
                    ₹{order.totalAmount?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div style={styles.orderItems}>
                {order.orderItems?.map((item) => (
                  <div key={item.id} style={styles.orderItem}>
                    <span>{item.product?.name}</span>
                    <span>x{item.quantity}</span>
                    <span>₹{item.priceAtPurchase?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#1a1a2e',
  },
  orders: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  order: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  orderId: {
    fontSize: '1.1rem',
    color: '#1a1a2e',
    marginBottom: '0.3rem',
  },
  orderDate: {
    color: '#666',
    fontSize: '0.9rem',
  },
  orderRight: {
    textAlign: 'right',
  },
  status: {
    color: 'white',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    display: 'inline-block',
    marginBottom: '0.5rem',
  },
  orderTotal: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#e94560',
  },
  orderItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#666',
    fontSize: '0.9rem',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f5f5f5',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
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

export default Orders;