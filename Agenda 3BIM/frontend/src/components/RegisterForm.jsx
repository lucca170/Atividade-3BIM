import React, { useState } from 'react';
import api from '../services/api';
import './TaskForm.css'; // Reutilizando o estilo

function RegisterForm({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Faz a requisição para o endpoint de usuários que criamos no backend
      await api.post('/users/', { username, email, password });
      alert('Usuário cadastrado com sucesso! Faça o login para continuar.');
      onSwitchToLogin(); // Muda para a tela de login após o sucesso
    } catch (error) {
      console.error('Falha no cadastro', error.response.data);
      alert('Não foi possível realizar o cadastro. Verifique os dados.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Conta</h2>
        <form onSubmit={handleRegister}>
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