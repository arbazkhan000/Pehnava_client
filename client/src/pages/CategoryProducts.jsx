import LoadingSpinner from "@/components/LoadingSpinner";
import {
    Pagination,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { useProduct } from "../context/ProductContext";

const CategoryProducts = () => {
    const { slug } = useParams();
    const { categories, products, getProductsByCategory, loading } =
        useProduct();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (slug) {
            (async () => {
                const data = await getProductsByCategory(slug, page);
                if (data?.totalPages) setTotalPages(data.totalPages);
            })();
        }
    }, [slug, page, getProductsByCategory]);

    if (loading)
        return (
            <div className="py-8">
                <LoadingSpinner size={40} /> 
            </div>
        );
    if (!categories) return (
        <div className="py-8">
            <LoadingSpinner size={40} />
        </div>
    );

    const category = categories.find((cat) => cat.slug === slug);
    if (!category) return <div>Category not found</div>;

    return (
        <section className="p-4">
            <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

            {products.length === 0 ? (
                <p>No products in this category.</p>
            ) : (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6 space-x-4">
                        <Pagination>
                            <PaginationPrevious
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((p) => Math.max(p - 1, 1))
                                }
                            />
                            <div className="flex items-center px-4 select-none">
                                Page {page} of {totalPages}
                            </div>
                            <PaginationNext
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((p) => Math.min(p + 1, totalPages))
                                }
                            />
                        </Pagination>
                    </div>
                </>
            )}
        </section>
    );
};

export default CategoryProducts;
