import React, { useState, useEffect, useCallback } from 'react';
import { getTasks, login, register } from './services/api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import StatusPanel from './components/StatusPanel';
import TaskFilter from './components/TaskFilter';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import './app.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [filters, setFilters] = useState({});
    
    // NOVO ESTADO para controlar qual tela de autenticação mostrar
    const [authView, setAuthView] = useState('login'); // 'login', 'register', 'forgotPassword', 'resetPassword'
    const [resetToken, setResetToken] = useState(null); // Guarda o token da URL

    // Roda uma vez para verificar o token de login E a URL de redefinição
    useEffect(() => {
        const token = localStorage.getItem('token');
        const path = window.location.pathname;
        const tokenMatch = path.match(/^\/redefinir-senha\/(.+)/);

        if (tokenMatch && tokenMatch[1]) {
            // Se encontrou um token na URL, mostra a tela de redefinir senha
            setResetToken(tokenMatch[1]);
            setAuthView('resetPassword');
        } else if (token) {
            // Se já tem um token de login, vai para a lista de tarefas
            setIsLoggedIn(true);
        }
    }, []);

    const fetchTasks = useCallback(async () => {
        if (!isLoggedIn) return;
        try {
            const response = await getTasks(filters);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            if (error.response && error.response.status === 401) {
                handleLogout();
            }
        }
    }, [isLoggedIn, filters]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchTasks();
        }
    }, [isLoggedIn, fetchTasks]);

    const handleLogin = async (username, password) => {
        try {
            const data = await login(username, password);
            localStorage.setItem('token', data.access);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed', error);
            alert('Login falhou. Verifique suas credenciais.');
        }
    };
    
    const handleRegister = async (username, password, email) => {
        try {
            await register(username, password, email);
            alert('Registro bem-sucedido! Faça o login.');
            setAuthView('login');
        } catch(error) {
            console.error('Registration failed', error);
            alert('Registro falhou!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setTasks([]);
        setAuthView('login'); // Volta para a tela de login ao sair
    };

    const handleTaskChange = () => fetchTasks();
    const openModalForEdit = (task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(false);
    };

    // --- Lógica de Renderização ---

    // Se o usuário não está logado, mostramos uma das telas de autenticação
    if (!isLoggedIn) {
        return (
            <div className="auth-container">
                {authView === 'login' && (
                    <LoginForm 
                        onLogin={handleLogin} 
                        onSwitchToRegister={() => setAuthView('register')}
                        onForgotPassword={() => setAuthView('forgotPassword')}
                    />
                )}
                {authView === 'register' && (
                    <RegisterForm 
                        onRegister={handleRegister}
                        onSwitchToLogin={() => setAuthView('login')} 
                    />
                )}
                {authView === 'forgotPassword' && (
                  <ForgotPasswordForm />
                )}
                {authView === 'resetPassword' && (
                  <ResetPasswordForm 
                      token={resetToken} 
                      onPasswordReset={() => {
                        alert('Senha redefinida com sucesso! Faça o login.');
                        // Limpa a URL e volta para o login
                        window.history.pushState({}, '', '/'); 
                        setAuthView('login');
                      }}
                  />
                )}
            </div>
        );
    }

    // Se o usuário está logado, mostra a aplicação principal
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
