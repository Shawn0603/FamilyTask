import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json(); 
        const token = data.token;
        login(token); 
        localStorage.setItem('token', token); 
        navigate('/'); 
      } else {
        setError('Wrong username or password');
      }
    } catch (err) {
      console.error('Login Failed:', err);
      setError('An error occurred during login, please try again later');
    }
  };

  return (
    <div className="login-container">

 
      <div className="title-section">
        <h1 className="app-title">FamilTask</h1>
        <p className="slogan">Technology Improves Life</p>
      </div>

  
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="login-button">login</button>

      </form>

   
      <p className="footer-text">
        No account yet? <Link className="register-link" to="/register">Click to register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
