import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
};

// Main App content (all sections in one file)
const MainApp = ({ addToCart }) => {
  return (
    <div className="blueberry-app">
      <Header />
      <HeroSection />
      <DayOfDealSection addToCart={addToCart} />
      <TastySnacksSection addToCart={addToCart} />
      <FreshFruitsSection addToCart={addToCart} />
    </div>
  );
};

// Header
const Header = () => {
  return (
    <header className="blueberry-header">
      <nav className="blueberry-nav">
        <div className="blueberry-logo">Blueberry</div>
        <ul className="blueberry-nav-links">
          <li><a href="#">Home</a></li>
          <CategoryDropdown />
          <li><a href="#">Shop</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Pages</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="blueberry-icons">
          <a href="#">Search</a>
          <a href="/cart">Cart</a>
          <a href="#">Account</a>
        </div>
      </nav>
    </header>
  );
};

// Category Dropdown
const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="blueberry-dropdown" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <a href="#">Categories</a>
      {isOpen && (
        <ul className="blueberry-dropdown-menu">
          <li><a href="#">Fresh Fruits</a></li>
          <li><a href="#">Fresh Vegetables</a></li>
          <li><a href="#">Tasty Snacks</a></li>
          <li><a href="#">Fast Food</a></li>
        </ul>
      )}
    </li>
  );
};

// Hero Section
const HeroSection = () => (
  <section className="blueberry-hero">
    <div className="blueberry-hero-card green">
      <h2>Flat 30% Off</h2>
      <p>Explore Healthy & Fresh Fruits</p>
      <a href="#">Shop Now</a>
    </div>
    <div className="blueberry-hero-card red">
      <h2>Flat 20% Off</h2>
      <p>Explore Warm Fast Food & Snacks</p>
      <a href="#">Shop Now</a>
    </div>
    <div className="blueberry-hero-card green">
      <h2>Flat 30% Off</h2>
      <p>Explore Organic & Fresh Vegetables</p>
      <a href="#">Shop Now</a>
    </div>
  </section>
);

// Product Card
const ProductCard = ({ badge, name, price, originalPrice, stock, quantity, addToCart }) => {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart({ name, price, quantity });
    navigate("/cart");
  };

  return (
    <div className="blueberry-product-card">
      {badge && <span className="blueberry-badge">{badge}</span>}
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKTyujPjfBbaBJG1-dW2IkvXZ1qFxs_QTWVg&s" alt={name} />
      <h4>{name}</h4>
      <p>{originalPrice && <span className="old-price">{originalPrice}</span>} {price}</p>
      {stock && <p className="stock">{stock}</p>}
      {quantity && <p className="quantity">{quantity}</p>}
      <div className="blueberry-actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button>Wishlist</button>
        <button>Compare</button>
      </div>
    </div>
  );
};

// Sections
const DayOfDealSection = ({ addToCart }) => {
  const products = [
    { name: "Fresh Coriander", price: "$1", stock: "Out Of Stock" },
    { name: "Crunchy Potato Chips", price: "$25", originalPrice: "$30", badge: "Sale" },
    { name: "Red Guava", price: "$15", originalPrice: "$17", quantity: "2kg", badge: "New" },
    { name: "Fresh blueberry", price: "$25", originalPrice: "$30", quantity: "500g", badge: "Sale" },
    { name: "Fresh orange", price: "$10", stock: "2 Left", quantity: "12 Pcs", badge: "Hot" },
    { name: "Mexico corn", price: "$5", badge: "Trend" },
  ];
  return (
    <section className="blueberry-section">
      <h2>Day of the Deal</h2>
      <p>Don't wait. The time will never be just right.</p>
      <div className="blueberry-grid">
        {products.map((p, i) => <ProductCard key={i} {...p} addToCart={addToCart} />)}
      </div>
    </section>
  );
};

const TastySnacksSection = ({ addToCart }) => {
  const products = [
    { name: "Crunchy Potato Chips", price: "$25", stock: "Out Of Stock", badge: "Sale" },
  ];
  return (
    <section className="blueberry-section gray">
      <h2>Tasty Snacks & Fast Food</h2>
      <div className="blueberry-grid">
        {products.map((p, i) => <ProductCard key={i} {...p} addToCart={addToCart} />)}
      </div>
    </section>
  );
};

const FreshFruitsSection = ({ addToCart }) => {
  const products = [
    { name: "Fresh Coriander", price: "$1", stock: "Out Of Stock" },
    { name: "Red Guava", price: "$15", originalPrice: "$17", quantity: "2kg", badge: "New" },
    { name: "Fresh Blueberry", price: "$25", originalPrice: "$30", quantity: "500g", badge: "Sale" },
    { name: "Fresh Orange", price: "$10", stock: "2 Left", quantity: "12 Pcs" },
  ];
  return (
    <section className="blueberry-section">
      <h2>Fresh Fruits & Vegetables</h2>
      <div className="blueberry-grid">
        {products.map((p, i) => <ProductCard key={i} {...p} addToCart={addToCart} />)}
      </div>
    </section>
  );
};

// Cart Page
const Cart = ({ cartItems }) => {
  return (
    <div style={{ padding: "50px" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, i) => (
            <li key={i}>{item.name} - {item.price} {item.quantity && `(${item.quantity})`}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
