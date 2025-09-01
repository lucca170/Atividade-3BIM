// frontend/src/services/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Interceptador para adicionar o token de autenticação em cada requisição
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Funções de autenticação
export const register = (userData) => api.post('register/', userData);
export const login = (credentials) => api.post('login/', credentials);

// Funções para manipular tarefas (CRUD)
export const getTasks = () => api.get('tasks/');
export const createTask = (task) => api.post('tasks/', task);
export const updateTask = (id, task) => api.put(`tasks/${id}/`, task);

// >>> ADICIONE ESTA FUNÇÃO <<<
export const deleteTask = (id) => api.delete(`tasks/${id}/`);

export default api;