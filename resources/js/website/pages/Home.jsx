import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ProductSection from '../components/ProductSection';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import GiftDiscovery from '../components/GiftDiscovery';
import SectionWrapper from '../components/SectionWrapper';
import websiteProductService from '../../services/website-product.service';
import websiteCategoryService from '../../services/website-category.service';
import websiteBannerService from '../../services/website-banner.service';
import websiteSettingService from '../../services/website-setting.service';

import TrustSection from '../components/TrustSection';
import MobileOccasions from '../components/mobile/MobileOccasions';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [banners, setBanners] = useState([]);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            // Fetch Products
            try {
                const data = await websiteProductService.getAll();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }

            // Fetch Categories
            try {
                const data = await websiteCategoryService.getAll();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
            }

            // Fetch Banners
            try {
                const data = await websiteBannerService.getAll();
                setBanners(data);
            } catch (error) {
                console.error("Failed to fetch banners", error);
            }

            // Fetch Settings
            try {
                const data = await websiteSettingService.getAll();
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings", error);
            }
        };
        fetchData();
    }, []);

    // Filter Banners
    const safeBanners = Array.isArray(banners) ? banners : [];
    const discoveryBanners = safeBanners.filter(b => b.type === 'discovery').sort((a, b) => a.order - b.order);
    const heroBanners = safeBanners.filter(b => b.type === 'slideshow').sort((a, b) => a.order - b.order);

    // Pick the first slideshow banner as hero image if available
    const heroImage = heroBanners.length > 0 ? heroBanners[0].image : null;

    // Randomize or slice products for different sections
    // Simple slice for now.
    const featuredProducts = products.slice(0, 4);
    const newArrivals = products.slice(0, 4).reverse(); // Just taking reverse for variety

    return (
        <>
            <Hero settings={settings} heroImage={heroImage} />

            {/* Mobile Only: Story Style Occasions */}
            <MobileOccasions />

            {/* Desktop Only: Trust Section */}
            <div className="hidden md:block">
                <TrustSection />
            </div>

            <SectionWrapper>
                <div className="hidden md:block">
                    <Categories categories={categories} />
                </div>
            </SectionWrapper>

            <div className="hidden md:block">
                <GiftDiscovery banners={discoveryBanners} />
            </div>

            <SectionWrapper>
                <div className="bg-slate-50 dark:bg-white/5 pt-4 md:pt-20 pb-20 rounded-t-[2rem] md:rounded-t-[3rem] -mt-6 md:mt-0 relative z-10 border-t border-slate-100 dark:border-white/5 md:border-none">
                    <ProductSection
                        title="New Arrivals"
                        subtitle="Fresh from our workshop, just for you."
                        products={newArrivals}
                    />
                </div>
            </SectionWrapper>

            <SectionWrapper>
                <Testimonials />
            </SectionWrapper>

            <SectionWrapper>
                <Newsletter />
            </SectionWrapper>
        </>
    );
}
