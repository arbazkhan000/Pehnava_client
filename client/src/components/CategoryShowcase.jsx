import * as LucideIcons from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "./products/ProductCard";

const CategoryShowcase = () => {
    const { categoriesProducts } = useProduct();
    if (!categoriesProducts) return <div>Loading...</div>;

    // Group products by category name
    const grouped = categoriesProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <section className="mx-4 sm:mx-8 my-6 sm:my-8">
            {Object.entries(grouped).map(([category, products]) => (
                <div key={category} className="mb-10">
                    <div className="flex justify-between items-center mb-4 px-2 sm:px-0">
                        <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                            {category}
                        </h2>
                        <Link
                            to={`/category/${category}`}
                            className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1"
                        >
                            View All{" "}
                            <LucideIcons.ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default CategoryShowcase;
