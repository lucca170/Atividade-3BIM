// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { getTasks } from './services/api'; // Removido imports não usados aqui para simplificar
import './app.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            if (token) {
                try {
                    const response = await getTasks();
                    setTasks(response.data);
                } catch (error) {
                    console.error('Failed to fetch tasks', error);
                }
            }
        };
        fetchTasks();
    }, [token]);

    // PONTO 1: A FUNÇÃO PRECISA SER DEFINIDA DENTRO DO APP
    // Esta função atualiza a lista de tarefas adicionando a nova tarefa.
    const handleTaskCreated = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setTasks([]);
    };

    if (!token) {
        return (
            <div>
                {isLogin ? (
                    <LoginForm setToken={setToken} />
                ) : (
                    <RegisterForm setToken={setToken} />
                )}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Login'}
                </button>
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Gerenciador de Tarefas</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <main>
                {/* PONTO 2: A FUNÇÃO PRECISA SER PASSADA COMO PROP PARA O TASKFORM */}
                <TaskForm onTaskCreated={handleTaskCreated} />

                <TaskList tasks={tasks} setTasks={setTasks} />
            </main>
        </div>
    );
};

export default App;