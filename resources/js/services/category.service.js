import api from './api';

const categoryService = {
    getAll: async () => {
        const response = await api.get('/admin/categories');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`/admin/categories/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/admin/categories', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/admin/categories/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/admin/categories/${id}`);
        return response.data;
    }
};

export default categoryService;
