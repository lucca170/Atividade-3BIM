// frontend/src/components/LoginForm.jsx

import React, { useState } from 'react';
import api from '../services/api';
import './Form.css';

function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('api-token-auth/', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess(token);
    } catch (err) {
      setError('Usuário ou senha inválidos.');
      console.error('Falha no login', err);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Entrar</button>
        </div>
        <div className="switch-form-text">
          <p>
            Não tem uma conta?{' '}
            <button type="button" onClick={onSwitchToRegister}>
              Registre-se
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;