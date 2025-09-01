// frontend/src/components/TaskList.jsx

import React from 'react';
import { deleteTask, updateTask } from '../services/api';
import './TaskList.css';

const TaskList = ({ tasks, setTasks }) => {

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Failed to delete task', error);
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            const response = await updateTask(task.id, updatedTask);
            setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
        } catch (error) {
            console.error('Failed to update task', error);
        }
    };

    return (
        <div className="task-list">
            {/* Verifica se existem tarefas antes de mapear */}
            {tasks.length === 0 ? (
                <p>Nenhuma tarefa encontrada.</p>
            ) : (
                <ul>
                    {/* Utiliza a variável 'tasks' para renderizar a lista */}
                    {tasks.map(task => (
                        <li key={task.id} className={task.completed ? 'completed' : ''}>
                            <div className="task-info">
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <small>Data de Entrega: {task.due_date}</small>
                            </div>
                            <div className="task-actions">
                                <button onClick={() => handleToggleComplete(task)}>
                                    {task.completed ? 'Desmarcar' : 'Concluir'}
                                </button>
                                <button onClick={() => handleDelete(task.id)} className="delete-button">
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;