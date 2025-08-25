import React, { useState } from 'react';
import api from '../services/api';
import './TaskForm.css'; // Reutilizando o estilo

function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('api-token-auth/', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLoginSuccess();
    } catch (error) {
      console.error('Falha no login', error);
      alert('Usuário ou senha inválidos.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
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
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onSwitchToRegister}>
              Criar conta
            </button>
            <button type="submit" className="btn btn-primary">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;