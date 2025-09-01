// lucca170/atividade-3bim/Atividade-3BIM-1c0f99b5d51b8cb26a84a28294d7ef26d786516d/Agenda 3BIM/frontend/src/components/TaskForm.jsx

import React, { useState } from 'react';
import { createTask, updateTask } from '../services/api';
import './FormModal.css';

// Função para obter a data de hoje no formato YYYY-MM-DD
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const TaskForm = ({ onTaskCreated, onTaskUpdated, closeModal, taskToEdit }) => {
    const isEdit = !!taskToEdit;
    const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
    const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
    const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.due_date : getTodayDate());
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Validação extra: impede datas anteriores ao hoje
        if (dueDate < getTodayDate()) {
            setError('A data de entrega não pode ser anterior ao dia de hoje.');
            return;
        }
        try {
            const taskData = { title, description, due_date: dueDate };
            if (isEdit) {
                const response = await updateTask(taskToEdit.id, taskData);
                if (onTaskUpdated) onTaskUpdated(response.data);
            } else {
                const response = await createTask(taskData);
                onTaskCreated(response.data);
            }
        } catch (err) {
            // CORREÇÃO: Mostra um alerta se a criação/atualização da tarefa falhar.
            setError(isEdit
                ? 'Não foi possível atualizar a tarefa. Verifique os campos e tente novamente.'
                : 'Não foi possível criar a tarefa. Verifique os campos e tente novamente.'
            );
            console.error(isEdit ? 'Failed to update task' : 'Failed to create task', err);
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
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
                            type="date"
                            id="due-date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                            min={getTodayDate()} // Impede seleção de datas anteriores
                        />
                    </div>
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? 'Salvar Alterações' : 'Salvar Tarefa'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;