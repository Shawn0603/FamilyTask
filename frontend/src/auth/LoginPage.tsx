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
        const data = await response.json(); // 返回 { token: "..." }
        const token = data.token;

        // 保存 token
        login(token); // Zustand 存入
        localStorage.setItem('token', token); // 本地存入

        navigate('/'); // 登录成功跳转主页面
      } else {
        setError('用户名或密码错误');
      }
    } catch (err) {
      console.error('登录失败:', err);
      setError('登录过程中发生错误，请稍后再试');
    }
  };

  return (
    <div className="login-container">
      <h2>登录</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">登录</button>
      </form>

      <p>
        还没有账号？<Link to="/register">点击注册</Link>
      </p>
    </div>
  );
}

export default LoginPage;
