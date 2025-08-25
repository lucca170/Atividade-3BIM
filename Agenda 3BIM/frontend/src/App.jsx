import React, { useState, useCallback } from 'react';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx'; // Importe o novo componente
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  // Adicione um estado para forçar a atualização da TaskList
  const [refreshKey, setRefreshKey] = useState(0);

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
    // Mude a chave para forçar o componente TaskList a recarregar os dados
    setRefreshKey(oldKey => oldKey + 1);
  };
  
  return (
    <div className="app-container">
      {/* Sidebar e Main Content continuam aqui... */}
      <aside className="sidebar">
        {/* ... seu código da sidebar ... */}
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-title">
            <h1>Visão Geral</h1>
          </div>
          <div className="header-actions">
            {/* O botão agora abre o modal */}
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              Adicionar Tarefa
            </button>
            <div className="user-profile">
              <img src="https://via.placeholder.com/40" alt="User Avatar" />
            </div>
          </div>
        </header>
        {/* Passe a chave de atualização e a função para abrir o modal */}
        <TaskList key={refreshKey} onEdit={handleOpenModal} />
      </main>

      {/* Renderiza o modal se isModalOpen for verdadeiro */}
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