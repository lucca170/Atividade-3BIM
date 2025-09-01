// frontend/src/services/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export const getTasks = () => api.get('tasks/');
export const createTask = (task) => api.post('tasks/', task);
export function updateTask(id, taskData) {
    return api.put(`/tasks/${id}/`, taskData);
}
export const deleteTask = (id) => api.delete(`tasks/${id}/`);

export const getTaskStatusCount = () => api.get('/tasks/status_count/');

export default api;

