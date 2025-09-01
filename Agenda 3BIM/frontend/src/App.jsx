// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import StatusPanel from './components/StatusPanel'; // Importa o novo componente
import { getTasks } from './services/api';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLoginView, setIsLoginView] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            if (token) {
                try {
                    const response = await getTasks();
                    setTasks(response.data);
                } catch (error) {
                    console.error('Failed to fetch tasks', error);
                    if (error.response && error.response.status === 401) {
                        handleLogout();
                    }
                }
            }
        };
        fetchTasks();
    }, [token]);

    const handleTaskCreated = (newTask) => {
        setTasks(prevTasks => [newTask, ...prevTasks]);
        setIsModalOpen(false); // Fecha o modal após criar a tarefa
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setTasks([]);
    };

    const onLoginSuccess = (newToken) => {
        setToken(newToken);
    };

    if (!token) {
        return (
            <div className="auth-container">
                {isLoginView ? (
                    <LoginForm onLoginSuccess={onLoginSuccess} onSwitchToRegister={() => setIsLoginView(false)} />
                ) : (
                    <RegisterForm onRegisterSuccess={() => setIsLoginView(true)} onSwitchToLogin={() => setIsLoginView(true)} />
                )}
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>Task Manager</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><a href="#" className="active">Tasks</a></li>
                        {/* Adicione outros links de navegação aqui se precisar */}
                    </ul>
                </nav>
                <footer className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </footer>
            </aside>

            {/* Conteúdo Principal */}
            <main className="main-content">
                <header className="main-header">
                    <h1>Minhas Tarefas</h1>
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                        Adicionar Tarefa
                    </button>
                </header>
                
                <StatusPanel /> {/* Adiciona o painel de status aqui */}
                
                <TaskList tasks={tasks} setTasks={setTasks} />
            </main>

            {/* Modal para Adicionar Tarefa */}
            {isModalOpen && (
                <TaskForm onTaskCreated={handleTaskCreated} closeModal={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default App;