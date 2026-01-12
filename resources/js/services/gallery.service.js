import api from './api';

const galleryService = {
    getAll: async () => {
        const response = await api.get('/admin/galleries');
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`/admin/galleries/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/admin/galleries', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/admin/galleries/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/admin/galleries/${id}`);
        return response.data;
    }
};

export default galleryService;
