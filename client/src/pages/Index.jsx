import { Suspense, lazy } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const HeroSection = lazy(() => import("@/components/HeroSection"));
const Categories = lazy(() => import("@/components/Categories"));
const CategoryShowcase = lazy(() => import("@/components/CategoryShowcase"));
const FeaturesBar = lazy(() => import("@/components/FeaturesBar"));

const Index = () => {
    return (
        <div className="overflow-hidden">
            <Suspense fallback={<LoadingSpinner fullScreen />}>
                <HeroSection />
                <Categories />
                <CategoryShowcase />
                <FeaturesBar />
            </Suspense>
        </div>
    );
};

export default Index;
