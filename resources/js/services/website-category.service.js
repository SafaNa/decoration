import api from './api';

const websiteCategoryService = {
    getAll: async () => {
        const response = await api.get('/website/categories');
        return response.data;
    },
    get: async (slug) => {
        const response = await api.get(`/website/categories/${slug}`);
        return response.data;
    }
};

export default websiteCategoryService;
