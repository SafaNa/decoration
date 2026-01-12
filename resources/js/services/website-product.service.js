import api from './api';

const websiteProductService = {
    getAll: async () => {
        const response = await api.get('/website/products');
        return response.data;
    },
    get: async (slug) => {
        // The endpoint uses ID in my controller currently: /website/products/{id}
        // Ideally should be slug.
        // Let's check the route definition.
        // Route::get('/products/{id}', [ProductController::class, 'show']);
        // I should probably use ID for now or update backend to use slug.
        // Product model doesn't strictly enforce slug unique yet maybe.
        // But for SEO slug is better.
        // I'll use ID for now as per current backend.
        const response = await api.get(`/website/products/${slug}`);
        return response.data;
    }
};

export default websiteProductService;
