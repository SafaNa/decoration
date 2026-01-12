import api from './api';

const productService = {
    getAll: async (params) => {
        const response = await api.get('/admin/products', { params });
        return response.data;
    },
    get: async (id) => {
        const response = await api.get(`/admin/products/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/admin/products', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/admin/products/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/admin/products/${id}`);
        return response.data;
    }
};

export default productService;
