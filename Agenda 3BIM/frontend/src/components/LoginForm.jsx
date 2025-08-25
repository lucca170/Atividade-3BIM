import React, { useState } from 'react';
import api from '../services/api';
import './TaskForm.css';

// Adicione onSwitchToRegister como uma propriedade
function LoginForm({ onLoginSuccess, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // CORREÇÃO: O endpoint correto não tem /api/ no início,
      // pois o `api.js` já configura isso.
      // O endpoint correto é `api-token-auth/`.
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
          {/* ... (inputs de username e password) ... */}
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