import api from './api';

const authService = {
    login: async (email, password) => {
        const response = await api.post('/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    logout: async () => {
        await api.post('/admin/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getUser: async () => {
        const response = await api.get('/admin/user');
        return response.data;
    }
};

export default authService;
