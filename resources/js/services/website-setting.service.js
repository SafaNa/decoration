import api from './api';

const websiteSettingService = {
    getAll: async () => {
        const response = await api.get('/website/settings');
        return response.data;
    }
};

export default websiteSettingService;
