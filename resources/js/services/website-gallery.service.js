import api from './api';

const websiteGalleryService = {
    getAll: async () => {
        const response = await api.get('/website/galleries');
        return response.data;
    }
};

export default websiteGalleryService;
