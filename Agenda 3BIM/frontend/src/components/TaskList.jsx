import React, { useEffect, useState } from 'react';
import api from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('tasks/')
      .then((res) => setTasks(res.data))
      .catch((err) => console.error('Erro ao buscar tarefas:', err));
  }, []);

  return (
    <div>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
