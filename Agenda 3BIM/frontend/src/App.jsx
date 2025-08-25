import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import LoginForm from './components/LoginForm.jsx';
import RegisterForm from './components/RegisterForm.jsx';
import './app.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    handleCloseModal();
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return showLogin ? (
      <LoginForm 
        onLoginSuccess={handleLoginSuccess} 
        onSwitchToRegister={() => setShowLogin(false)} 
      />
    ) : (
      <RegisterForm 
        onSwitchToLogin={() => setShowLogin(true)} 
      />
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-title">
            <h1>Visão Geral</h1>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              Adicionar Tarefa
            </button>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Sair
            </button>
            <div className="user-profile">
              <img src="https://via.placeholder.com/40" alt="User Avatar" />
            </div>
          </div>
        </header>
        <TaskList key={refreshKey} onEdit={handleOpenModal} />
      </main>

      {isModalOpen && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;