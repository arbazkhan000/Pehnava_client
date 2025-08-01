import { products } from "@/data/mockData";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const Products = () => {
    return (
        <section className="py-10 bg-brand_background">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
                    Our Products
                </h2>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-10 flex items-center justify-center">
                    <Link to="/products" aria-label="View all products">
                        <button className="bg-brand text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2">
                            View All Products
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Products;
