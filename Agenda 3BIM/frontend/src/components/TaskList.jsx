import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dados de exemplo para o layout
  const exampleTasks = [
    {id: 1, title: 'Revisar o design do novo dashboard', status: 'Concluída'},
    {id: 2, title: 'Desenvolver a API de autenticação', status: 'Em andamento'},
    {id: 3, title: 'Corrigir bug na página de checkout', status: 'Pendente'},
    {id: 4, title: 'Planejar o sprint da próxima semana', status: 'Pendente'},
    {id: 5, title: 'Atualizar documentação da API', status: 'Em andamento'},
  ];

  useEffect(() => {
    // Simulando o carregamento da API para usar os dados de exemplo
    setTimeout(() => {
      setTasks(exampleTasks);
      setLoading(false);
    }, 1000);

    /* Descomente o código abaixo para usar sua API real
    api.get('tasks/')
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar tarefas:', err);
        setError('Não foi possível carregar as tarefas.');
        setLoading(false);
      });
    */
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Concluída': return 'status-completed';
      case 'Em andamento': return 'status-in-progress';
      case 'Pendente': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="task-manager">
      <div className="task-manager-header">
        <h2>Tarefas Recentes</h2>
        <div className="filter-tabs">
          <button className="tab-btn active">Todos</button>
          <button className="tab-btn">Pendentes</button>
          <button className="tab-btn">Em andamento</button>
          <button className="tab-btn">Concluídas</button>
        </div>
      </div>

      <div className="task-list">
        {loading && <p>Carregando...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div className="task-info">
                      <div className="task-icon"></div>
                      {task.title}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">Ver Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TaskList;