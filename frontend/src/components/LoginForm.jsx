import React, { useState } from 'react';
import './Form.css';

// Adicionamos a propriedade onForgotPassword
const LoginForm = ({ onLogin, onSwitchToRegister, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Não tem uma conta?{' '}
          <button type="button" onClick={onSwitchToRegister} className="link-button">
            Registre-se
          </button>
        </p>
        {/* Este botão agora chama a função para mudar a tela */}
        <p>
          <button type="button" onClick={onForgotPassword} className="link-button">
              Esqueci minha senha
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
