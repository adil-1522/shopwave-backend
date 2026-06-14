import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products?page=0&size=20&sortBy=id');
      setProducts(response.data.content);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!keyword) {
      fetchProducts();
      return;
    }
    try {
      const response = await api.get(`/products/smart-search?keyword=${keyword}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleFilter = async () => {
    if (!maxPrice) {
      fetchProducts();
      return;
    }
    try {
      const response = await api.get(`/products/filter?maxPrice=${maxPrice}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error filtering:', error);
    }
  };

  if (loading) return <div style={styles.loading}>Loading products...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to ShopWave 🛒</h1>
        <p style={styles.heroSubtitle}>Discover amazing products at great prices</p>
      </div>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>

        <input
          type="number"
          placeholder="Max price..."
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleFilter} style={styles.filterButton}>Filter</button>

        <button onClick={fetchProducts} style={styles.resetButton}>Reset</button>
      </div>

      {products.length === 0 ? (
        <div style={styles.noProducts}>No products found</div>
      ) : (
        <div style={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  },
  hero: {
    textAlign: 'center',
    padding: '3rem 0',
    backgroundColor: '#1a1a2e',
    color: 'white',
    borderRadius: '10px',
    marginBottom: '2rem',
  },
  heroTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#a8a8b3',
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    padding: '0.7rem 1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    flex: 1,
    minWidth: '150px',
  },
  searchButton: {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  filterButton: {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  resetButton: {
    padding: '0.7rem 1.5rem',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
  },
  noProducts: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default Home;