import api from './api';

const settingService = {
    getAll: async () => {
        const response = await api.get('/admin/settings');
        return response.data;
    },
    update: async (key, value) => {
        // This endpoint might need to be adjusted based on backend implementation.
        // If backend accepts array of settings, we should adjust.
        // Assuming /admin/settings endpoint accepts { key: value } or { settings: [{key, value}] }
        // Let's assume standard key-value update or bulk update.
        // Based on typical SettingsController: update(Request $request, $id) or update(Request $request)
        // Let's assume we send a POST or PUT to /admin/settings with all settings
        const response = await api.post('/admin/settings', { [key]: value });
        return response.data;
    },
    updateBatch: async (settings) => {
        const response = await api.post('/admin/settings', { settings });
        return response.data;
    }
};

export default settingService;
