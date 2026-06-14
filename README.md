# 🛒 ShopWave - Full Stack E-Commerce Application

A production-grade e-commerce platform built with Spring Boot and React.

## 🚀 Tech Stack

### Backend
- Java 17 + Spring Boot 3
- Spring Security + JWT Authentication
- Spring Data JPA + Hibernate
- MySQL Database
- Maven

### Frontend
- React.js
- React Router
- Axios
- Context API

## ✨ Features

- 🔐 JWT Authentication with role-based access (ADMIN/CUSTOMER)
- 📦 Product management with categories
- 🔍 Smart search and price filtering
- 📄 Pagination and sorting
- 🛒 Cart system with real-time updates
- 📋 Order management with status tracking
- ✅ Input validation and global exception handling
- 🔒 Password hashing with BCrypt

## 🏗️ Architecture

Frontend (React) → REST API → Spring Boot → MySQL

↓

JWT Filter (Security)

↓

Controller → Service → Repository

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get JWT token |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products (paginated) |
| GET | /api/products/{id} | Get product by ID |
| POST | /api/products | Create product (ADMIN only) |
| PUT | /api/products/{id} | Update product (ADMIN only) |
| DELETE | /api/products/{id} | Delete product (ADMIN only) |
| GET | /api/products/smart-search?keyword= | Search products |
| GET | /api/products/price-range?min=&max= | Filter by price range |

### Cart
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart/user/{userId} | Get user cart |
| POST | /api/cart/user/{userId}/add | Add item to cart |
| PUT | /api/cart/user/{userId}/update | Update item quantity |
| DELETE | /api/cart/user/{userId}/remove/{productId} | Remove item |
| DELETE | /api/cart/user/{userId}/clear | Clear cart |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders/user/{userId} | Place new order |
| GET | /api/orders/user/{userId} | Get user orders |
| PUT | /api/orders/{id}/status | Update order status (ADMIN) |
| GET | /api/orders/revenue | Get total revenue (ADMIN) |

## 🛠️ Setup Instructions

### Prerequisites
- Java 17+
- MySQL 8+
- Node.js 18+
- Maven

### Backend Setup
```bash
cd backend

# Create MySQL database
CREATE DATABASE shopwave;

# Configure application.properties
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Fill in your MySQL credentials

# Run the application
mvn spring-boot:run
# Server starts at http://localhost:8080
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
# App starts at http://localhost:3000
```

## 🗄️ Database Schema

users

├── id, name, email, password, role, address_id
products

├── id, name, description, price, stock, imageUrl, category_id
categories

├── id, name, description
orders

├── id, user_id, status, totalAmount, orderDate
order_items

├── id, order_id, product_id, quantity, priceAtPurchase
carts

├── id, user_id
cart_items

├── id, cart_id, product_id, quantity

## 👤 Author
**Mohammad Mudassir Khan** - Computer Science Student at Manipal Institute Of Technolgy Bangalore

## 📝 License
MIT License
