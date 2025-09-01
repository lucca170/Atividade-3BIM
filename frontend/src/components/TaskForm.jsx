import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/api';
import './FormModal.css';

// ... (função getTodayDate permanece a mesma)
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const TaskForm = ({ onTaskCreated, onTaskUpdated, closeModal, taskToEdit }) => {
    const isEdit = !!taskToEdit;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(getTodayDate());
    const [category, setCategory] = useState('Pessoal'); // <-- NOVO ESTADO PARA CATEGORIA
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit && taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description || '');
            setDueDate(taskToEdit.due_date);
            setCategory(taskToEdit.category); // <-- ATUALIZA CATEGORIA
        } else {
            setTitle('');
            setDescription('');
            setDueDate(getTodayDate());
            setCategory('Pessoal'); // <-- RESETA CATEGORIA
        }
    }, [taskToEdit, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            // Inclui a categoria nos dados da tarefa
            const taskData = { title, description, due_date: dueDate, category }; 
            
            if (isEdit) {
                const response = await updateTask(taskToEdit.id, { ...taskToEdit, ...taskData });
                onTaskUpdated(response.data);
            } else {
                const response = await createTask({ ...taskData, status: 'Pendente' });
                onTaskCreated(response.data);
            }
            closeModal();
        } catch (err) {
            const errorMessage = err.response?.data?.title?.[0] || 'Ocorreu um erro ao salvar a tarefa.';
            setError(errorMessage);
            console.error('Failed to save task', err);
        }
    };

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* Campo Título */}
                    <div className="form-group">
                        <label htmlFor="title">Título <span className="required">*</span></label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    {/* Campo Descrição */}
                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />
                    </div>
                    
                    {/* --- NOVO CAMPO DE CATEGORIA NO FORMULÁRIO --- */}
                    <div className="form-group">
                        <label htmlFor="category">Categoria <span className="required">*</span></label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value="Pessoal">Pessoal</option>
                            <option value="Trabalho">Trabalho</option>
                            <option value="Estudos">Estudos</option>
                        </select>
                    </div>

                    {/* Campo Data */}
                    <div className="form-group">
                        <label htmlFor="due-date">Data de Entrega <span className="required">*</span></label>
                        <input type="date" id="due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">{isEdit ? 'Salvar Alterações' : 'Criar Tarefa'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;