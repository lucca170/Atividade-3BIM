// frontend/src/components/TaskList.jsx

import React from 'react';
import { deleteTask, updateTask } from '../services/api';
import './TaskList.css';

const TaskList = ({ tasks, setTasks, onEditTask }) => {
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

    if (!tasks || tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>Você não tem tarefas pendentes!</h3>
                <p>Clique em "Adicionar Tarefa" para começar.</p>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            {tasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-content">
                        <div className="task-header">
                            <h3>{task.title}</h3>
                            <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
                                {task.completed ? 'Concluída' : 'Pendente'}
                            </span>
                        </div>
                        <p className="task-description">{task.description}</p>
                        <p className="task-due-date">Vencimento: {task.due_date}</p>
                    </div>
                    <div className="task-actions">
                        <button className="btn-toggle" onClick={() => handleToggleComplete(task)}>
                            {task.completed ? 'Reabrir' : 'Concluir'}
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(task.id)}>
                            Excluir
                        </button>
                        <button className="btn btn-secondary" onClick={() => onEditTask(task)}>
                            Editar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;