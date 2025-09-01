import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';
import './Form.css'; // Reutilizando o estilo

const ResetPasswordForm = () => {
  const { token } = useParams(); // Pega o token da URL
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await resetPassword(token, password);
      setMessage(response.message + " Você será redirecionado para o login.");
      setTimeout(() => navigate('/login'), 3000); // Redireciona para o login após 3s
    } catch (err) {
      setError(err.response?.data?.error || 'Token inválido/expirado ou erro no servidor.');
    }
  }, [token, password, navigate]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Redefinir Senha</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua nova senha"
          required
        />
        <button type="submit">Salvar Nova Senha</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordForm;