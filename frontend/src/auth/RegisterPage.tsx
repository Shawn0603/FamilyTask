import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password cannot be empty');
      return;
    }

    if (password !== confirm) {
      setError('The two passwords you entered do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('✅ Successful registration');
        navigate('/');
      } else {
        setError('Registration failed：' + response.data);
      }
    } catch (err: any) {
      console.error('❌ Registration failed', err);
      setError('Registration failed: Username already exists or server error');
    }
  };

  return (
    <div className="login-container">
      <h2>register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Please enter your username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Please enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
