import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './TaskList.css';

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para formatar a data (YYYY-MM-DD) para o padrão brasileiro (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Adiciona 'T00:00:00' para tratar a data como local e evitar problemas de fuso horário
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString('pt-BR');
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await api.get('/tasks/');
        setTasks(response.data);
      } catch (err) {
        setError('Falha ao carregar as tarefas.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await api.delete(`/tasks/${taskId}/`);
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (err) {
        alert('Não foi possível excluir a tarefa.');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="task-list-container">
      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={`task-item status-${task.status}`}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <div className="task-meta">
                  <span className="task-status">{task.status.replace('_', ' ')}</span>
                  <div className="task-dates">
                    {task.start_date && <span>Início: {formatDate(task.start_date)}</span>}
                    {task.due_date && <span>Entrega: {formatDate(task.due_date)}</span>}
                  </div>
                </div>
              </div>
              <div className="task-actions">
                <button className="btn-edit" onClick={() => onEdit(task)}>Editar</button>
                <button className="btn-delete" onClick={() => handleDelete(task.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <h3>Nenhuma tarefa por aqui!</h3>
          <p>Clique em "Adicionar Tarefa" para começar a se organizar.</p>
        </div>
      )}
    </div>
  );
}

export default TaskList;