
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import LoginPage from './LoginPage';
import OrderListingPage from './OrderListingPage';
import ProductListingPage from './ProductListingPage';
import UserListingPage from './UserListingPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<LoginPage handleLogin={handleLogin} />} />
          <Route path="/orders" element={<OrderListingPage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/users" element={<UserListingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
