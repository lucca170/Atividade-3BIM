// frontend/src/components/TaskForm.jsx

import React, { useState } from 'react';
import { createTask } from '../services/api';
import './FormModal.css';

const TaskForm = ({ onTaskCreated, closeModal }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = { title, description, due_date: dueDate, completed: false };
            const response = await createTask(newTask);
            onTaskCreated(response.data);
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Nova Tarefa</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <input
                            type="text" id="title" value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Desenvolver a tela de login" required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Detalhes da tarefa..."
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="due-date">Data de Entrega</label>
                        <input
                            type="date" id="due-date" value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Salvar Tarefa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;