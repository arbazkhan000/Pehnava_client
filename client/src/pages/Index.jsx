import CategoriesSection from "@/components/CategoriesSection";
import FeaturesBar from "@/components/FeaturesBar";
import HeroSection from "@/components/HeroSection";
import Products from "@/components/products/Products";
import { ReelGallery } from "@/components/ReelGallery";

const Index = () => {
    return (
        <div className="min-h-screen flex flex-col bg-brand-background">
            <HeroSection />
            <CategoriesSection />
            <Products />
            <FeaturesBar />
            <ReelGallery />
        </div>
    );
};

export default Index;
