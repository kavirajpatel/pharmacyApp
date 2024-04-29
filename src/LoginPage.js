import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (username === password && username !== '' && password !== '') {
      alert('Login Successful');
      handleLogin();
      navigate('/orders'); 
    } else {
      alert('Please enter valid credentials!');
    }
  };

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className='login_input-field'
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className='login_input-field'
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn" type="button" onClick={handleLoginClick}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

