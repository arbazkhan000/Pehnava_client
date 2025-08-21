import { useProduct } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

const SearchPage = () => {
    const { query } = useParams();
    const decodedQuery = query ? decodeURIComponent(query) : "";
    const { searchProducts, loading, error } = useProduct();
    const [results, setResults] = useState([]);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!decodedQuery) return;
            const response = await searchProducts(decodedQuery);
            if (response?.success) {
                setResults(response.products || []);
                setTotalResults(response.total || 0);
            }
        };
        fetchSearchResults();
    }, [decodedQuery, searchProducts]);

    const getProductImage = (product) => {
        const backendBaseURL = import.meta.env.VITE_BACKEND_URL;
        return product?.images?.[0]
            ? `${backendBaseURL}/uploads/products/${product.images[0]}`
            : "/placeholder.png";
    };

    return (
        <section className="max-w-screen-xl mx-auto p-6">
            {/* Heading */}
            <h1 className="text-2xl font-semibold mb-4">
                {loading
                    ? "Searching..."
                    : error
                    ? "Search error"
                    : `Found ${totalResults} results for "${decodedQuery}"`}
            </h1>

            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-8" aria-label="Breadcrumb">
                <ol className="list-reset flex gap-2">
                    <li>
                        <Link
                            to="/"
                            className="text-blue-600 hover:underline"
                            aria-label="Go to homepage"
                        >
                            Home
                        </Link>
                    </li>
                    <li>{" > "}</li>
                    <li
                        aria-current="page"
                        className="text-gray-900 font-semibold"
                    >
                        Search results: "{decodedQuery}"
                    </li>
                </ol>
            </nav>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Results */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </div>
            ) : results.length === 0 ? (
                <div className="text-center py-10">
                    <p>No results found for "{decodedQuery}".</p>
                    <Link
                        to="/"
                        className="mt-4 inline-block text-blue-600 hover:underline"
                    >
                        Back to home
                    </Link>
                </div>
            ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {results.map((product) => (
                        <li
                            key={product._id}
                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                            <Link to={`/product/${product.slug}`}>
                                <img
                                    src={getProductImage(product)}
                                    alt={product.title}
                                    className="w-full h-48 object-cover rounded mb-2"
                                    loading="lazy"
                                />
                                <h2 className="text-lg font-semibold">
                                    {product.title}
                                </h2>
                                <p className="text-brand font-bold">
                                    ₹{product.price}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default SearchPage;
