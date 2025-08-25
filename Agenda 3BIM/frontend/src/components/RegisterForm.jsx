import React, { useState } from 'react';
import api from '../services/api';
import './TaskForm.css';

function RegisterForm({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // CORREÇÃO: Certifique-se de que a URL termina com uma barra.
      // A rota é `users/`
      await api.post('users/', { username, email, password });
      alert('Usuário cadastrado com sucesso! Faça o login para continuar.');
      onSwitchToLogin();
    } catch (error) {
      console.error('Falha no cadastro', error.response.data);
      // Pega a mensagem de erro específica do backend, se houver.
      const errorMessage = Object.values(error.response.data).join('\n');
      alert(`Não foi possível realizar o cadastro:\n${errorMessage}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Conta</h2>
        <form onSubmit={handleRegister}>
          {/* ... (seus inputs de username, email e password) ... */}
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="button" className="btn btn-secondary" onClick={onSwitchToLogin}>
              Já tenho uma conta
            </button>
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;