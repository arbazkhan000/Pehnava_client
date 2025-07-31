import Categories from "@/components/Categories";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturesBar from "@/components/FeaturesBar";
import HeroSection from "@/components/HeroSection";

const Index = () => {
    return (
        <div className="overflow-hidden">
            <HeroSection />
            <Categories />
            <CategoryShowcase />
            <FeaturesBar />
        </div>
    );
};

export default Index;
