import React, { useState, useCallback } from 'react';
import { requestPasswordReset } from '../services/api';
import './Form.css'; // Reutilizando o estilo

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await requestPasswordReset(email);
      setMessage(response.message);
    } catch (err) {
      setError('Ocorreu um erro. Verifique o e-mail e tente novamente.');
    }
  }, [email]);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Recuperar Senha</h2>
        <p>Digite seu e-mail para receber o link de redefinição.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          required
        />
        <button type="submit">Enviar</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;