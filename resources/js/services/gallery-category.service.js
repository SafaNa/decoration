import api from './api';

const galleryCategoryService = {
    getAll: async () => {
        const response = await api.get('/admin/gallery-categories');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`/admin/gallery-categories/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/admin/gallery-categories', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/admin/gallery-categories/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/admin/gallery-categories/${id}`);
        return response.data;
    }
};

export default galleryCategoryService;
