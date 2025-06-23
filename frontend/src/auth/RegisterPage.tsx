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
      setError('用户名和密码不能为空');
      return;
    }

    if (password !== confirm) {
      setError('两次密码输入不一致');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('✅ 注册成功');
        navigate('/');
      } else {
        setError('注册失败：' + response.data);
      }
    } catch (err: any) {
      console.error('❌ 注册失败', err);
      setError('注册失败：用户名已存在或服务器错误');
    }
  };

  return (
    <div className="login-container">
      <h2>注册</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="请输入用户名"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="请输入密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="确认密码"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        {error && <p className="error-msg">{error}</p>}
        <button type="submit">注册</button>
      </form>
    </div>
  );
}

export default RegisterPage;
