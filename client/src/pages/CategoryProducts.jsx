// pages/CategoryProducts.tsx
import { useParams } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import ProductCard from "../components/products/ProductCard";

const CategoryProducts = () => {
    const { slug } = useParams(); // URL se slug mil raha hai
    const { categories, products } = useProduct();

    if (!categories || !products) return <div>Loading...</div>;

    // Find category by slug
    const category = categories.find((cat) => cat.slug === slug);

    if (!category) return <div>Category not found</div>;

    // Filter products of this category
    const filteredProducts = products.filter(
        (product) => product.category === category.name
    );

    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

            {filteredProducts.length === 0 && (
                <p>No products in this category.</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default CategoryProducts;
