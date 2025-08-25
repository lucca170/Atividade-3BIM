import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './TaskForm.css';

function TaskForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'Pendente');
      setStartDate(task.start_date ? task.start_date.split('T')[0] : '');
      setDueDate(task.due_date ? task.due_date.split('T')[0] : '');
    } else {
      // Limpa o formulário para uma nova tarefa
      setTitle('');
      setDescription('');
      setStatus('Pendente');
      setStartDate('');
      setDueDate('');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      status,
      start_date: startDate || null,
      due_date: dueDate || null,
    };

    try {
      if (task && task.id) {
        await api.put(`tasks/${task.id}/`, taskData);
      } else {
        await api.post('tasks/', taskData);
      }
      onSave();
    } catch (error) {
      console.error('Falha ao salvar a tarefa', error.response?.data);
      alert('Não foi possível salvar a tarefa.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task ? 'Editar Tarefa' : 'Adicionar Nova Tarefa'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pendente">Pendente</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Concluída</option>
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start_date">Data de Início</label>
              <input
                type="date"
                id="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="due_date">Data de Entrega</label>
              <input
                type="date"
                id="due_date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;