import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useProduct } from "@/context/ProductContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
    const { getAllCategories, categories, loading } = useProduct();

    // Fetch categories on mount
    useEffect(() => {
        getAllCategories();
    }, []);

    // Optional loading state
    if (loading) {
        return (
            <div className="text-center py-8 text-gray-500 animate-pulse">
                Loading categories...
            </div>
        );
    }

    // If no categories
    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No categories found.
            </div>
        );
    }

    return (
        <section className="px-4 py-12 w-full max-w-7xl mx-auto overflow-hidden">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                    Shop by Category
                </h2>
            </div>

            <div className="relative">
                <Carousel
                    opts={{ align: "start", slidesToScroll: 1 }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2">
                        {categories.map((category, index) => {
                            const imageUrl = `${
                                import.meta.env.VITE_BACKEND_URL
                            }${category.categoryImage}`;

                            return (
                                <CarouselItem
                                    key={category._id || index}
                                    className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                                >
                                    <div className="p-2">
                                        <Link
                                            to={`/category/${category.slug}`}
                                            className="block group"
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="relative overflow-hidden rounded-full aspect-square border-2 border-foreground p-1  transition-all duration-300">
                                                    <div className="relative w-full h-full rounded-full overflow-hidden">
                                                        <img
                                                            src={
                                                                imageUrl ||
                                                                "/placeholder.png"
                                                            }
                                                            alt={category.name}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-semibold text-center text-gray-800">
                                                    {category.name}
                                                </h3>
                                            </div>
                                        </Link>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>

                    <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 size-10 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 z-10 shadow-lg rounded-full" />
                    <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 size-10 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 z-10 shadow-lg rounded-full" />
                </Carousel>
            </div>
        </section>
    );
};

export default Categories;
