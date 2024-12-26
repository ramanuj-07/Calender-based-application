import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsAuthenticated,setUserRole}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials (Replace with actual authentication in a real app)
    const adminCredentials = { username: 'admin', password: 'admin123' };
    const userCredentials = { username: 'user', password: 'user123' };


    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAuthenticated(true);
      setUserRole('admin');
      navigate('/admin'); // Redirect to dashboard for admin
    } else if (username === userCredentials.username && password === userCredentials.password) {
      setIsAuthenticated(true);
      setUserRole('user');
      navigate('/dashboard'); // Redirect to dashboard for regular users
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
