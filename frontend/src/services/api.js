import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Interceptador para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// --- FUNÇÕES DE AUTENTICAÇÃO ---
export const login = (username, password) => api.post('token/', { username, password });
export const register = (username, password, email) => api.post('users/', { username, password, email });

// --- FUNÇÕES DE TAREFAS ---
// Modificado para aceitar um objeto de filtros
export const getTasks = (filters = {}) => {
    // Remove chaves de filtro vazias para não poluir a URL
    const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
    );
    return api.get('tasks/', { params: cleanFilters });
};

export const createTask = (task) => api.post('tasks/', task);
export const updateTask = (id, taskData) => api.put(`tasks/${id}/`, taskData);
export const deleteTask = (id) => api.delete(`tasks/${id}/`);
export const getTaskStatusCount = () => api.get('/tasks/status_count/');


export const requestPasswordReset = async (email) => {
  const response = await api.post('/solicitar-redefinicao-senha/', { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await api.post('/redefinir-senha/', { token, password });
  return response.data;
};

export default api;