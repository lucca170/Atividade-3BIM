import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    api.get('tasks/')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Erro ao buscar tarefas:', err));
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    api.post('tasks/', { title: newTask, status: 'Pendente' })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTask('');
      })
      .catch((err) => console.error('Erro ao adicionar tarefa:', err));
  };

  const deleteTask = (id) => {
    api.delete(`tasks/${id}/`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.error('Erro ao excluir tarefa:', err));
  };

  const toggleComplete = (task) => {
    const newStatus = task.status === 'Pendente' ? 'Concluída' : 'Pendente';
    api.put(`tasks/${task.id}/`, { ...task, status: newStatus })
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
      })
      .catch((err) => console.error('Erro ao atualizar tarefa:', err));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingText(task.title);
  };

  const saveEditing = (task) => {
    api.put(`tasks/${task.id}/`, { ...task, title: editingText })
      .then((res) => {
        setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
        setEditingTask(null);
        setEditingText('');
      })
      .catch((err) => console.error('Erro ao editar tarefa:', err));
  };

  return (
    <div className="task-list-container">
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={task.status === 'Concluída' ? 'completed' : ''}>
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
              ) : (
                <span onClick={() => toggleComplete(task)}>
                  <strong>{task.title}</strong> - {task.status}
                </span>
              )}

              <div className="buttons">
                {editingTask === task.id ? (
                  <button onClick={() => saveEditing(task)}>Salvar</button>
                ) : (
                  <button onClick={() => startEditing(task)}>Editar</button>
                )}
                <button onClick={() => deleteTask(task.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;