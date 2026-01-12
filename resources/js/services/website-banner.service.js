import api from './api';

// URLs relative to the baseURL defined in api.js (which is '/api')
const API_URL = '/website/banners';
const ADMIN_API_URL = '/admin/banners';

const getAll = async (params = {}) => {
    const response = await api.get(API_URL, { params });
    return response.data;
};

// Admin methods
const getAllAdmin = async () => {
    const response = await api.get(ADMIN_API_URL);
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`${ADMIN_API_URL}/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await api.post(ADMIN_API_URL, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const update = async (id, data) => {
    // For FormData with PUT, we often need to use _method: PUT or POST with method overriding in Laravel
    // Standard way: POST with _method field
    data.append('_method', 'PUT');
    const response = await api.post(`${ADMIN_API_URL}/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const remove = async (id) => {
    const response = await api.delete(`${ADMIN_API_URL}/${id}`);
    return response.data;
};

const websiteBannerService = {
    getAll,
    getAllAdmin,
    getById,
    create,
    update,
    remove,
};

export default websiteBannerService;
