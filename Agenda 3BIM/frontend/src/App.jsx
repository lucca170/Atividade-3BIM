import React from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css'; // Criaremos este arquivo a seguir

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>List</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active"><a href="#">Dashboard</a></li>
            <li><a href="#">Estatisticas</a></li>
            <li><a href="#">Projetos</a></li>
            <li><a href="#">Equipes</a></li>
            {/* Adicione outros links aqui */}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="btn btn-secondary">Sair da Conta</button>
        </div>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-title">
            <h1>Visão Geral</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">Adicionar Tarefa</button>
            <div className="user-profile">
              <img src="https://via.placeholder.com/40" alt="User Avatar" />
            </div>
          </div>
        </header>
        <TaskList />
      </main>
    </div>
  );
}

export default App;