import api from '../services/api';

const websiteTestimonialService = {
    getAll: async () => {
        const response = await api.get('/website/testimonials');
        return response.data;
    }
};

export default websiteTestimonialService;
