// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { getTasks } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import StatusPanel from './components/StatusPanel';
import './app.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            fetchTasks();
        }
    }, [isLoggedIn]);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            if (error.response && error.response.status === 401) {
                handleLogout();
            }
        }
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowRegister(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setTasks([]);
    };

    const handleTaskCreated = (newTask) => {
        setTasks([newTask, ...tasks]);
        setIsModalOpen(false);
    };

    const handleTaskUpdated = (updatedTask) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
        setTaskToEdit(null);
        setIsModalOpen(false);
    };

    const handleTaskDeleted = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const openModalForEdit = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(false);
    };

    if (!isLoggedIn) {
        return (
            <div className="auth-container">
                {showRegister ? (
                    <RegisterForm onRegisterSuccess={() => setShowRegister(false)} />
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
                <button className="btn btn-link" onClick={() => setShowRegister(!showRegister)}>
                    {showRegister ? 'Já tenho uma conta? Faça Login' : 'Não tem uma conta? Registre-se'}
                </button>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header>
                <h1>Minha Agenda de Tarefas</h1>
                <button onClick={handleLogout} className="btn btn-secondary">
                    Sair
                </button>
            </header>
            <main>
                <StatusPanel tasks={tasks} />
                <button className="btn btn-primary new-task-btn" onClick={() => setIsModalOpen(true)}>
                    + Nova Tarefa
                </button>
                <TaskList
                    tasks={tasks}
                    onTaskDeleted={handleTaskDeleted}
                    onTaskUpdated={handleTaskUpdated}
                    onEditTask={openModalForEdit}
                />
            </main>
            {isModalOpen && (
                <TaskForm
                    onTaskCreated={handleTaskCreated}
                    onTaskUpdated={handleTaskUpdated}
                    closeModal={closeModal}
                    taskToEdit={taskToEdit}
                />
            )}
        </div>
    );
};

export default App;