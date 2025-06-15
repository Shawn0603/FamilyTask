import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './useAuthStore';
import './LoginPage.css'; 

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
    } else if (password !== confirm) {
      setError('Passwords do not match');
    } else {
      // mock sigin
      login(username);
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
