// frontend/src/components/TaskForm.jsx

import React, { useState } from 'react';
import { createTask } from '../services/api';
import './TaskForm.css';

// Recebe a propriedade onTaskCreated
const TaskForm = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = {
                title,
                description,
                due_date: dueDate,
                completed: false,
            };
            const response = await createTask(newTask);
            // Usa a função para atualizar o estado no componente pai (App.jsx)
            onTaskCreated(response.data);
            // Limpa os campos do formulário
            setTitle('');
            setDescription('');
            setDueDate('');
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título da Tarefa"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <button type="submit">Adicionar Tarefa</button>
        </form>
    );
};

export default TaskForm;