import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      {/* Top Section */}
      <div className="title-section">
        <h1 className="app-title">FamilTask</h1>
        <p className="slogan">Technology Improves Life</p>
      </div>

      {/* Register Form */}
      <form onSubmit={handleRegister} className="register-form">
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
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}

        {/* Button Group */}
        <div className="button-group">
          <button type="submit" className="register-button">Register</button>
          <button type="button" className="back-button" onClick={handleBack}>← Back</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
