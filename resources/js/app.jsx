import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Website Components
import WebsiteLayout from './website/WebsiteLayout';
import Home from './website/pages/Home';
import Catalog from './website/pages/Catalog';
import ProductDetail from './website/pages/ProductDetail';
import Portfolio from './website/pages/Portfolio';
import Contact from './website/pages/Contact';

// Admin Components
import Login from './admin/pages/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Settings from './admin/pages/Settings';
import Products from './admin/pages/Products';
import ProductForm from './admin/pages/ProductForm';
import Categories from './admin/pages/Categories';
import CategoryForm from './admin/pages/CategoryForm';
import Gallery from './admin/pages/Gallery';
import GalleryForm from './admin/pages/GalleryForm';
import GalleryCategories from './admin/pages/GalleryCategories';
import GalleryCategoryForm from './admin/pages/GalleryCategoryForm';
import Testimonials from './admin/pages/Testimonials';
import TestimonialForm from './admin/pages/TestimonialForm';
import Banners from './admin/pages/Banners';
import ChangePassword from './admin/pages/ChangePassword';

import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* Website Routes */}
                <Route path="/" element={<WebsiteLayout />}>
                    <Route index element={<Home />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="settings" element={<Settings />} />

                    <Route path="products" element={<Products />} />
                    <Route path="products/create" element={<ProductForm />} />
                    <Route path="products/edit/:id" element={<ProductForm />} />

                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/create" element={<CategoryForm />} />
                    <Route path="categories/edit/:id" element={<CategoryForm />} />

                    <Route path="gallery" element={<Gallery />} />
                    <Route path="gallery/create" element={<GalleryForm />} />
                    <Route path="gallery/edit/:id" element={<GalleryForm />} />

                    <Route path="gallery-categories" element={<GalleryCategories />} />
                    <Route path="gallery-categories/create" element={<GalleryCategoryForm />} />
                    <Route path="gallery-categories/edit/:id" element={<GalleryCategoryForm />} />

                    <Route path="testimonials" element={<Testimonials />} />
                    <Route path="testimonials/create" element={<TestimonialForm />} />
                    <Route path="testimonials/:id/edit" element={<TestimonialForm />} />




                    <Route path="banners" element={<Banners />} />

                    <Route path="change-password" element={<ChangePassword />} />

                    {/* Admin Catch-all: Redirect to Dashboard */}
                    <Route path="*" element={<Dashboard />} />
                </Route>

                {/* Catch all - Redirect to Home */}
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    createRoot(document.getElementById('app')).render(<App />);
}
