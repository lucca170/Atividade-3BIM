import React, { useState, useEffect, useCallback } from 'react';
import { getTasks } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import StatusPanel from './components/StatusPanel';
import TaskFilter from './components/TaskFilter'; // <-- IMPORTAR O NOVO COMPONENTE
import './app.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [filters, setFilters] = useState({}); // <-- ESTADO PARA OS FILTROS

    // Usamos useCallback para evitar que a função seja recriada desnecessariamente
    const fetchTasks = useCallback(async () => {
        if (!isLoggedIn) return;
        try {
            // Passa os filtros para a API
            const response = await getTasks(filters);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            if (error.response && error.response.status === 401) {
                handleLogout();
            }
        }
    }, [isLoggedIn, filters]); // Roda novamente se o login ou os filtros mudarem

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowRegister(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setTasks([]);
    };

    const handleTaskChange = () => {
        fetchTasks(); // Simplesmente busca todas as tarefas novamente após uma mudança
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
        // ... (lógica de login/registro permanece a mesma)
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
                
                {/* --- RENDERIZA O COMPONENTE DE FILTRO --- */}
                <TaskFilter onFilterChange={setFilters} />

                <TaskList
                    tasks={tasks}
                    onTaskDeleted={handleTaskChange}
                    onTaskUpdated={handleTaskChange}
                    onEditTask={openModalForEdit}
                />
            </main>
            {isModalOpen && (
                <TaskForm
                    onTaskCreated={handleTaskChange}
                    onTaskUpdated={handleTaskChange}
                    closeModal={closeModal}
                    taskToEdit={taskToEdit}
                />
            )}
        </div>
    );
};

export default App;